#!/bin/bash
# Remove old Spring MVC + JSP project files
# Run this after verifying the new app works

echo "Removing old project modules..."
rm -rf beatify-core
rm -rf beatify-web

echo "Removing old GitHub Actions workflow..."
rm -rf .github

echo "Done. Old files removed."
