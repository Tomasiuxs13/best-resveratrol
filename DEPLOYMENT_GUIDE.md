# Deployment Guide for Hostinger

## 🔴 Issue: 403 Forbidden Error - SOLVED ✅

### Problem
The 403 Forbidden error occurred because you uploaded the **source code** instead of the **built production files**.

### Solution
You need to upload the contents of the `/dist` folder, not the entire project.

---

## 📦 Step-by-Step Deployment to Hostinger

### Step 1: Build the Production Bundle

Run this command in your project directory:

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Step 2: What Gets Created

After building, your `dist/` folder contains:

```
dist/
├── index.html          # Main HTML file
├── assets/
│   └── index-[hash].js # Minified JavaScript bundle
├── robots.txt          # SEO crawler directives
├── sitemap.xml         # SEO sitemap
└── .htaccess           # Apache configuration (created)
```

### Step 3: Upload to Hostinger

**Option A: Via File Manager (Recommended)**

1. Log in to Hostinger control panel (hPanel)
2. Go to **File Manager**
3. Navigate to `public_html/` (or your domain's root folder)
4. **Delete everything** in the folder (or backup first)
5. Upload **ONLY the contents** of the `dist/` folder:
   - `index.html`
   - `assets/` folder
   - `robots.txt`
   - `sitemap.xml`
   - `.htaccess`

**⚠️ IMPORTANT:** Upload the **contents** of dist/, not the dist folder itself!

**Option B: Via FTP**

1. Connect to Hostinger via FTP (use FileZilla or similar)
   - Host: Your domain or FTP hostname
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (or 22 for SFTP)

2. Navigate to `public_html/` on the server
3. Delete existing files (backup first if needed)
4. Upload contents of your local `dist/` folder

**Option C: Via Git (Advanced)**

If Hostinger supports Git deployment:

1. Push your code to GitHub (already done ✅)
2. SSH into Hostinger server
3. Clone repository
4. Run `npm install`
5. Run `npm run build`
6. Copy `dist/*` to `public_html/`

---

## 🔧 File Structure on Server

After deployment, your `public_html/` should look like this:

```
public_html/
├── index.html          ← Main entry point
├── assets/
│   └── index-CjvRAcgi.js
├── robots.txt
├── sitemap.xml
└── .htaccess          ← Critical for routing!
```

---

## ⚙️ What .htaccess Does

The `.htaccess` file I created handles:

1. **Client-Side Routing** - Redirects all requests to `index.html` so React Router works
2. **Security Headers** - Protects against XSS, clickjacking, MIME sniffing
3. **Compression** - Gzip compression for faster loading
4. **Browser Caching** - Caches static assets for better performance
5. **HTTPS Redirect** - Forces HTTPS (optional, commented out)

### Enable HTTPS (Recommended)

In `.htaccess`, uncomment these lines:

```apache
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

Remove the `#` to enable HTTPS redirection.

---

## 🌐 Update Your Domain URLs

After deployment, update placeholder URLs:

### 1. In `utils/seoHelpers.ts`:

```typescript
const baseUrl = "https://yourdomain.com"; // Change this!
```

### 2. In `public/sitemap.xml`:

Replace all instances of:
```xml
<loc>https://www.yoursite.com/</loc>
```

With your actual domain:
```xml
<loc>https://yourdomain.com/</loc>
```

### 3. In `index.html`:

Update Open Graph and canonical URLs:
```html
<meta property="og:url" content="https://yourdomain.com/" />
<link rel="canonical" href="https://yourdomain.com/" />
```

### 4. Rebuild and Redeploy:

```bash
npm run build
# Upload new dist/ contents to Hostinger
```

---

## ✅ Verification Checklist

After deployment, verify these work:

### Basic Functionality
- [ ] Homepage loads at `https://yourdomain.com/`
- [ ] Product pages load: `/products/partiqlar-pure-resveratrol`
- [ ] Guide pages load: `/guides/how-to-choose-resveratrol`
- [ ] Blog page loads: `/blog`
- [ ] FAQ page loads: `/faq`

### SEO Files
- [ ] Robots.txt accessible: `https://yourdomain.com/robots.txt`
- [ ] Sitemap accessible: `https://yourdomain.com/sitemap.xml`
- [ ] Meta tags show in page source (View Page Source)

### Routing
- [ ] Direct URL access works (e.g., typing `/products/toniiq-ultra-high-purity` directly)
- [ ] Browser back/forward buttons work
- [ ] No 404 errors on refresh

### Performance
- [ ] Pages load in under 3 seconds
- [ ] Images display correctly
- [ ] No console errors (F12 Developer Tools)

---

## 🐛 Troubleshooting

### Still Getting 403 Forbidden?

**Possible Causes:**

1. **Wrong File Permissions**
   - Files should be `644` (rw-r--r--)
   - Folders should be `755` (rwxr-xr-x)
   - Fix via File Manager or FTP client

2. **No index.html in Root**
   - Ensure `index.html` is directly in `public_html/`
   - NOT in a subfolder like `public_html/dist/`

3. **Apache ModRewrite Disabled**
   - Contact Hostinger support to enable `mod_rewrite`
   - Usually enabled by default

4. **.htaccess Not Uploaded**
   - Ensure `.htaccess` file is uploaded
   - FTP clients sometimes hide files starting with `.`
   - Enable "Show hidden files" in FTP client

### Getting 404 on Product Pages?

**.htaccess not working:**
- Verify `.htaccess` is uploaded
- Check file permissions (should be 644)
- Contact Hostinger to ensure `mod_rewrite` is enabled

### Blank White Page?

**JavaScript not loading:**
- Check browser console for errors (F12)
- Verify `assets/` folder uploaded correctly
- Check file paths in `index.html` are correct

### CSS/Styling Missing?

**Tailwind CSS issue:**
- Tailwind is loaded from CDN in `index.html`
- Check internet connection works on server
- View page source to verify CDN link is present

---

## 🚀 Performance Optimization After Deployment

### 1. Enable Cloudflare (Free CDN)

Hostinger supports Cloudflare integration:
1. Go to hPanel → Websites → Manage
2. Click "Cloudflare"
3. Enable free plan
4. Benefits: CDN, DDoS protection, SSL

### 2. Optimize Images

Before next deployment:
- Convert images to WebP format
- Compress with tools like TinyPNG
- Add proper alt text (SEO benefit)

### 3. Monitor Performance

Tools to check:
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

Target metrics:
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Total Blocking Time (TBT): < 300ms

---

## 📊 Post-Deployment SEO Setup

### 1. Submit to Google Search Console

1. Go to https://search.google.com/search-console
2. Add your property: `https://yourdomain.com`
3. Verify ownership (DNS or HTML file method)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 2. Submit to Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. Add your site
3. Verify ownership
4. Submit sitemap

### 3. Monitor Rankings

Track these keywords weekly:
- "best resveratrol supplements 2025"
- "resveratrol supplement reviews"
- "[Your top products] resveratrol review"

Tools:
- Google Search Console (free)
- Ahrefs (paid)
- SEMrush (paid)
- Ubersuggest (free tier available)

---

## 🔄 Future Deployments

When you make changes:

1. **Update Code Locally**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Rebuild**
   ```bash
   npm run build
   ```

3. **Upload to Hostinger**
   - Upload contents of `dist/` to `public_html/`
   - Overwrite existing files

---

## 📞 Hostinger Support

If you continue having issues:

**Contact Hostinger Support:**
- Live Chat: Available 24/7 in hPanel
- Email: support@hostinger.com
- Tell them: "403 error with React SPA deployment, need mod_rewrite enabled"

**Provide them:**
- Your domain name
- Screenshot of error
- Mention you're deploying a React Single Page Application

---

## ✅ Quick Deploy Checklist

Use this every time you deploy:

- [ ] Run `npm run build` locally
- [ ] Verify `dist/` folder created successfully
- [ ] Backup current `public_html/` on server (optional)
- [ ] Delete old files in `public_html/`
- [ ] Upload **contents** of `dist/` to `public_html/`
- [ ] Verify `.htaccess` uploaded (show hidden files)
- [ ] Check file permissions (644 for files, 755 for folders)
- [ ] Test homepage loads
- [ ] Test product page URL directly
- [ ] Test sitemap.xml accessible
- [ ] Test robots.txt accessible
- [ ] Clear browser cache and test again

---

## 🎉 Success Indicators

You'll know deployment succeeded when:

✅ Homepage loads without errors
✅ Can navigate to product pages
✅ URLs work when pasted directly in browser
✅ Browser refresh doesn't cause 404
✅ Sitemap loads at `/sitemap.xml`
✅ Robots.txt loads at `/robots.txt`
✅ View Page Source shows your meta tags
✅ No console errors (F12 → Console tab)

---

## 📝 Notes

- **Build Time:** ~5-10 seconds
- **Upload Time:** ~30-60 seconds (depending on connection)
- **Total Deploy Time:** < 2 minutes
- **Bundle Size:** ~314KB (JavaScript)
- **Files to Upload:** 5 files total

---

**Last Updated:** January 30, 2025
**Status:** Ready for Deployment ✅
**Build Output:** `/dist` folder

**Need Help?** Check troubleshooting section or contact Hostinger support.
