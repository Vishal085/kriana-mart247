# KiranaMart — Meta WhatsApp Business Platform & Cloud API Setup Guide

This guide walks you through setting up your dedicated **WhatsApp Business Number** with Display Name **KiranaMart** using the official **Meta WhatsApp Cloud API**.

---

## Architecture Overview

```
Customer Places Order / Status Updates
         │
         ▼
KiranaMart Backend (Order Lifecycle Service)
         │
         ▼
lib/whatsapp (Meta Cloud API Client + Templates Engine)
         │
         ▼
Meta WhatsApp Cloud API (Graph API v21.0)
         │
         ▼
KiranaMart WhatsApp Business Number
         │
         ▼
Customer WhatsApp Mobile App
```

---

## Step 1: Meta Business Portfolio & Account Setup

1. Log in to [Meta Business Suite](https://business.facebook.com/).
2. Navigate to **Business Settings** (`https://business.facebook.com/settings`).
3. Ensure your business portfolio is created for **KiranaMart**.
4. (Recommended) Initiate **Business Verification** under *Security Center* (submit business registration / GST / MSME certificate) to lift initial 250 conversations/day messaging tier limits.

---

## Step 2: Create a Meta Developer App

1. Visit [Meta for Developers](https://developers.facebook.com/).
2. Click **My Apps** → **Create App**.
3. Select **Other** → **Business** as the app type.
4. Name the app **KiranaMart WhatsApp Engine** and associate it with your Business Portfolio.
5. In the App Dashboard, find **WhatsApp** and click **Set up**.

---

## Step 3: Add Your Dedicated Business Phone Number

1. In the left sidebar of your App Dashboard, navigate to **WhatsApp** → **API Setup**.
2. Scroll to **Step 5: Add a phone number**.
3. Click **Add phone number**.
4. Configure Profile Details:
   - **WhatsApp Business Profile Display Name**: `KiranaMart`
   - **Timezone**: `Asia/Kolkata (GMT+05:30)`
   - **Category**: `Grocery Store` / `Retail`
   - **Business Description**: `KiranaMart247 — Daily wholesale mandi rates & premium grocery staples delivery.`
   - **Website**: `https://kiranamart.com`
5. Enter your dedicated SIM/Phone Number and verify it via SMS or Voice Call OTP.

> [!IMPORTANT]
> **Display Name vs Verification Badge**:
> Setting the Display Name to **KiranaMart** means customers will see "KiranaMart" in the header of their chat. An Official Business Account (green verification tick) is an optional badge awarded by Meta upon meeting their eligibility and brand notoriety criteria.

---

## Step 4: Generate a Permanent System User Access Token

*Temporary test tokens expire in 24 hours. A permanent System User token is required for production.*

1. Go to [Meta Business Settings](https://business.facebook.com/settings).
2. Under **Users**, click **System Users**.
3. Click **Add**, name the system user `kiranamart-whatsapp-bot`, and assign role **Admin**.
4. Click **Add Assets** → Select **Apps** → Choose **KiranaMart WhatsApp Engine** → Enable **Full Control (Manage App)**.
5. Click **Add Assets** → Select **WhatsApp Accounts** → Choose your **KiranaMart WABA** → Enable **Full Control**.
6. Click **Generate New Token**:
   - App: Select `KiranaMart WhatsApp Engine`
   - Token Expiration: `Never`
   - Permissions: Check `whatsapp_business_management` and `whatsapp_business_messaging`.
7. Click **Generate Token** and copy the resulting string (`EAA...`).

---

## Step 5: Configure Environment Variables

Update your `.env` file on your server / Vercel deployment:

```env
# Meta WhatsApp Cloud API
WHATSAPP_PHONE_NUMBER_ID="your_phone_number_id_from_api_setup"
WHATSAPP_BUSINESS_ACCOUNT_ID="your_waba_id_from_api_setup"
WHATSAPP_ACCESS_TOKEN="EAA..."
WHATSAPP_VERIFY_TOKEN="kiranamart_whatsapp_verify_token_2026"
WHATSAPP_APP_SECRET="your_app_secret_from_app_basic_settings"
WHATSAPP_API_VERSION="v21.0"
WHATSAPP_BASE_URL="https://graph.facebook.com"

# Public Support Number (e.g. 919876543210)
NEXT_PUBLIC_WHATSAPP_SUPPORT_NUMBER="919876543210"
NEXT_PUBLIC_WHATSAPP_URL="https://wa.me/919876543210"
```

---

## Step 6: Configure Webhooks

1. In your Meta App Dashboard, go to **WhatsApp** → **Configuration**.
2. Under **Webhook**, click **Edit**.
   - **Callback URL**: `https://your-domain.com/api/webhooks/whatsapp`
   - **Verify Token**: Enter the exact string set in `WHATSAPP_VERIFY_TOKEN` (e.g., `kiranamart_whatsapp_verify_token_2026`).
3. Click **Verify and Save**.
4. In the Webhook fields list, click **Manage** and subscribe to:
   - `messages` (for incoming customer replies and delivery receipts)

---

## Step 7: Create & Submit Message Templates for Meta Approval

In WhatsApp Manager (`https://business.facebook.com/wa/manage/message-templates/`), create the following **Utility** templates:

### 1. Template: `kiranamart_order_confirmation`
- **Category**: `UTILITY`
- **Language**: `English (US)`
- **Header**: None
- **Body**:
  ```text
  Hello {{1}},

  Your order #{{2}} for {{3}} has been confirmed!

  Delivery Address: {{4}}

  We are preparing your fresh kirana grocery staples. Thank you for choosing KiranaMart!
  ```
- **Sample values**:
  - `{{1}}`: `Vishal Gupta`
  - `{{2}}`: `KIR-20260829-102941`
  - `{{3}}`: `₹1,250.00`
  - `{{4}}`: `Shop 14, Main Market, Delhi - 110006`

---

### 2. Template: `kiranamart_order_packed`
- **Category**: `UTILITY`
- **Language**: `English (US)`
- **Body**:
  ```text
  Hello {{1}},

  Your order #{{2}} ({{3}}) has been packed, quality verified, and is ready for dispatch.

  Thank you for shopping with KiranaMart!
  ```
- **Sample values**:
  - `{{1}}`: `Vishal Gupta`
  - `{{2}}`: `KIR-20260829-102941`
  - `{{3}}`: `5 items`

---

### 3. Template: `kiranamart_order_shipped`
- **Category**: `UTILITY`
- **Language**: `English (US)`
- **Body**:
  ```text
  Hello {{1}},

  Great news! Your order #{{2}} has been dispatched via {{3}}.

  Your delivery will reach your doorstep shortly.
  ```
- **Sample values**:
  - `{{1}}`: `Vishal Gupta`
  - `{{2}}`: `KIR-20260829-102941`
  - `{{3}}`: `Kirana Express Fleet`

---

### 4. Template: `kiranamart_out_for_delivery`
- **Category**: `UTILITY`
- **Language**: `English (US)`
- **Body**:
  ```text
  Hello {{1}},

  Our delivery executive is on the way with your order #{{2}}.

  Delivery Location: {{3}}

  Please ensure someone is available to receive the delivery.
  ```
- **Sample values**:
  - `{{1}}`: `Vishal Gupta`
  - `{{2}}`: `KIR-20260829-102941`
  - `{{3}}`: `Shop 14, Main Market, Delhi`

---

### 5. Template: `kiranamart_order_delivered`
- **Category**: `UTILITY`
- **Language**: `English (US)`
- **Body**:
  ```text
  Hello {{1}},

  Your order #{{2}} has been successfully delivered!

  We hope you are delighted with the freshness and savings. Have feedback? Reply directly to this message to chat with support.
  ```
- **Sample values**:
  - `{{1}}`: `Vishal Gupta`
  - `{{2}}`: `KIR-20260829-102941`

---

### 6. Template: `kiranamart_order_cancelled`
- **Category**: `UTILITY`
- **Language**: `English (US)`
- **Body**:
  ```text
  Hello {{1}},

  Your order #{{2}} has been cancelled.

  Reason: {{3}}

  If any amount was debited, it will be refunded back to your account.
  ```
- **Sample values**:
  - `{{1}}`: `Vishal Gupta`
  - `{{2}}`: `KIR-20260829-102941`
  - `{{3}}`: `Customer cancellation request`

---

## Step 8: Verification & Testing Checklist

- [x] Database model `WhatsAppMessage` created and migrated in PostgreSQL.
- [x] Phone normalization layer (`lib/phone.ts`) validates and formats standard E.164 numbers.
- [x] Webhook verification endpoint responds with `200` and `hub.challenge`.
- [x] Webhook event handler verifies HMAC-SHA256 signature and updates delivery receipts (`sent` → `delivered` → `read`).
- [x] Non-blocking order checkout integration dispatches `kiranamart_order_confirmation`.
- [x] Admin order status transitions (`PENDING` → `CONFIRMED` → `DISPATCHED` → `DELIVERED`) automatically trigger corresponding template messages.
- [x] Idempotency engine prevents duplicate messages for identical order events within 10 minutes.
- [x] Customer opt-in checkbox on checkout page records communication consent.
- [x] Floating customer support WhatsApp button connects directly to KiranaMart support.
