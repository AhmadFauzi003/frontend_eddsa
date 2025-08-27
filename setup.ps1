#!/usr/bin/env powershell

# EDDSA Multisig Frontend Setup Script
# This script sets up the complete development environment

Write-Host "Setting up EDDSA Multisig Frontend..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Yellow
} catch {
    Write-Host "Error: Node.js is not installed. Please install Node.js 16+ and try again." -ForegroundColor Red
    exit 1
}

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Yellow
} catch {
    Write-Host "Error: npm is not available. Please ensure npm is installed with Node.js." -ForegroundColor Red
    exit 1
}

Write-Host "Installing dependencies..." -ForegroundColor Blue

# Install main dependencies
npm install react@^18.2.0 react-dom@^18.2.0

# Install routing
npm install react-router-dom@^6.8.1

# Install HTTP client
npm install axios@^1.3.4

# Install crypto library
npm install @noble/ed25519@^1.7.3

# Install form handling
npm install react-hook-form@^7.43.5

# Install data fetching
npm install @tanstack/react-query@^4.26.1

# Install utility libraries
npm install clsx@^1.2.1

# Install development dependencies
Write-Host "Installing development dependencies..." -ForegroundColor Blue

# TypeScript and types
npm install -D typescript@^4.9.5 @types/react@^18.0.28 @types/react-dom@^18.0.11 @types/node@^18.15.3

# Vite and plugins
npm install -D vite@^4.1.4 @vitejs/plugin-react@^3.1.0

# Testing dependencies
npm install -D jest@^29.5.0 jest-environment-jsdom@^29.5.0 ts-jest@^29.0.5 @testing-library/react@^14.0.0 @testing-library/jest-dom@^5.16.5 @testing-library/user-event@^14.4.3

# E2E testing
npm install -D @playwright/test@^1.31.2

# Linting and formatting
npm install -D eslint@^8.36.0 @typescript-eslint/eslint-plugin@^5.56.0 @typescript-eslint/parser@^5.56.0 eslint-plugin-react@^7.32.2 eslint-plugin-react-hooks@^4.6.0 eslint-plugin-react-refresh@^0.3.4 prettier@^2.8.4

# CSS processing
npm install -D autoprefixer@^10.4.14 postcss@^8.4.21 tailwindcss@^3.2.7

Write-Host "Dependencies installed successfully!" -ForegroundColor Green

# Create additional configuration files
Write-Host "Creating configuration files..." -ForegroundColor Blue

# Create .eslintrc.js
$eslintConfig = @"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-refresh', '@typescript-eslint', 'react'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
"@

$eslintConfig | Out-File -FilePath ".eslintrc.js" -Encoding UTF8

# Create .prettierrc
$prettierConfig = @"
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "lf"
}
"@

$prettierConfig | Out-File -FilePath ".prettierrc" -Encoding UTF8

# Create .env.example
$envExample = @"
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_WEBSOCKET_URL=ws://localhost:5000/ws

# Application Configuration
VITE_APP_NAME=EDDSA Multisig System
VITE_APP_VERSION=1.0.0

# Environment
VITE_NODE_ENV=development

# Security
VITE_ENABLE_DEVTOOLS=true
"@

$envExample | Out-File -FilePath ".env.example" -Encoding UTF8

# Create playwright.config.ts
$playwrightConfig = @"
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
});
"@

$playwrightConfig | Out-File -FilePath "playwright.config.ts" -Encoding UTF8

Write-Host "Configuration files created!" -ForegroundColor Green

# Install Playwright browsers
Write-Host "Installing Playwright browsers..." -ForegroundColor Blue
npx playwright install

Write-Host "Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Copy .env.example to .env and configure your environment variables"
Write-Host "2. Run 'npm run dev' to start the development server"
Write-Host "3. Run 'npm test' to run unit tests"
Write-Host "4. Run 'npm run test:e2e' to run end-to-end tests"
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
