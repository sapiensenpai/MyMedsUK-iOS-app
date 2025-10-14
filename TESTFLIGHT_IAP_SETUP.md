# TestFlight In-App Purchase Setup Guide

## Why Payments Work in Xcode but Not TestFlight

The StoreKit Configuration file (`StoreKitConfig.storekit`) is **only for local Xcode testing**. TestFlight uses the **real App Store Connect backend** (sandbox environment).

## Required Setup in App Store Connect

### Step 1: Create In-App Purchase Product

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Navigate to **My Apps** → Select your app
3. Go to **In-App Purchases** (left sidebar)
4. Click the **+** button to create a new in-app purchase

### Step 2: Configure the Subscription

**Product Information:**
- **Reference Name:** `MyMeds AI Plus Monthly`
- **Product ID:** `21527952` ⚠️ **MUST MATCH EXACTLY**
- **Subscription Group:** Create or select group with ID `21806649`

**Subscription Duration:**
- Select: **1 Month**

**Subscription Prices:**
- **Price:** £9.99/month (or your preferred price)
- Add pricing for all territories you want to support

**Localizations (at least one required):**
- **Language:** English (UK)
- **Display Name:** MyMeds AI Plus
- **Description:** Full access to AI-powered medical assistant, drug interactions, and personalized guidance.

### Step 3: Add Introductory Offer (14-Day Free Trial)

1. In the subscription details, find **Introductory Offers**
2. Click **Add Introductory Offer**
3. Configure:
   - **Type:** Free
   - **Duration:** 2 Weeks (14 days)
   - **Number of periods:** 1
   - Add all territories

### Step 4: Submit for Review

1. Click **Save**
2. Fill in any required metadata
3. Submit the In-App Purchase for review
4. **Note:** IAP products must be "Ready to Submit" or "Approved" to work in TestFlight

### Step 5: Add Sandbox Test Users

1. In App Store Connect, go to **Users and Access**
2. Click **Sandbox Testers** (left sidebar)
3. Click **+** to add a new tester
4. Fill in details (use a **unique email** that's **not** your Apple ID)
5. Use these credentials to test in TestFlight

## Testing in TestFlight

### Before Testing:
1. **Sign out** of your real App Store account on the device:
   - Settings → App Store → Sign Out
   
2. **Do NOT sign in** with sandbox account yet

### During Testing:
1. Open the app from TestFlight
2. Try to make a purchase
3. When prompted, sign in with your **sandbox test user**
4. Complete the purchase flow

### Verify Purchase Works:
- The 14-day free trial should be offered
- Payment should complete successfully
- Subscription should activate immediately

## Common Issues & Solutions

### Issue: "Cannot connect to iTunes Store"
**Solution:** Make sure you're signed out of your production Apple ID in Settings → App Store

### Issue: "Product not available"
**Solution:** 
- Verify product ID matches exactly: `21527952`
- Ensure IAP is "Ready to Submit" or "Approved" in App Store Connect
- Wait 2-4 hours after creating the IAP for it to propagate

### Issue: "This In-App Purchase has already been bought"
**Solution:** Clear the sandbox account's purchases:
1. Settings → App Store → Sandbox Account → Manage
2. Clear purchase history

### Issue: Price shows as $0.00 or doesn't load
**Solution:**
- Ensure pricing is set for all territories
- Check that subscription group is properly configured
- Wait a few hours for pricing to propagate

## Verification Checklist

- [ ] IAP created in App Store Connect
- [ ] Product ID matches exactly: `com.isaacdale.MyMedsUKultra.aiplus`
- [ ] Subscription group ID: `21527952`
- [ ] Pricing configured (£9.99/month)
- [ ] Localizations added (at least English UK)
- [ ] Introductory offer configured (2 weeks free)
- [ ] IAP status is "Ready to Submit" or "Approved"
- [ ] Sandbox test user created
- [ ] Signed out of production App Store account
- [ ] Tested with sandbox account in TestFlight

## Bundle Identifier

Your app bundle ID: `com.isaacdale.MyMedsUKultra`
Your IAP product ID: `21527952`
Your subscription group ID: `21806649`

**These must remain consistent across:**
- Xcode project
- App Store Connect app record  
- In-App Purchase product configuration
- StoreKit configuration file

