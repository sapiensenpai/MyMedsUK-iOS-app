# MyMeds UKultra - UK Medication Database App

![Security](https://img.shields.io/badge/Security-API%20Keys%20Protected-green)
![iOS](https://img.shields.io/badge/iOS-18.5%2B-blue)
![Swift](https://img.shields.io/badge/Swift-5.0-orange)
![SwiftUI](https://img.shields.io/badge/UI-SwiftUI-purple)

A comprehensive iOS app for searching and analyzing UK medications with AI-powered drug interaction analysis.

## Features
- 🔍 Search UK medications from MHRA database
- �� AI-powered drug interaction analysis
- 💬 Medical AI chat assistant
- 🌐 Multilingual support (French/English)
- 📱 Modern SwiftUI interface with glass morphism design

## Setup Instructions

### Prerequisites
- Xcode 15.0+
- iOS 18.5+
- OpenAI API key

### Installation
1. Clone the repository
2. Copy `APIKeys.plist.template` to `APIKeys.plist`
3. Add your OpenAI API key to `APIKeys.plist`
4. Open `MyMeds_UKultra.xcodeproj` in Xcode
5. Build and run

### API Configuration
The app requires an OpenAI API key for AI features:
- Copy `APIKeys.plist.template` to `APIKeys.plist`
- Replace `YOUR_OPENAI_API_KEY_HERE` with your actual API key
- The app uses GPT-4o by default

## Architecture
- **SwiftUI** for modern UI
- **Railway AI** + **OpenAI** for medical AI services
- **MHRA Database** for UK medication data
- **Glass morphism** design system

## Security
- API keys are excluded from version control
- Large database files are not included in the repository
- Sensitive legal documents are excluded

## License
[Add your license here]
