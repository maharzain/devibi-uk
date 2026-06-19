# Google Ads Conversion Tracking — Devibi

Yeh guide batati hai ke `/uk-website-development` landing page ki conversions Google Ads
mein kaise track hongi. Code pehle se taiyaar hai — aapko sirf Google Ads mein
conversion actions banani hain aur 3 env variables Hostinger par daalni hain.

## Kya track hota hai

| Conversion | Kab fire hota hai | Code |
|---|---|---|
| **Lead form submit** | Quote form successfully submit hone par | `components/UKLeadForm.jsx` |
| **Consultation booking** | "Book a free consultation" button click par | `components/ConsultButton.jsx` |

Dono GA4 events bhi bhejte hain (`generate_lead`, `book_consultation_click`) aur,
jab env vars set hon, Google Ads conversions bhi fire karte hain.

---

## Part A — Google Ads mein conversion actions banao (IDs lo)

1. Google Ads → **Tools → Conversions → + New conversion action**
2. **Website** chuno.
3. Apni website ka domain (`devibi.com`) daalo → scan ke baad **"+ Add a conversion action manually"** (ya Create manually) chuno.
4. **Pehli conversion action** banao:
   - Category: **Submit lead form**
   - Name: `Lead form` (ya `UK LP - Lead form`)
   - Value: apni marzi (Don't use a value, ya ek average lead value GBP mein)
   - Count: **One** (ek lead = ek conversion)
5. **Doosri conversion action** banao (repeat step 1–4):
   - Category: **Book appointment** (ya Contact)
   - Name: `Consultation booking`
   - Count: **One**
6. Har conversion action ke **"Tag setup → Use Google tag / gtag.js"** mein aapko 2 cheezein milengi:
   - **Conversion ID** — looks like `AW-123456789`
   - **Conversion label** — looks like `AbC-D_efGhIjKlMnOp`

   > `send_to` ki value `AW-123456789/AbC-D_efGhIjKlMnOp` hoti hai. Hamare code mein
   > **ID** alag (`NEXT_PUBLIC_GOOGLE_ADS_ID`) aur **label** alag (`..._LABEL`) jaata hai.

7. Likh lo:
   - `AW-XXXXXXXXX` (ID — dono actions ke liye same hota hai)
   - Lead form ka **label**
   - Consultation booking ka **label**

---

## Part B — Hostinger par env variables daalo

Hostinger → website → **Environment variables** → yeh 3 add karo:

```
NEXT_PUBLIC_GOOGLE_ADS_ID      = AW-XXXXXXXXX
NEXT_PUBLIC_GADS_LEAD_LABEL    = <lead form ka conversion label>
NEXT_PUBLIC_GADS_CONSULT_LABEL = <consultation booking ka conversion label>
```

> ⚠️ Yeh `NEXT_PUBLIC_` variables **build time** par bake hote hain — isliye env set karne
> ke baad **dobara deploy / redeploy** karna zaroori hai (zip dobara upload, ya redeploy).
> Bina redeploy ke values site mein nahi aayengi.

Phir **Settings and redeploy** se site dobara deploy karo.

---

## Part C — Test karo (sahi lag gaya ya nahi)

1. **Google Tag Assistant** (tagassistant.google.com) ya Chrome mein **Google Tag Assistant** extension kholo → `https://devibi.com/uk-website-development` connect karo.
2. **Lead test:** form bhar ke submit karo → Tag Assistant mein ek `conversion` hit nazar aana chahiye jिska `send_to` aapki Ads ID/label se match kare.
3. **Consultation test:** "Book a free consultation" click karo → doosra `conversion` hit aana chahiye.
4. Google Ads → Conversions mein 24–48 ghante baad status **"Recording conversions"** ho jana chahiye (pehle "Unverified" / "No recent conversions" dikha sakta hai — yeh normal hai).

---

## ⚠️ Double-counting se bacho (zaroori)

Ek hi lead ko **do bar** count mat hone do. 2 tareeqe hain — **sirf EK** chuno:

- **Tareeqa 1 (yeh code) — direct gtag:** upar wale env vars set karo. Conversion code se fire hoti hai.
  Is soorat mein GA4 ke `generate_lead` event ko Google Ads mein conversion ke taur par
  **import MAT karo** (warna double ho jayegi).

- **Tareeqa 2 — GA4 import (no code):** env vars **khali** chhod do (conversion code fire nahi hoga).
  Phir GA4 mein `generate_lead` / `book_consultation_click` ko **Key event** mark karo →
  GA4 ko Google Ads se link karo → conversion import karo.

> Recommendation: **Tareeqa 1** zyada reliable aur foran fire hota hai. Use that, aur GA4
> import na karo.

---

## Quick reference — env vars

| Variable | Example | Zaroori? |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `AW-123456789` | Haan (Ads tracking ke liye) |
| `NEXT_PUBLIC_GADS_LEAD_LABEL` | `AbC-D_efGhIjKlMnOp` | Lead conversion ke liye |
| `NEXT_PUBLIC_GADS_CONSULT_LABEL` | `XyZ-1a2B3c4D5e` | Consultation conversion ke liye |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | GA4 (pehle se mojood) |

Agar yeh env vars set nahi hongi to site bilkul theek chalegi — bas Ads conversions fire
nahi hongi (koi error nahi). Jab ready ho, values daalo aur redeploy karo.
