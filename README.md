# EDDSA Multisig System Frontend

A comprehensive React-based frontend application for an EDDSA (Edwards-curve Digital Signature Algorithm) Multisig System that provides key management, digital signature operations, and multisig wallet functionality.

## 🚀 Features

- **Key Management**: Generate, import, export, and manage Ed25519 key pairs
- **Digital Signatures**: Create and verify EDDSA signatures with support for batch operations
- **Multisig Wallets**: Create and manage M-of-N multisig wallets with transaction signing
- **Real-time Updates**: WebSocket integration for live transaction status updates
- **Security First**: Client-side cryptography with secure key handling
- **Modern UI**: Responsive design with accessibility support
- **Comprehensive Testing**: Unit, integration, and E2E tests

## 🛠️ Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Cryptography**: @noble/ed25519 for Ed25519 operations
- **HTTP Client**: Axios
- **Testing**: Jest + React Testing Library + Playwright
- **Styling**: CSS with component-based architecture
- **Linting**: ESLint + Prettier

## 📋 Prerequisites

- Node.js 16.0 or higher
- npm 8.0 or higher
- Modern web browser with ES2020 support

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Layout, Navigation, etc.)
│   ├── KeyManagement/  # Key-related components
│   ├── Signatures/     # Signature-related components
│   └── MultisigWallet/ # Wallet-related components
├── pages/              # Page components
├── services/           # API and business logic
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # CSS styles

tests/
├── unit/               # Unit tests
├── integration/        # Integration tests
└── e2e/               # End-to-end tests
```

## 🚀 Quick Start

### Automated Setup (Recommended)

Run the setup script to install all dependencies and configure the project:

```bash
# For Windows PowerShell
.\setup.ps1

# For Unix/Linux/macOS (create similar setup.sh)
chmod +x setup.sh && ./setup.sh
```

### Manual Setup

1. **Clone and navigate to the project**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000`

## 📝 Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Testing

- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:e2e:ui` - Run E2E tests with UI

### Code Quality

- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
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
```

### API Endpoints

The frontend expects the following backend API endpoints:

#### Key Management

- `POST /api/keys/generate` - Generate new key pair
- `GET /api/keys` - List user keys
- `DELETE /api/keys/:keyId` - Delete key

#### Signatures

- `POST /api/signatures/create` - Create signature
- `POST /api/signatures/verify` - Verify signature
- `GET /api/signatures` - List signatures

#### Wallets

- `POST /api/wallets` - Create multisig wallet
- `GET /api/wallets` - List wallets
- `GET /api/wallets/:walletId` - Get wallet details

#### Transactions

- `POST /api/wallets/:walletId/transactions` - Create transaction
- `GET /api/wallets/:walletId/transactions` - List transactions
- `POST /api/transactions/:txId/sign` - Sign transaction

## 🧪 Testing

### Unit Tests

Run unit tests for components and services:

```bash
npm test
```

Example test structure:

```typescript
// tests/unit/components/KeyGenerator.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import KeyGenerator from '@components/KeyManagement/KeyGenerator';

test('generates key pair when button clicked', async () => {
  render(<KeyGenerator />);
  const button = screen.getByRole('button', { name: /generate/i });
  fireEvent.click(button);

  expect(await screen.findByText(/key generated/i)).toBeInTheDocument();
});
```

### E2E Tests

Run end-to-end tests with Playwright:

```bash
npm run test:e2e
```

Example E2E test:

```typescript
// tests/e2e/wallet-creation.spec.ts
import { test, expect } from '@playwright/test';

test('create multisig wallet', async ({ page }) => {
  await page.goto('/wallets');
  await page.click('text=Create Wallet');
  await page.fill('[name="name"]', 'Test Wallet');
  await page.fill('[name="requiredSignatures"]', '2');
  await page.click('text=Create');

  await expect(page.locator('text=Wallet created')).toBeVisible();
});
```

## 🔐 Security Considerations

### Key Security

- Private keys are never sent to the server
- Keys are generated using cryptographically secure random numbers
- Sensitive data is cleared from memory when possible
- Users are warned about key security best practices

### Input Validation

- All user inputs are validated both client and server-side
- Cryptographic operations use validated parameters
- XSS protection through proper escaping

### Communication

- All API calls use HTTPS in production
- Request signing for critical operations
- WebSocket connections are authenticated

## 🎨 UI/UX Guidelines

### Design Principles

- **Clarity**: Clear labeling and intuitive workflows
- **Security**: Prominent security warnings and confirmations
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsiveness**: Mobile-first responsive design

### Component Guidelines

- Use semantic HTML elements
- Implement proper ARIA labels
- Support keyboard navigation
- Provide loading and error states

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment-specific Builds

```bash
# Staging
VITE_NODE_ENV=staging npm run build

# Production
VITE_NODE_ENV=production npm run build
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📚 API Documentation

### Key Management

#### Generate Key Pair

```typescript
POST /api/keys/generate
Content-Type: application/json

{
  "algorithm": "Ed25519",
  "alias": "My Key"
}

Response:
{
  "success": true,
  "data": {
    "keyId": "key_1234567890",
    "publicKey": "abcdef...",
    "privateKey": "123456...",
    "algorithm": "Ed25519",
    "createdAt": "2023-01-01T00:00:00Z"
  }
}
```

#### Create Signature

```typescript
POST /api/signatures/create
Content-Type: application/json

{
  "message": "Hello, World!",
  "keyId": "key_1234567890"
}

Response:
{
  "success": true,
  "data": {
    "signatureId": "sig_1234567890",
    "signature": "abcdef...",
    "message": "Hello, World!",
    "publicKey": "abcdef...",
    "timestamp": "2023-01-01T00:00:00Z"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests: `npm test && npm run test:e2e`
5. Commit your changes: `git commit -am 'Add my feature'`
6. Push to the branch: `git push origin feature/my-feature`
7. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure code passes linting and formatting checks
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

1. Check the [documentation](./docs/)
2. Search [existing issues](../../issues)
3. Create a [new issue](../../issues/new)

## 🏆 Acknowledgments

- [Noble Cryptography](https://github.com/paulmillr/noble-ed25519) for Ed25519 implementation
- [React Team](https://reactjs.org/) for the amazing framework
- [Vite Team](https://vitejs.dev/) for the lightning-fast build tool
- [Testing Library](https://testing-library.com/) for testing utilities

---

**Built with ❤️ for secure decentralized applications**
#   f r o n t e n d _ e d d s a  
 