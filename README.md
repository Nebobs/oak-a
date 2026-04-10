# OAK-A — Handcrafted Clothing Website

> Handcrafted. Intentional. Raw.

A minimal, editorial clothing brand website for the OAK-A independent label. Built with Next.js 14, Tailwind CSS, Framer Motion, and Firebase.

---

## Folder Structure

```
OAK-A/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata, Navbar, Footer)
│   ├── globals.css         # Global styles, CSS variables, grain texture
│   ├── page.tsx            # Home page (hero + featured + brand statement)
│   ├── shop/
│   │   └── page.tsx        # Shop / catalog with category filters
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx    # Individual product page
│   ├── about/
│   │   └── page.tsx        # About / brand story page
│   ├── contact/
│   │   └── page.tsx        # Contact form page
│   └── admin/
│       └── page.tsx        # Password-protected admin panel
├── components/
│   ├── Navbar.tsx          # Fixed navbar with scroll effect + mobile menu
│   ├── Footer.tsx          # Site footer
│   ├── HeroSection.tsx     # Full-screen hero (client, Framer Motion)
│   ├── ProductCard.tsx     # Product grid card
│   └── PageWrapper.tsx     # Page entrance animation wrapper
├── lib/
│   ├── firebase.ts         # Firebase app init
│   └── products.ts         # CRUD operations + mock data fallback
├── types/
│   └── index.ts            # TypeScript interfaces
├── public/                 # Static assets (add product images here)
├── .env.local.example      # Environment variable template
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Quick Start

### 1. Install dependencies

```bash
cd OAK-A
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your values (see Firebase Setup below).
Without Firebase, the site still works with built-in mock data.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Firebase Setup

### Step 1 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add Project**, name it `oak-a`
3. Disable Google Analytics (optional)

### Step 2 — Add a Web App

1. In your project, click the **Web** icon (`</>`)
2. Register the app (name it `oak-a-web`)
3. Copy the `firebaseConfig` values

### Step 3 — Enable Firestore

1. Go to **Firestore Database** → **Create Database**
2. Start in **Production mode**
3. Choose a region close to you

### Step 4 — Set Firestore Rules

In the Firestore Rules tab, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read: if true;
      allow write: if false; // Admin writes happen server-side or via console
    }
  }
}
```

> For admin writes to work from the browser, temporarily change `write: if false` to `write: if true` while testing, then lock it down with proper auth later.

### Step 5 — Enable Firebase Storage (for product images)

1. Go to **Storage** → **Get Started**
2. Accept defaults
3. Update Storage Rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if true; // Lock this down in production
    }
  }
}
```

### Step 6 — Fill in `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=oak-a.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=oak-a
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=oak-a.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123
NEXT_PUBLIC_ADMIN_PASSWORD=your-secret-password
```

---

## Adding Product Images

1. Add images to `public/images/` (JPG or WebP recommended, max 2MB each)
2. Or upload via the Admin panel (requires Firebase Storage to be configured)
3. Reference them as `/images/your-image.jpg` in product records

Recommended image dimensions: **800×1067px** (3:4 portrait ratio).

---

## Admin Panel

Visit `/admin` and enter the password from your `.env.local`.

From the admin panel you can:
- **Add products** — name, category, price, sizes, description, story, images
- **Delete products** — permanent, requires confirmation
- **View all products** — with featured/available status

---

## Deploy to Vercel

### One-command deploy

```bash
npm install -g vercel
vercel
```

### Or connect via GitHub

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Under **Environment Variables**, add all values from your `.env.local`
5. Deploy

Vercel auto-detects Next.js — no extra configuration needed.

---

## Contact Form Setup

The contact form currently logs submissions to the console.
To actually send emails, integrate one of:

- **[Resend](https://resend.com)** — easiest, generous free tier
- **[Formspree](https://formspree.io)** — no-code, works without a backend
- **[EmailJS](https://emailjs.com)** — client-side email, quick to set up

Example with Formspree — replace the `onSubmit` in `app/contact/page.tsx`:

```typescript
const onSubmit = async (data: ContactFormData) => {
  setSending(true)
  const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  setSending(false)
  if (res.ok) setSubmitted(true)
}
```

---

## Brand Notes — OAK-A

### Name interpretation
- **OAK** — enduring, natural, honest material; not the flashiest, but built to last
- **A** — the maker; singular, intentional
- The **em dash (—)** in OAK—A adds editorial weight

### Typography
- **Cormorant Garamond** — editorial serif for all headings and display text; conveys craft and heritage
- **Inter** — clean modern sans for all body copy, labels, and UI elements

### Color palette
| Name | Hex | Use |
|------|-----|-----|
| Background | `#0A0908` | Page background |
| Foreground | `#F8F5F0` | Primary text |
| Warm | `#C4A882` | Accents, CTAs, highlights |
| Muted | `#8A8275` | Secondary text |
| Surface | `#141210` | Card backgrounds |
| Border | `#2A2620` | Dividers, borders |

### Logo suggestion
For a wordmark logo, use **OAK—A** in Cormorant Garamond Light, with a generous em dash. 
Consider a small oak leaf or abstract wood-grain mark as an optional secondary symbol.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Database | Firebase Firestore |
| Storage | Firebase Storage |
| Forms | React Hook Form |
| Deployment | Vercel |
