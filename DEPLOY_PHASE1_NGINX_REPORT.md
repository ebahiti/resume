# Phase 1: Nginx & SSL Investigation (Read-Only)

**Date:** 2025-02-11  
**Scope:** Existing Nginx config and Certbot on Ubuntu Lightsail. No config or server state was changed.

---

## 1. How Nginx Loads Config

- **Main config:** `/etc/nginx/nginx.conf`
- **Active includes:** Only `include /etc/nginx/conf.d/*.conf;` — no `sites-enabled` or `sites-available` include.
- **Conclusion:** All active server blocks come from files in `/etc/nginx/conf.d/`. Files in `sites-available/` are **not** loaded.

---

## 2. Active Server Blocks

| Config file | Purpose |
|-------------|---------|
| `conf.d/minutes.mycondo.space.conf` | Minutes marketing SPA (Vite); root `/home/admin/marketing-sites/minutes-marketing/dist`; `/api` → 3002 |
| `conf.d/mycondo.space.conf` | Main mycondo.space SPA; root `/var/www/mycondo.space/dist`; `/api` → 3000 |
| `conf.d/vote.mycondo.space.conf` | Vote app SPA; root `/var/www/vote.mycondo.space/dist`; `/api` → 3001 |
| `conf.d/z-default.conf` | Default/catch-all for port 80 and 443 (`server_name _`) |

---

## 3. Domains in Use

| Domain(s) | Config | SSL |
|-----------|--------|-----|
| `minutes.mycondo.space` | minutes.mycondo.space.conf | Let's Encrypt |
| `mycondo.space`, `www.mycondo.space` | mycondo.space.conf | Let's Encrypt |
| `vote.mycondo.space` | vote.mycondo.space.conf | Let's Encrypt |
| `_` (default / any other host) | z-default.conf | Snakeoil (self-signed) |

**Note:** `elinorbahiti.ca` and `www.elinorbahiti.ca` do **not** appear in any current server block. Adding a new server block for them will not conflict with existing domains.

---

## 4. Current SSL Setup

- **Let's Encrypt:** Used for `minutes.mycondo.space`, `mycondo.space` (covers www), and `vote.mycondo.space`.
  - Cert paths: `/etc/letsencrypt/live/<domain>/fullchain.pem` and `privkey.pem`
  - Shared options: `include /etc/letsencrypt/options-ssl-nginx.conf;`
  - DH params: `ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;`
- **Default server:** `z-default.conf` uses snakeoil certs:
  - `/etc/ssl/certs/ssl-cert-snakeoil.pem`
  - `/etc/ssl/private/ssl-cert-snakeoil.key`
- **HTTP → HTTPS:** All three named sites redirect port 80 to HTTPS (301). The default server also redirects 80 → 443.

---

## 5. Certbot

- **Installed:** Yes  
- **Path:** `/usr/bin/certbot`  
- **Version:** `certbot 2.1.0`  
- **Usage on this server:** Nginx configs show Certbot-managed comments and Let's Encrypt paths; certs are obtained/maintained with Certbot (e.g. `certbot --nginx -d <domain>`).

---

## 6. Summary for elinorbahiti.ca

- **No existing config** for `elinorbahiti.ca` or `www.elinorbahiti.ca`.
- **Pattern to follow:** Add a **new** file under `conf.d/` (e.g. `elinorbahiti.ca.conf`) so the resume site is isolated and existing server blocks are untouched.
- **Production root:** Use `/var/www/elinorbahiti.ca` (Vite `dist` output) as specified.
- **SSL:** Use Certbot with the nginx plugin; Certbot is already installed and used for other domains.
