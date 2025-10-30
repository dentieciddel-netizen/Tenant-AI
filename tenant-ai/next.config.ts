# Create a proper package.json
cat > package.json << 'EOF'
{
  "name": "tenant-ai",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next": "14.0.0",
    "@prisma/client": "^6.18.0",
    "@prisma/extension-accelerate": "^0.4.0",
    "@paystack/paystack-sdk": "^2.0.6",
    "openai": "^4.0.0",
    "next-auth": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "tailwindcss": "^3.3.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0"
  }
}
EOF

# Install dependencies
npm install