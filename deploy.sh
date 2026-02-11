#!/bin/bash
# Deploy resume build to live web root (elinorbahiti.ca).
# Run from repo root: ./deploy.sh   or: npm run deploy
set -e
cd "$(dirname "$0")"
echo "Building..."
npm run build
echo "Syncing dist/ to /var/www/elinorbahiti.ca..."
sudo rsync -av --delete dist/ /var/www/elinorbahiti.ca/
sudo chown -R www-data:www-data /var/www/elinorbahiti.ca
echo "Done. Live site updated."
