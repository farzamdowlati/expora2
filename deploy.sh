#!/bin/bash

# Expora Website Deployment Script for Ubuntu VPS
# This script sets up a complete production environment from scratch

set -e  # Exit on any error

echo "🚀 Starting Expora Website Deployment..."
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Update system packages
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y
print_success "System packages updated"

# Install essential packages
print_status "Installing essential packages..."
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release
print_success "Essential packages installed"

# Install Node.js 18.x (LTS)
print_status "Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
print_success "Node.js $(node --version) installed"

# Install npm and verify installation
print_status "Verifying Node.js installation..."
node --version
npm --version
print_success "Node.js and npm verified"

# Install Nginx
print_status "Installing Nginx..."
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
print_success "Nginx installed and started"

# Install PM2 for process management
print_status "Installing PM2 globally..."
sudo npm install -g pm2
print_success "PM2 installed"

# Ensure PostCSS config is correct for ES modules
print_status "Verifying PostCSS configuration..."
if [ -f "postcss.config.js" ]; then
    # Backup existing config
    cp postcss.config.js postcss.config.js.backup
    # Create correct ES module config
    cat > postcss.config.js << 'EOF'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
}
EOF
    print_success "PostCSS configuration updated for ES modules"
fi

# Create application directory
print_status "Setting up application directory..."
sudo mkdir -p /var/www/expora
sudo chown $USER:$USER /var/www/expora
print_success "Application directory created"

# Clone or copy your project (assuming you'll upload the files)
print_status "Setting up project files..."
print_warning "Please upload your project files to /var/www/expora"
print_warning "You can use scp, rsync, or git clone to transfer files"

# Navigate to project directory
cd /var/www/expora

# Check if package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please ensure your project files are uploaded to /var/www/expora"
    exit 1
fi

# Install project dependencies
print_status "Installing project dependencies..."
npm install
print_success "Dependencies installed"

# Build the project for production
print_status "Building project for production..."
npm run build
print_success "Project built successfully"

# Create PM2 ecosystem file
print_status "Creating PM2 configuration..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'expora',
    script: 'npm',
    args: 'run preview',
    cwd: '/var/www/expora',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 4173
    }
  }]
}
EOF
print_success "PM2 configuration created"

# Configure Nginx
print_status "Configuring Nginx..."
sudo tee /etc/nginx/sites-available/expora << 'EOF'
server {
    listen 80;
    server_name _;  # Replace with your domain name when available
    
    root /var/www/expora/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security: Hide nginx version
    server_tokens off;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/expora /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default  # Remove default site
print_success "Nginx configuration created"

# Test Nginx configuration
print_status "Testing Nginx configuration..."
sudo nginx -t
print_success "Nginx configuration is valid"

# Reload Nginx
print_status "Reloading Nginx..."
sudo systemctl reload nginx
print_success "Nginx reloaded"

# Start the application with PM2
print_status "Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup
print_success "Application started with PM2"

# Configure firewall (if UFW is available)
if command -v ufw &> /dev/null; then
    print_status "Configuring firewall..."
    sudo ufw allow ssh
    sudo ufw allow 'Nginx Full'
    sudo ufw --force enable
    print_success "Firewall configured"
else
    print_warning "UFW not found. Please configure your firewall manually."
fi

# Create deployment script for future updates
print_status "Creating update script..."
cat > update.sh << 'EOF'
#!/bin/bash
set -e

echo "🔄 Updating Expora website..."

# Navigate to project directory
cd /var/www/expora

# Pull latest changes (if using git)
# git pull origin main

# Install dependencies
npm install

# Build for production
npm run build

# Restart PM2 process
pm2 restart expora

# Reload Nginx
sudo systemctl reload nginx

echo "✅ Update completed successfully!"
EOF

chmod +x update.sh
print_success "Update script created"

# Create backup script
print_status "Creating backup script..."
cat > backup.sh << 'EOF'
#!/bin/bash
set -e

BACKUP_DIR="/var/backups/expora"
DATE=$(date +%Y%m%d_%H%M%S)

echo "📦 Creating backup..."

# Create backup directory
sudo mkdir -p $BACKUP_DIR

# Create backup
sudo tar -czf $BACKUP_DIR/expora_backup_$DATE.tar.gz -C /var/www/expora .

# Keep only last 5 backups
sudo find $BACKUP_DIR -name "expora_backup_*.tar.gz" -type f -mtime +5 -delete

echo "✅ Backup created: expora_backup_$DATE.tar.gz"
EOF

chmod +x backup.sh
print_success "Backup script created"

# Display final status
echo ""
echo "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo "====================================="
print_success "Your Expora website is now running!"
echo ""
echo "📋 Deployment Summary:"
echo "  • Node.js $(node --version) installed"
echo "  • Nginx configured and running"
echo "  • PM2 process manager active"
echo "  • Application built and deployed"
echo "  • Firewall configured (if UFW available)"
echo ""
echo "🌐 Access your website at:"
echo "  • Local: http://localhost"
echo "  • External: http://$(curl -s ifconfig.me)"
echo ""
echo "🔧 Useful commands:"
echo "  • View logs: pm2 logs expora"
echo "  • Restart app: pm2 restart expora"
echo "  • Update website: ./update.sh"
echo "  • Create backup: ./backup.sh"
echo "  • Nginx status: sudo systemctl status nginx"
echo ""
echo "⚠️  IMPORTANT:"
echo "  • Replace '_' in Nginx config with your domain name"
echo "  • Set up SSL certificate with Let's Encrypt"
echo "  • Configure your domain DNS to point to this server"
echo "  • Upload your project files to /var/www/expora if not done already"
echo ""

# Check if project files exist
if [ ! -f "package.json" ]; then
    print_warning "Project files not found. Please upload your project to /var/www/expora"
    print_warning "Then run: npm install && npm run build && pm2 restart expora"
fi

print_success "Deployment script completed!" 