# Deployment Guide

This document outlines the steps for deploying the HerdLinx website to production.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Access to your hosting provider/server
- Domain name configured (if applicable)

## Build Process

### 1. Install Dependencies

Ensure all dependencies are installed:

```bash
npm install
```

### 2. Build for Production

Create an optimized production build:

```bash
npm run build
```

This command will:
- Bundle and minify all assets
- Optimize images and code
- Generate production-ready files in the `dist` directory

### 3. Verify Build

Before deploying, preview the production build locally:

```bash
npm run preview
```

Navigate to the URL shown (typically `http://localhost:4173`) to verify everything works correctly.

## Deployment Options

### Static Hosting Services

The built `dist` folder contains static files that can be deployed to any static hosting service.

#### Netlify

1. **Via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

2. **Via Netlify Dashboard:**
   - Connect your Git repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy automatically on push to main branch

#### Vercel

1. **Via Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Via Vercel Dashboard:**
   - Import your Git repository
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Deploy automatically on push

#### GitHub Pages

1. Install the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add deploy script to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

#### AWS S3 + CloudFront

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload `dist` contents to S3 bucket:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. Configure CloudFront distribution pointing to your S3 bucket
4. Set up custom domain (optional)

#### Traditional Web Server (Apache/Nginx)

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload contents of `dist` folder to your web server's document root (e.g., `/var/www/html` or `/usr/share/nginx/html`)

3. Configure server for SPA routing (see Server Configuration section below)

## Server Configuration

### SPA Routing Support

Since this is a Single Page Application, configure your server to serve `index.html` for all routes.

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache Configuration (.htaccess)

Place this in your `dist` folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Environment Variables

If you need environment-specific configuration:

1. Create `.env.production` file in the project root
2. Access variables in code using `import.meta.env.VITE_*`
3. Rebuild after changes: `npm run build`

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test contact form submission (if applicable)
- [ ] Check mobile responsiveness
- [ ] Verify all images load properly
- [ ] Test navigation and routing
- [ ] Check browser console for errors
- [ ] Verify HTTPS is enabled (if applicable)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Check page load speed and performance
- [ ] Verify SEO meta tags (if applicable)

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to hosting
        # Add your deployment step here
```

## Troubleshooting

### Build Fails

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`
- Check Node.js version: `node --version` (should be v16+)

### 404 Errors on Routes

- Ensure server is configured for SPA routing (see Server Configuration)
- Verify `index.html` is served for all routes

### Assets Not Loading

- Check that asset paths are correct in `dist/index.html`
- Verify base path configuration in `vite.config.js` if using subdirectory deployment

### Performance Issues

- Enable gzip/brotli compression on server
- Configure CDN for static assets
- Review and optimize image sizes
- Check bundle size with `npm run build -- --analyze` (if analyzer plugin is installed)

## Rollback Procedure

If deployment issues occur:

1. Keep previous build in a backup location
2. Restore previous `dist` folder contents
3. Re-upload to server
4. Investigate issues in development environment
5. Fix and redeploy

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment](https://react.dev/learn/start-a-new-react-project#production-builds)

