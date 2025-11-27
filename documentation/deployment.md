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

#### Azure Web App

Azure Web App is a fully managed platform for hosting web applications. This guide covers deploying your static React/Vite application to Azure Web App.

##### Prerequisites

- Azure account ([Create one for free](https://azure.microsoft.com/free/))
- Azure CLI installed ([Installation guide](https://docs.microsoft.com/cli/azure/install-azure-cli))
- Git repository (optional, for continuous deployment)

##### Method 1: Azure CLI Deployment

1. **Login to Azure:**
   ```bash
   az login
   ```

2. **Create a Resource Group (if you don't have one):**
   ```bash
   az group create --name herdlinx-rg --location eastus
   ```

3. **Create an App Service Plan:**
   ```bash
   az appservice plan create --name herdlinx-plan --resource-group herdlinx-rg --sku FREE --is-linux
   ```
   
   Note: For production, consider using `B1` (Basic) or higher SKU. Free tier has limitations.

4. **Create a Web App:**
   ```bash
   az webapp create --resource-group herdlinx-rg --plan herdlinx-plan --name herdlinx-app --runtime "NODE:18-lts"
   ```

5. **Configure the Web App for Static Site:**
   ```bash
   az webapp config appsettings set --resource-group herdlinx-rg --name herdlinx-app --settings SCM_DO_BUILD_DURING_DEPLOYMENT=false
   ```

6. **Build your project locally:**
   ```bash
   npm run build
   ```

7. **Deploy using Azure CLI:**
   ```bash
   cd dist
   az webapp up --name herdlinx-app --resource-group herdlinx-rg --runtime "NODE:18-lts" --html
   ```

   Or deploy from the project root:
   ```bash
   az webapp deploy --resource-group herdlinx-rg --name herdlinx-app --src-path dist --type static
   ```

##### Method 2: GitHub Actions (Continuous Deployment)

1. **Create Azure Service Principal:**
   ```bash
   az ad sp create-for-rbac --name "herdlinx-deploy" --role contributor --scopes /subscriptions/{subscription-id}/resourceGroups/herdlinx-rg --sdk-auth
   ```
   
   Save the JSON output as a GitHub secret named `AZURE_WEBAPP_PUBLISH_PROFILE`.

2. **Create GitHub Actions Workflow:**

   Create `.github/workflows/azure-deploy.yml`:
   ```yaml
   name: Deploy to Azure Web App

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'

         - name: Install dependencies
           run: npm install

         - name: Build
           run: npm run build

         - name: Deploy to Azure Web App
           uses: azure/webapps-deploy@v2
           with:
             app-name: 'herdlinx-app'
             publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
             package: ./dist
   ```

3. **Get Publish Profile:**
   - Go to Azure Portal → Your Web App → Get publish profile
   - Copy the content and add it as a GitHub secret named `AZURE_WEBAPP_PUBLISH_PROFILE`

##### Method 3: VS Code Extension

1. Install the "Azure App Service" extension in VS Code
2. Sign in to Azure from VS Code
3. Right-click on the `dist` folder → Deploy to Web App
4. Select your subscription, resource group, and web app

##### Method 4: ZIP Deploy

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Create a ZIP file of the dist folder:**
   ```bash
   cd dist
   zip -r ../deploy.zip .
   cd ..
   ```

3. **Deploy using Azure CLI:**
   ```bash
   az webapp deployment source config-zip --resource-group herdlinx-rg --name herdlinx-app --src deploy.zip
   ```

##### Azure Configuration

1. **Enable SPA Routing (web.config):**

   Create a `web.config` file in your `dist` folder:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <system.webServer>
       <rewrite>
         <rules>
           <rule name="SPA Routes" stopProcessing="true">
             <match url=".*" />
             <conditions logicalGrouping="MatchAll">
               <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
               <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
             </conditions>
             <action type="Rewrite" url="/" />
           </rule>
         </rules>
       </rewrite>
       <staticContent>
         <mimeMap fileExtension=".json" mimeType="application/json" />
         <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
         <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
       </staticContent>
       <httpProtocol>
         <customHeaders>
           <add name="X-Content-Type-Options" value="nosniff" />
           <add name="X-Frame-Options" value="DENY" />
           <add name="X-XSS-Protection" value="1; mode=block" />
         </customHeaders>
       </httpProtocol>
     </system.webServer>
   </configuration>
   ```

   This file will be automatically included in your `dist` folder when you build if you place it in the `public` folder (Vite will copy it).

2. **Configure Application Settings:**

   Set these in Azure Portal → Your Web App → Configuration → Application settings:
   - `WEBSITE_NODE_DEFAULT_VERSION`: `18-lts`
   - `SCM_DO_BUILD_DURING_DEPLOYMENT`: `false` (for static sites)

3. **Custom Domain Configuration:**

   - Go to Azure Portal → Your Web App → Custom domains
   - Click "Add custom domain"
   - Follow the DNS configuration instructions
   - Enable HTTPS/SSL certificate (free SSL available)

##### Environment Variables

1. **Set in Azure Portal:**
   - Go to Configuration → Application settings
   - Add your environment variables (prefixed with `VITE_` if needed)
   - Note: For Vite, environment variables are baked into the build, so set them before building or use Azure's app settings for runtime config

2. **Using Azure CLI:**
   ```bash
   az webapp config appsettings set --resource-group herdlinx-rg --name herdlinx-app --settings VITE_API_URL=https://api.example.com
   ```

##### Monitoring and Logging

1. **Enable Application Insights:**
   ```bash
   az monitor app-insights component create --app herdlinx-insights --location eastus --resource-group herdlinx-rg
   az webapp config appsettings set --resource-group herdlinx-rg --name herdlinx-app --settings APPINSIGHTS_INSTRUMENTATIONKEY="<your-key>"
   ```

2. **View Logs:**
   ```bash
   az webapp log tail --name herdlinx-app --resource-group herdlinx-rg
   ```

##### Troubleshooting Azure Deployment

- **404 Errors on Routes:**
  - Ensure `web.config` is in your `dist` folder
  - Verify the file is deployed correctly

- **Build Fails:**
  - Check Node.js version in App Service settings
  - Review deployment logs in Azure Portal

- **Assets Not Loading:**
  - Verify base path in `vite.config.js` (should be `/` for root deployment)
  - Check that all files in `dist` are uploaded

- **Slow Performance:**
  - Enable CDN (Azure Front Door or Azure CDN)
  - Enable compression in App Service settings
  - Consider upgrading to a higher App Service Plan

##### Cost Optimization

- Use Free tier for development/testing
- Consider Azure Static Web Apps for better static site hosting (free tier available)
- Enable auto-shutdown for non-production environments
- Use Azure Dev/Test pricing if eligible

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

#### Azure Web App Configuration (web.config)

For Azure Web App deployments, create a `web.config` file in your `public` folder (Vite will copy it to `dist` during build):

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="SPA Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
      <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
    </staticContent>
    <httpProtocol>
      <customHeaders>
        <add name="X-Content-Type-Options" value="nosniff" />
        <add name="X-Frame-Options" value="DENY" />
        <add name="X-XSS-Protection" value="1; mode=block" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
```

Note: If you don't have a `public` folder, create one and place `web.config` there. Vite automatically copies files from `public` to `dist` during build.

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

