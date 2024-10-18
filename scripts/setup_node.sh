#!/bin/bash
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc
fnm use --install-if-missing 20
node -v 
npm -v #
npm install --force
npm run build