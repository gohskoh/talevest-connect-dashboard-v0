# Wallet Connection Setup Instructions

This Talevest prototype includes full wallet connection functionality using Reown (formerly WalletConnect). To complete the setup, you need to create a Reown project and configure your project ID.

## Steps to Configure Wallet Connection:

### 1. Create a Reown Project
1. Go to [cloud.reown.com](https://cloud.reown.com)
2. Sign up or log in to your account
3. Create a new project
4. Copy your Project ID

### 2. Configure Your App IDs
Your provided app IDs:
- **Apple Platform App ID**: `apple.talevest.v0`
- **Android App ID**: `andro.talevest.v0`

### 3. Update the Configuration
In `src/lib/wallet-config.ts`, replace the placeholder project ID:

```typescript
// Replace this line:
const projectId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'

// With your actual Reown Project ID:
const projectId = 'YOUR_ACTUAL_PROJECT_ID_HERE'
```

### 4. Configure Platform-Specific Settings
In your Reown dashboard:
1. Go to your project settings
2. Add your app domains and URLs
3. Configure the platform-specific app IDs:
   - iOS: `apple.talevest.v0`
   - Android: `andro.talevest.v0`

## Supported Wallets
The configuration includes popular wallets:
- MetaMask
- Trust Wallet
- Phantom
- Binance Web3 Wallet
- And many more via the `allWallets: 'SHOW'` configuration

## Features Included
- ✅ Multi-chain support (Ethereum, Arbitrum, Polygon)
- ✅ Mobile-optimized wallet connection
- ✅ Account state management
- ✅ Automatic reconnection
- ✅ Beautiful UI integration with Talevest theme
- ✅ Responsive design

## Testing
After configuring your project ID:
1. Click "Connect Wallet" in the header
2. Select your preferred wallet
3. Approve the connection
4. Your address will be displayed in the header

The wallet connection state is managed throughout the app and persists across page navigation.