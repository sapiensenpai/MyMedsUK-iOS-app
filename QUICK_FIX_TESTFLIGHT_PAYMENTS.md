# 🚀 Quick Fix: TestFlight Payments Not Working

## The Problem
✅ Payments work in **Xcode** (using StoreKit config file)  
❌ Payments DON'T work in **TestFlight** (needs App Store Connect)

## Why?
The `.storekit` file is **only for local Xcode testing**. TestFlight needs the product configured in **App Store Connect**.

## The Fix (5 Steps)

### 1️⃣ Go to App Store Connect
[https://appstoreconnect.apple.com](https://appstoreconnect.apple.com)

### 2️⃣ Create In-App Purchase
1. **My Apps** → Your App → **In-App Purchases**
2. Click **+** (Add New)
3. Select **Auto-Renewable Subscription**

### 3️⃣ Configure Product
**CRITICAL: Product ID must match exactly:**
```
com.isaacdale.MyMedsUKultra.aiplus
```

**Required Fields:**
- **Reference Name:** MyMeds AI Plus Monthly
- **Subscription Group:** Create new group (ID: 21527952)
- **Subscription Duration:** 1 Month  
- **Price:** £9.99/month

**Localization (English UK):**
- **Display Name:** MyMeds AI Plus
- **Description:** Full access to AI-powered medical assistant, drug interactions, and personalized guidance.

### 4️⃣ Add Free Trial
1. Click **Add Introductory Offer**
2. **Type:** Free
3. **Duration:** 2 Weeks
4. **Periods:** 1
5. Save

### 5️⃣ Create Sandbox Tester
1. **Users and Access** → **Sandbox Testers**
2. Click **+**
3. Use a **NEW email** (not your Apple ID)
4. Remember the password!

## Testing in TestFlight

### Before Opening App:
```
1. Settings → App Store → Sign Out
2. DON'T sign in yet - wait for the app to prompt you
```

### In the App:
```
1. Open TestFlight app
2. Launch your app
3. Try to subscribe
4. When prompted, sign in with SANDBOX account
5. Complete purchase
```

## ⏱ Wait Time
After creating the IAP in App Store Connect, wait **2-4 hours** before testing.

## ✅ Status Check
Product must be:
- ✅ "Ready to Submit" OR
- ✅ "Approved"

NOT:
- ❌ "Waiting for Review"
- ❌ "Missing Metadata"

## 🆘 Still Not Working?

### Check Console Logs:
The app now shows detailed error messages:
- Look for `🌍 Environment: TestFlight/Production`
- Check for product loading errors
- Verify product ID matches

### Common Issues:
1. **"Product not available"** → Wait 2-4 hours, check Product ID
2. **"Cannot connect to iTunes"** → Sign out of App Store
3. **No price shown** → Add pricing for UK territory
4. **Already purchased** → Clear sandbox purchase history

## Your Product Details
- **Bundle ID:** `com.isaacdale.MyMedsUKultra`
- **Product ID:** `com.isaacdale.MyMedsUKultra.aiplus`
- **Subscription Group:** `21527952`
- **Price:** £9.99/month
- **Free Trial:** 14 days (2 weeks)

---

💡 **Tip:** The app now automatically detects if it's running in TestFlight and shows helpful error messages!

