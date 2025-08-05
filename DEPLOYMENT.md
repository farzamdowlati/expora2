# 🚀 Expora Website Deployment Guide

This guide will help you deploy your Expora website on a fresh Ubuntu VPS.

## 📋 Prerequisites

- Ubuntu 20.04+ VPS
- Root or sudo access
- SSH access to your server
- Domain name (optional but recommended)

## 🛠️ Quick Deployment

### Step 1: Upload the Deployment Script

1. **Upload the script to your VPS:**
   ```bash
   scp deploy.sh user@your-server-ip:/home/user/
   ```

2. **SSH into your VPS:**
   ```bash
   ssh user@your-server-ip
   ```

3. **Make the script executable:**
   ```bash
   chmod +x deploy.sh
   ```

### Step 2: Upload Your Project Files

You have several options to upload your project:

#### Option A: Using SCP (Secure Copy)
```bash
# From your local machine
scp -r /path/to/your/expora2/* user@your-server-ip:/var/www/expora/
```

#### Option B: Using Git (Recommended)
```bash
# On your VPS
cd /var/www/expora
git clone https://github.com/yourusername/expora2.git .
```

#### Option C: Using rsync
```bash
# From your local machine
rsync -avz --exclude 'node_modules' --exclude '.git' /path/to/your/expora2/ user@your-server-ip:/var/www/expora/
```

### Step 3: Run the Deployment Script

```bash
./deploy.sh
```

The script will automatically:
- Update system packages
- Install Node.js 18.x
- Install Nginx
- Install PM2 process manager
- Build your React application
- Configure Nginx for production
- Set up firewall rules
- Start the application

## 🔧 Manual Deployment Steps

If you prefer to deploy manually, follow these steps:

### 1. System Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git unzip software-properties-common

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Install PM2
sudo npm install -g pm2
```

### 2. Application Setup
```bash
# Create application directory
sudo mkdir -p /var/www/expora
sudo chown $USER:$USER /var/www/expora

# Upload your project files to /var/www/expora
cd /var/www/expora

# Install dependencies
npm install

# Build for production
npm run build
```

### 3. PM2 Configuration
```bash
# Create PM2 ecosystem file
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

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Nginx Configuration
```bash
# Create Nginx site configuration
sudo tee /etc/nginx/sites-available/expora << 'EOF'
server {
    listen 80;
    server_name _;  # Replace with your domain
    
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
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Firewall Configuration
```bash
# Install and configure UFW
sudo apt install -y ufw
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

## 🔒 SSL Certificate Setup (Optional but Recommended)

### Using Let's Encrypt with Certbot

1. **Install Certbot:**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. **Obtain SSL certificate:**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

3. **Auto-renewal:**
   ```bash
   sudo crontab -e
   # Add this line:
   0 12 * * * /usr/bin/certbot renew --quiet
   ```

## 📊 Monitoring and Maintenance

### Useful Commands

```bash
# View application logs
pm2 logs expora

# Restart application
pm2 restart expora

# Check application status
pm2 status

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Check Nginx status
sudo systemctl status nginx

# Update website (after uploading new files)
cd /var/www/expora
npm install
npm run build
pm2 restart expora
sudo systemctl reload nginx
```

### Backup and Restore

```bash
# Create backup
sudo tar -czf /var/backups/expora_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /var/www/expora .

# Restore from backup
sudo tar -xzf /var/backups/expora_backup_YYYYMMDD_HHMMSS.tar.gz -C /var/www/expora/
```

## 🚨 Troubleshooting

### Common Issues

1. **Port 80 already in use:**
   ```bash
   sudo netstat -tulpn | grep :80
   sudo systemctl stop apache2  # if Apache is running
   ```

2. **Permission denied errors:**
   ```bash
   sudo chown -R $USER:$USER /var/www/expora
   ```

3. **Nginx configuration errors:**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

4. **PM2 process not starting:**
   ```bash
   pm2 logs expora
   pm2 delete expora
   pm2 start ecosystem.config.js
   ```

### Performance Optimization

1. **Enable Nginx caching:**
   ```bash
   # Add to Nginx config
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

2. **Enable Gzip compression:**
   ```bash
   # Already included in the Nginx config
   ```

3. **Monitor resource usage:**
   ```bash
   htop
   df -h
   free -h
   ```

## 📞 Support

If you encounter any issues:

1. Check the logs: `pm2 logs expora`
2. Verify Nginx configuration: `sudo nginx -t`
3. Check system resources: `htop`
4. Ensure all services are running: `sudo systemctl status nginx`

## 🎉 Success!

Your Expora website should now be accessible at:
- `http://your-server-ip` (or your domain name)
- The application will automatically restart if the server reboots
- All static assets are cached for optimal performance
- Security headers are configured for production use

---

**Note:** Remember to replace `your-server-ip` and `yourdomain.com` with your actual server IP and domain name throughout this guide. 