# BrainBuster
## AI-Powered Quiz Application Documentation

### Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [API Configuration](#api-configuration)
5. [Technical Architecture](#technical-architecture)
6. [Development Guide](#development-guide)
7. [Building & Deployment](#building--deployment)
8. [Troubleshooting](#troubleshooting)
9. [Contributing](#contributing)
10. [Resources & Links](#resources--links)

## Introduction
BrainBuster is an innovative quiz application that leverages the power of Google's Gemini AI to create dynamic, engaging quizzes across various subjects. Built with Electron.js, it offers a seamless cross-platform experience while providing real-time, AI-generated questions and answers.

## Features

### Core Features
- **AI-Powered Questions**: Integration with Gemini API for dynamic question generation
- **Custom Categories**: Users can specify any topic for quiz generation
- **Flexible Quiz Length**: Choose between 3, 5, or 10 questions per quiz
- **Interactive Interface**: User-friendly design with real-time feedback
- **Cross-Platform**: Available for Windows, macOS, and Linux
- **Review System**: Comprehensive answer review and scoring system

### Technical Features
- **Robust Error Handling**: Informative error messages and crash prevention
- **Secure API Integration**: Safe handling of API keys and requests
- **Responsive Design**: Seamless adaptation to different screen sizes
- **State Management**: Efficient quiz state and progress tracking

## Installation

### Prerequisites
- Node.js (Latest LTS version)
- npm (Node Package Manager)
- Google Gemini API key

### Download Options
1. **Direct Download**
   - Visit [Github Release](https://lnkd.in/gdcX8G4K)
   - Download the appropriate version for your operating system

2. **From Source**
   ```bash
   # Clone repository
   git clone https://lnkd.in/gaMkdHHt
   cd brainbuster-quiz

   # Install dependencies
   npm install

   # Start application
   npm start
   ```

## API Configuration

### Getting the API Key
1. Visit [Google AI Studio](https://lnkd.in/gE3-e7hz)
2. Follow the registration process
3. Generate your API key

### Setting Up Environment Variables

#### Windows
1. Right-click Start button → System
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "User variables" click "New"
5. Enter:
   - Variable name: `API_KEY`
   - Variable value: `Your_Gemini_API_Key`
6. Click "OK" to save

#### macOS/Linux
```bash
# Add to ~/.bash_profile or ~/.zshrc
export API_KEY=Your_Gemini_API_Key
```

#### Application Method
Create a `.env` file in the root directory:
```env
API_KEY=Your_Gemini_API_Key
```

## Technical Architecture

### Project Structure
```
brainbuster-quiz/
├── main.js           # Main process
├── preload.js        # Preload script
├── renderer.js       # Renderer process
├── index.html        # Application UI
├── style.css         # Styling
├── package.json      # Project configuration
└── .env             # Environment variables
```

### Dependencies
```json
{
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "dotenv": "^16.4.5",
    "node-fetch": "^3.3.2"
  },
  "devDependencies": {
    "electron": "^32.1.2",
    "electron-builder": "^25.1.8"
  }
}
```

## Development Guide

### Setting Up Development Environment
```bash
# Install dependencies
npm install

# Start in development mode
npm start

# Build application
npm run build
```

### Build Configuration
```json
{
  "build": {
    "appId": "com.example.quizapp",
    "files": [
      "dist/**/*",
      "node_modules/**/*",
      "package.json",   
      "main.js",
      "preload.js",
      "renderer.js",
      "index.html",    
      "style.css"
    ]
  }
}
```

## Building & Deployment

### Building for Different Platforms
```bash
# Windows
npm run build -- --win

# macOS
npm run build -- --mac

# Linux
npm run build -- --linux

# All platforms
npm run build -- -mwl
```

### Distribution Files
```
dist/
├── win-unpacked/     # Windows build
├── mac/              # macOS build
└── linux-unpacked/   # Linux build
```

## Troubleshooting

### Common Issues & Solutions

1. **API Connection Issues**
   - Verify API key configuration
   - Check internet connectivity
   - Confirm API quota availability

2. **Application Startup Problems**
   - Verify environment variables
   - Check dependency installation
   - Clear application cache

3. **Build Errors**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Rebuild dependencies
   npm rebuild
   ```

## Contributing

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Implement changes
4. Submit pull request

### Development Guidelines
- Follow existing code style
- Add appropriate documentation
- Include test cases
- Update README if needed

## Resources & Links

### Official Links
- [GitHub Repository](https://lnkd.in/gaMkdHHt)
- [Latest Release](https://lnkd.in/gdcX8G4K)
- [Gemini API Documentation](https://lnkd.in/gE3-e7hz)

### Community & Support
- Submit issues on GitHub
- Join discussions
- Contribute to development

## Future Roadmap

### Planned Features
1. **Short-term**
   - User authentication
   - Score history tracking
   - Offline mode support

2. **Long-term**
   - Multiple quiz formats
   - Social sharing capabilities
   - Custom themes
   - Mobile version

## Security

### Best Practices
1. **API Security**
   - Secure key storage
   - Request rate limiting
   - Error handling

2. **Application Security**
   - Input validation
   - Data sanitization
   - Secure IPC communication

## Performance

### Optimization Guidelines
1. **Application Size**
   - Optimize dependencies
   - Remove unused modules
   - Compress assets

2. **Memory Management**
   - Clear unused states
   - Optimize question loading
   - Efficient cache management

## Support

### Getting Help
- Check documentation
- Submit GitHub issues
- Join community discussions
- Contact development team

Remember to check for updates regularly as BrainBuster continues to evolve with new features and improvements. Your feedback and contributions are valuable in making this application better for everyone!

