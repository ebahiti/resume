# Phase 2: Implementation Plan — elinorbahiti.ca on Nginx (No Changes Yet)

Exact steps to add the resume site without modifying any existing Nginx server blocks or other server state. Execute only when ready.

---

## Prerequisites (verify before starting)

- [ ] Domain `elinorbahiti.ca` (and optionally `www.elinorbahiti.ca`) DNS A records point to this server’s public IP.
- [ ] Vite/React resume app builds successfully: `npm run build` in `/home/admin/resume` produces a `dist/` directory.
- [ ] You have sudo on the server for Nginx and Certbot.

---

## Step 1: Create production web root and deploy build

1. Create the directory (if it does not exist):
   ```bash
   sudo mkdir -p /var/www/elinorbahiti.ca
   ```
2. Build the resume app from the workspace:
   ```bash
   cd /home/admin/resume && npm run build
   ```
3. Copy (or rsync) the Vite build output to the web root. Example (adjust ownership as needed):
   ```bash
   sudo rsync -av --delete /home/admin/resume/dist/ /var/www/elinorbahiti.ca/
   ```
   Or, if you prefer to deploy from a release path:
   ```bash
   sudo cp -a /home/admin/resume/dist/. /var/www/elinorbahiti.ca/
   ```
4. Set ownership so Nginx can read files (Nginx runs as `www-data`):
   ```bash
   sudo chown -R www-data:www-data /var/www/elinorbahiti.ca
   ```

---

## Step 2: Add an isolated Nginx config for elinorbahiti.ca

1. Create **one new file** (do not edit existing conf.d files):
   ```bash
   sudo nano /etc/nginx/conf.d/elinorbahiti.ca.conf
   ```
2. Put the following content in it. This is a **new** server block; it does not touch existing ones.

   **Option A — apex + www (recommended, matches your current WordPress setup):**

   ```nginx
   # elinorbahiti.ca – resume site (Vite static build)
   # Independent config. Do not merge into other server blocks.

   # HTTP: redirect to HTTPS
   server {
       listen 80;
       listen [::]:80;
       server_name elinorbahiti.ca www.elinorbahiti.ca;
       return 301 https://$host$request_uri;
   }

   # HTTPS: serve Vite build from /var/www/elinorbahiti.ca
   server {
       listen 443 ssl;
       listen [::]:443 ssl;
       server_name elinorbahiti.ca www.elinorbahiti.ca;

       root /var/www/elinorbahiti.ca;
       index index.html;

       # Let's Encrypt (Certbot will insert/update these lines)
       # ssl_certificate /etc/letsencrypt/live/elinorbahiti.ca/fullchain.pem;
       # ssl_certificate_key /etc/letsencrypt/live/elinorbahiti.ca/privkey.pem;
       # include /etc/letsencrypt/options-ssl-nginx.conf;
       # ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

       # SPA routing: client-side routes → index.html
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Optional: cache static assets (Vite typically has hashed filenames)
       location ~* \.(js|css|jpg|jpeg|png|gif|ico|svg|webp|woff|woff2|ttf|eot)$ {
           expires 30d;
           add_header Cache-Control "public, immutable";
       }

       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;
   }
   ```

   **Before running Certbot:** Comment out or remove the four SSL lines in the HTTPS server block (Certbot will add them). So initially you can use **snakeoil** for testing, or run Certbot first (Step 3) and then add this file with the SSL lines uncommented after Certbot has created the cert.

   **Simpler approach:** Use the same pattern as `minutes.mycondo.space.conf`: in the HTTPS block omit the `ssl_certificate`/`ssl_certificate_key`/include/ssl_dhparam lines entirely, run Certbot with `--nginx`, and let Certbot insert them.

   **Recommended initial HTTPS block (no SSL lines; Certbot will add them):**

   ```nginx
   # HTTPS: serve Vite build from /var/www/elinorbahiti.ca
   server {
       listen 443 ssl;
       listen [::]:443 ssl;
       server_name elinorbahiti.ca www.elinorbahiti.ca;

       root /var/www/elinorbahiti.ca;
       index index.html;

       # SPA routing
       location / {
           try_files $uri $uri/ /index.html;
       }

       location ~* \.(js|css|jpg|jpeg|png|gif|ico|svg|webp|woff|woff2|ttf|eot)$ {
           expires 30d;
           add_header Cache-Control "public, immutable";
       }

       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;
   }
   ```

   Then run Certbot (Step 3); Certbot will add the SSL directives and the HTTP→HTTPS redirect if you use the nginx plugin.

3. Test Nginx config:
   ```bash
   sudo nginx -t
   ```
4. If the test is OK, reload Nginx:
   ```bash
   sudo systemctl reload nginx
   ```

---

## Step 3: Issue SSL with Certbot and get HTTP → HTTPS

1. Request a certificate for both apex and www (so both use HTTPS):
   ```bash
   sudo certbot --nginx -d elinorbahiti.ca -d www.elinorbahiti.ca
   ```
2. Follow the prompts (email, agree to terms). Certbot will:
   - Create the certificate.
   - Modify **only** the server block(s) for `elinorbahiti.ca` / `www.elinorbahiti.ca` in `conf.d/elinorbahiti.ca.conf` (add/update `ssl_certificate`, `ssl_certificate_key`, `include`, and optionally adjust the HTTP server to `return 301 https://...`).
3. Certbot does **not** touch other conf.d files, so no collision with `mycondo.space`, `vote.mycondo.space`, or `minutes.mycondo.space`.
4. Reload Nginx again if Certbot didn’t already:
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

---

## Step 4: Avoid collisions with existing domains

- **Different server_name:** Only `elinorbahiti.ca` and `www.elinorbahiti.ca` are in the new block. Existing configs use only `*.mycondo.space` and `_`, so no overlap.
- **Separate file:** Using `conf.d/elinorbahiti.ca.conf` keeps the resume site independent; you can disable it by renaming/removing this file without touching others.
- **Default server:** `z-default.conf` uses `server_name _`. Requests to `elinorbahiti.ca` will match the new block first because Nginx matches specific `server_name` values before the default. No change to `z-default.conf` is required.

---

## Step 5: Local development (no server changes)

- In `/home/admin/resume`, run:
  ```bash
  npm run dev
  ```
- Vite will serve the app on `http://localhost:5173`. This does not require Nginx or any change to existing Nginx configs.

---

## Checklist summary

| # | Action |
|---|--------|
| 1 | Create `/var/www/elinorbahiti.ca`, build Vite app, deploy `dist` there, set `www-data` ownership |
| 2 | Add **only** `/etc/nginx/conf.d/elinorbahiti.ca.conf` (HTTP redirect + HTTPS with root and SPA fallback; no SSL lines so Certbot can add them) |
| 3 | Run `sudo nginx -t` and `sudo systemctl reload nginx` |
| 4 | Run `sudo certbot --nginx -d elinorbahiti.ca -d www.elinorbahiti.ca` |
| 5 | Run `sudo nginx -t && sudo systemctl reload nginx` if needed |
| 6 | Use `npm run dev` in `/home/admin/resume` for local dev on port 5173 |

No existing Nginx server blocks or other configs need to be modified.
