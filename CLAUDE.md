# CLAUDE.md — LangkahHijau Landing Page

Ini adalah panduan kerja untuk Claude Code saat membangun project **LangkahHijau** — sebuah fullstack landing page jasa reboisasi profesional.

> Baca file ini sebelum menulis satu baris kode pun. Ikuti semua aturan di sini secara konsisten.

---

## 1. Overview Proyek

**Nama Produk:** LangkahHijau  
**Tagline:** *"Setiap Lahan Adalah Kesempatan untuk Pulih"*  
**Tipe:** Fullstack Landing Page (Lead Generation)  
**Tujuan Bisnis:** Mengenalkan jasa reboisasi lahan rusak/gundul dan mengonversi pengunjung menjadi prospek (leads) melalui form yang tertracking.  
**Target Audiens:** Perusahaan tambang, perkebunan, pemerintah daerah, dan individu pemilik lahan yang ingin merehabilitasi lahan mereka.  
**Deploy Target:** Vercel (zero-config)

---

## 2. Tech Stack

Pilih stack yang ringan, profesional, dan deploy-ready di Vercel **tanpa konfigurasi tambahan**:

| Layer | Teknologi | Alasan |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR/SSG built-in, Vercel-native, fullstack dalam satu project |
| Language | **TypeScript** | Type safety, lebih mudah dibaca developer lain |
| Styling | **Tailwind CSS v3** | Utility-first, tidak butuh build step tambahan |
| Animasi | **Framer Motion** | Deklaratif, performa bagus, tidak berlebihan |
| Form | **React Hook Form + Zod** | Validasi client-side yang ringan dan type-safe |
| Database (Leads) | **Vercel Postgres (Neon)** | Zero-config di Vercel, SQL standar |
| Email Notif | **Resend** | API sederhana, gratis untuk volume kecil |
| UI Components | **shadcn/ui** | Komponen accessible, tidak lock-in ke library besar |
| Icons | **Lucide React** | Konsisten dengan shadcn/ui |
| Analytics | **Vercel Analytics** | Built-in di Vercel, privacy-first |
| Linting | **ESLint + Prettier** | Kode tetap konsisten |

**Jangan** menambahkan library baru tanpa alasan yang jelas. Diskusikan dulu jika perlu.

---

## 3. Struktur Folder

```
langkahhijau/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (font, metadata, analytics)
│   ├── page.tsx                  # Landing page utama (assembles all sections)
│   ├── globals.css               # Global styles + CSS variables
│   └── api/
│       └── leads/
│           └── route.ts          # POST endpoint — simpan lead ke DB & kirim email
│
├── components/
│   ├── sections/                 # Satu file per section landing page
│   │   ├── Hero.tsx              # Headline + Logo + Tagline + primary CTA
│   │   ├── Problem.tsx           # Data deforestasi Indonesia (lihat §6)
│   │   ├── Services.tsx          # Layanan reboisasi
│   │   ├── Portfolio.tsx         # Foto/data proyek yang sudah dikerjakan
│   │   ├── Testimonials.tsx      # Kutipan klien
│   │   ├── AboutUs.tsx           # Tim & misi perusahaan
│   │   ├── FAQ.tsx               # Accordion FAQ
│   │   ├── CTABottom.tsx         # CTA kedua setelah semua konten
│   │   └── Footer.tsx            # Link, sosmed, legal
│   │
│   ├── ui/                       # shadcn/ui components (auto-generated, jangan edit manual)
│   ├── LeadForm.tsx              # Form utama (dipanggil dari Hero & CTABottom)
│   ├── Navbar.tsx                # Navigasi sticky
│   └── AnimatedSection.tsx       # Wrapper Framer Motion reusable untuk scroll reveal
│
├── lib/
│   ├── db.ts                     # Koneksi Vercel Postgres
│   ├── email.ts                  # Helper Resend untuk kirim notifikasi
│   ├── validations.ts            # Zod schema (dipakai frontend & backend)
│   └── utils.ts                  # cn() helper dan utilities lain
│
├── hooks/
│   └── useScrollReveal.ts        # Custom hook animasi scroll (opsional)
│
├── public/
│   ├── images/                   # Foto portfolio, tim, hero background
│   └── og-image.png              # Open Graph image untuk social sharing
│
├── types/
│   └── index.ts                  # Shared TypeScript types
│
├── .env.local                    # Secret keys (JANGAN COMMIT — lihat §8)
├── .env.example                  # Template env vars yang aman untuk di-commit
├── .gitignore                    # Pastikan .env.local masuk sini
├── next.config.ts                # Minimal config
├── tailwind.config.ts            # Tema warna LangkahHijau
├── postcss.config.js
├── components.json               # shadcn/ui config
├── tsconfig.json
├── package.json
└── CLAUDE.md                     # File ini
```

---

## 4. Desain & Visual

### Palet Warna (CSS Variables di `globals.css`)
```css
--color-forest-dark: #1A3A2A;    /* Background utama, teks gelap */
--color-forest-mid: #2D6A4F;     /* Aksen utama (hijau medium) */
--color-leaf: #52B788;           /* CTA button, highlight */
--color-earth: #A0522D;          /* Aksen tanah/rusak (untuk bagian Problem) */
--color-sand: #F5F0E8;           /* Background section terang */
--color-cream: #FDFAF4;          /* Background page default */
--color-text: #1C1C1C;           /* Teks utama */
--color-muted: #6B7280;          /* Teks sekunder */
```

### Tipografi
- **Display/Heading:** `Plus Jakarta Sans` (Google Fonts) — modern, otoritatif
- **Body:** `DM Sans` — bersih, mudah dibaca
- **Accent/Quote:** `Playfair Display` — untuk testimonial dan tagline

### Prinsip Desain
- **Tone:** Natural authority — serius tapi tidak kaku, profesional tapi hangat
- **Motion:** Scroll reveal dengan `opacity` + `translateY` yang subtle (durasi 0.5–0.8s). Tidak ada animasi looping yang mengganggu
- **Layout:** Mobile-first. Section bergantian antara background gelap dan terang
- **CTA:** Warna `--color-leaf` yang stand out, dengan hover state yang jelas. CTA pertama (Hero) lebih besar dari CTA kedua

---

## 5. Struktur Landing Page & Konten

Susun section di `app/page.tsx` dalam urutan ini:

```tsx
<Navbar />
<Hero />          {/* CTA 1: "Konsultasi Gratis Sekarang" → buka LeadForm */}
<Problem />       {/* Data deforestasi Indonesia — lihat §6 */}
<Services />      {/* 4–5 layanan inti */}
<Portfolio />     {/* 3–6 proyek showcase — lihat catatan di bawah */}
<Testimonials />  {/* 3–4 testimonial klien */}
<AboutUs />       {/* Misi + tim */}
<FAQ />           {/* 5–7 pertanyaan umum */}
<CTABottom />     {/* CTA 2: "Mulai Rehabilitasi Lahan Anda" → LeadForm */}
<Footer />
```

### Catatan Portfolio — Placeholder & Update di Masa Depan

Data portfolio disimpan di **`lib/data/portfolio.ts`** sebagai array konstanta. Ini satu-satunya file yang perlu diedit saat ada proyek nyata baru.

```typescript
// lib/data/portfolio.ts
export const PORTFOLIO_ITEMS = [
  {
    id: "1",
    title: "Rehabilitasi Lahan Bekas Tambang",
    location: "Kalimantan Timur",
    area: "120 ha",
    duration: "18 bulan",
    year: "2023",
    description: "Revegetasi lahan pasca tambang batu bara dengan metode hydroseeding dan penanaman jenis endemik Kalimantan.",
    stats: { treesPlanted: 45000, survivalRate: "87%", carbonOffset: "240 ton CO₂/tahun" },
    tags: ["Tambang", "Revegetasi", "Kalimantan"],
    image: "/images/portfolio/placeholder-1.jpg",   // ← ganti path ini saat ada foto nyata
    beforeImage: "/images/portfolio/placeholder-before-1.jpg",  // opsional: foto before/after
  },
  // tambah item baru di sini
]
```

**Cara update di masa depan:**
1. Letakkan foto di `public/images/portfolio/nama-proyek.jpg` (format: WebP lebih disarankan, max 500KB)
2. Edit array `PORTFOLIO_ITEMS` di `lib/data/portfolio.ts` — tambah atau ubah data
3. Commit dan push → Vercel otomatis re-deploy

Tidak perlu sentuh komponen `Portfolio.tsx` sama sekali, karena ia membaca dari data ini secara dinamis.

### LeadForm — Field yang Dikumpulkan
Form ini adalah inti lead generation. Field:
- **Nama lengkap** (required)
- **Email** (required, validasi format)
- **Nomor telepon** (required, format Indonesia)
- **Luas lahan perkiraan** (dropdown: < 1 ha / 1–10 ha / 10–50 ha / > 50 ha)
- **Lokasi lahan** (teks bebas)
- **Pesan/kebutuhan** (textarea, opsional)
- **Sumber** (hidden field — catat UTM atau referrer untuk tracking)

Form submit ke `POST /api/leads`. Response harus cepat (< 3 detik). Tampilkan success state yang meyakinkan.

---

## 6. Data Riset Deforestasi Indonesia

Gunakan data konkret ini di section **Problem** dan di tempat lain yang relevan. Semua data dari sumber terpercaya (KLHK, FAO, WRI).

```
FAKTA UTAMA:
- Indonesia kehilangan ±464.000 hektar hutan per tahun (KLHK, 2022)
- Luas lahan kritis nasional mencapai 14,9 juta hektar (KLHK, 2021)
- Indonesia menempati posisi ke-3 negara dengan deforestasi tertinggi di dunia (FAO, 2020)
- 50% terumbu karang Indonesia rusak akibat sedimentasi dari lahan gundul (LIPI)
- Kerugian ekonomi akibat degradasi lahan: Rp 685 triliun/tahun (BAPPENAS, 2019)
- Target nasional: rehabilitasi 600.000 ha/tahun dalam RPJMN 2020–2024
- Kalimantan kehilangan 9,7 juta ha hutan dalam 20 tahun terakhir (GFW, 2023)
- Lahan gambut terdegradasi: 6,7 juta hektar (BRG, 2022)

DAMPAK SOSIAL:
- 25 juta petani terdampak oleh penurunan kualitas lahan
- 40% sumber air di Jawa terancam akibat DAS yang kritis
- Bencana banjir dan longsor meningkat 300% dalam 10 tahun (BNPB)

PELUANG:
- Pasar carbon credit reboisasi Indonesia diproyeksi USD 1,5 miliar pada 2030
- Insentif pemerintah: PSA (Payment for Ecosystem Services) aktif di 34 provinsi
```

**Cara menggunakannya di kode:**
- Simpan di `lib/data/research.ts` sebagai konstanta TypeScript
- Tampilkan sebagai animated counter di section Problem
- Gunakan 3–4 statistik paling impactful, jangan semua sekaligus

---

## 7. API Routes & Backend

### `POST /api/leads` — Simpan Lead
```typescript
// Request body (validated dengan Zod dari lib/validations.ts):
{
  name: string
  email: string
  phone: string
  landSize: "< 1 ha" | "1-10 ha" | "10-50 ha" | "> 50 ha"
  location: string
  message?: string
  source?: string   // UTM / referrer — diisi otomatis, tidak dari user
}

// Response sukses:
{ success: true, message: "Lead berhasil disimpan" }

// Response error:
{ success: false, error: "Pesan error yang user-friendly" }
```

**Alur di route handler:**
1. Validasi body dengan Zod schema
2. Sanitasi input (strip HTML tags)
3. Simpan ke tabel `leads` di Vercel Postgres
4. Kirim email notifikasi ke admin via Resend (fire-and-forget, jangan block response)
5. Return response

### Schema Database
```sql
CREATE TABLE leads (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(20) NOT NULL,
  land_size   VARCHAR(20) NOT NULL,
  location    TEXT NOT NULL,
  message     TEXT,
  source      VARCHAR(255),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status      VARCHAR(20) DEFAULT 'new'   -- new | contacted | converted
);
```

---

## 8. Environment Variables & Keamanan

### File `.env.local` (TIDAK PERNAH DI-COMMIT)
```bash
# Database
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."

# Email
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@langkahhijau.id"
ADMIN_EMAIL="admin@langkahhijau.id"

# App
NEXT_PUBLIC_SITE_URL="https://langkahhijau.vercel.app"
```

### File `.env.example` (AMAN DI-COMMIT — template tanpa nilai asli)
```bash
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
RESEND_API_KEY=""
RESEND_FROM_EMAIL=""
ADMIN_EMAIL=""
NEXT_PUBLIC_SITE_URL=""
```

### Aturan Keamanan Wajib
- **Semua secret hanya di server-side** — variabel tanpa prefix `NEXT_PUBLIC_` tidak pernah expose ke browser
- **Validasi ulang di server** — jangan percaya data dari client meskipun sudah ada validasi di frontend
- **Rate limiting** pada `/api/leads` — gunakan Vercel's built-in edge config atau simple in-memory counter (max 5 submit/IP/jam)
- **Sanitasi input** — strip karakter berbahaya sebelum simpan ke DB
- **Error messages** — jangan expose stack trace atau detail database ke response API
- Cek ulang sebelum setiap commit: tidak ada API key, password, atau token di kode

---

## 9. Konvensi Kode

### TypeScript
- Selalu define tipe eksplisit. Hindari `any`
- Gunakan `interface` untuk object shapes, `type` untuk union/intersection
- Export types dari `types/index.ts`

### React & Next.js
- **Server Components** by default (App Router)
- Tambahkan `"use client"` hanya jika komponen butuh state, event handler, atau browser API
- Komponen yang butuh animasi Framer Motion → wajib `"use client"`
- Satu komponen = satu file. Nama file = nama komponen (PascalCase)

### Naming
```
Komponen React   : PascalCase      (LeadForm.tsx, AnimatedSection.tsx)
Functions/hooks  : camelCase       (useScrollReveal, formatPhone)
Constants/data   : UPPER_SNAKE     (DEFORESTATION_STATS)
CSS variables    : kebab-case      (--color-forest-dark)
API routes       : kebab-case dir  (app/api/leads/route.ts)
```

### Komentar
- Tulis komentar untuk logika non-obvious, bukan untuk hal yang sudah jelas dari namanya
- Gunakan komentar `// TODO:` atau `// FIXME:` jika ada yang perlu ditindaklanjuti
- Setiap API route wajib ada komentar singkat di bagian atas yang menjelaskan tujuannya

### Formatting
- Jalankan `prettier --write .` sebelum commit
- Gunakan ESLint rule bawaan Next.js (`next/core-web-vitals`)

---

## 10. Animasi — Panduan Penggunaan Framer Motion

Gunakan `AnimatedSection.tsx` sebagai wrapper reusable:

```tsx
// components/AnimatedSection.tsx
// Wrap konten section dengan ini untuk scroll reveal yang konsisten
<AnimatedSection>
  <YourContent />
</AnimatedSection>
```

**Preset animasi yang diizinkan:**
| Nama | Gunakan untuk |
|---|---|
| `fadeInUp` | Teks, card, konten umum |
| `fadeIn` | Background elements, overlay |
| `staggerChildren` | List item, grid card |
| `slideInLeft/Right` | Split layout (gambar vs teks) |
| `scaleIn` | Statistik angka besar, icon |

**Aturan animasi:**
- Durasi: 0.4–0.8 detik. Tidak ada yang lebih dari 1 detik kecuali ada alasan kuat
- Easing: `easeOut` untuk masuk, `easeIn` untuk keluar
- Jangan animasi teks yang panjang huruf per huruf — terlalu slow dan annoying
- Animated counter (angka statistik) harus smooth dan berhenti tepat di target
- Semua animasi harus bisa di-disable oleh `prefers-reduced-motion`

```css
/* Wajib ada di globals.css */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

---

## 11. Workflow Git

### Repository
```
Remote URL  : https://github.com/ihsannisan67/fullstack-landing-page.git
Main branch : main   ← production, auto-deploy ke Vercel
Dev branch  : dev    ← semua pekerjaan harian dilakukan di sini
```

### Setup Awal (hanya sekali, di awal project)
```bash
# Clone repo
git clone https://github.com/ihsannisan67/fullstack-landing-page.git
cd fullstack-landing-page

# Pastikan remote sudah benar
git remote -v
# Output yang diharapkan:
# origin  https://github.com/ihsannisan67/fullstack-landing-page.git (fetch)
# origin  https://github.com/ihsannisan67/fullstack-landing-page.git (push)

# Buat dan pindah ke branch dev
git checkout -b dev
git push -u origin dev

# Install dependencies
npm install

# Salin env template dan isi nilainya
cp .env.example .env.local
```

### Branch Strategy
```
main          ← production (auto-deploy ke Vercel, jangan push langsung)
dev           ← development (default branch kerja sehari-hari)
feature/xxx   ← fitur baru yang besar (branch dari dev)
fix/xxx       ← bug fix (branch dari dev)
```

### Alur Kerja Harian (Dev Branch)
```bash
# Pastikan selalu mulai dari kondisi terbaru
git checkout dev
git pull origin dev

# ... kerjakan fitur / perbaikan ...

# Cek apa yang berubah
git status
git diff

# Stage perubahan (spesifik, bukan git add . secara buta)
git add components/sections/Hero.tsx
git add lib/data/portfolio.ts

# Commit dengan pesan yang deskriptif
git commit -m "feat: selesaikan Hero section dengan animasi CTA"

# Push ke remote
git push origin dev
```

### Merge ke Main (Saat Siap Deploy)
```bash
# Pastikan dev sudah up-to-date dan build sukses dulu
git checkout dev
git pull origin dev
npm run build   # harus sukses tanpa error

# Merge ke main
git checkout main
git pull origin main
git merge dev --no-ff -m "merge: release Hero + Problem + Services sections"
git push origin main

# Kembali ke dev untuk kerja selanjutnya
git checkout dev
```

### Commit Message Format (Conventional Commits)
```
feat: tambah animasi scroll reveal di section Problem
fix: perbaiki validasi nomor telepon di LeadForm
style: rapikan spacing di section Services
refactor: extract lead validation ke lib/validations.ts
chore: update dependency framer-motion ke v11
docs: update CLAUDE.md section animasi
```

### Kapan Commit
- Setiap kali satu section selesai dibangun dan berfungsi
- Setiap kali ada bug diperbaiki
- Sebelum memulai perubahan besar
- Setelah update dokumentasi

### Jangan Pernah Commit
- Kode yang error / tidak bisa di-build
- File `.env.local` atau file dengan secret apapun
- File `node_modules/`
- File generated (`.next/`, `out/`)

Pastikan `.gitignore` selalu berisi baris-baris ini:
```
.env.local
.env*.local
node_modules/
.next/
out/
```

---

## 12. Checklist Sebelum Deploy

Jalankan ini sebelum push ke `main`:

```bash
# 1. Pastikan tidak ada error TypeScript
npx tsc --noEmit

# 2. Pastikan linting bersih
npx eslint . --ext .ts,.tsx

# 3. Build sukses
npm run build

# 4. Cek tidak ada secret di kode
grep -r "POSTGRES_URL\|RESEND_API_KEY\|password\|secret" --include="*.ts" --include="*.tsx" app/ components/ lib/

# 5. Cek .env.local tidak ikut ter-commit
git status | grep .env
```

---

## 13. Aturan Interaksi Claude ↔ Developer

1. **Ambiguitas** — Jika ada requirement yang tidak jelas, tanya dulu sebelum menulis kode. Lebih baik tanya 1 menit daripada refactor 1 jam
2. **Perubahan besar** — Kalau perubahan menyentuh lebih dari 3 file atau mengubah struktur folder, jelaskan rencana terlebih dahulu
3. **Error** — Jika ada error saat menjalankan kode, diagnosa root cause-nya, jangan hanya patch symptom-nya
4. **Testing** — Sebelum menyatakan sebuah fitur "selesai", pastikan sudah di-test: form submit, validasi error state, tampilan mobile, dan build sukses
5. **Tidak ada magic** — Jangan tambahkan library atau konfigurasi yang tidak ada di §2 tanpa konfirmasi

---

## 14. Referensi Cepat

```bash
# Install dependencies
npm install

# Dev server
npm run dev

# Build production
npm run build

# Jalankan DB migration (setelah setup Vercel Postgres)
npx vercel env pull .env.local
node scripts/migrate.js

# Tambah shadcn/ui component
npx shadcn@latest add button dialog accordion

# Format kode
npx prettier --write .
```

**Link penting:**
- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Postgres Docs: https://vercel.com/docs/storage/vercel-postgres
- Resend Docs: https://resend.com/docs
- Framer Motion Docs: https://www.framer.com/motion/
- shadcn/ui: https://ui.shadcn.com

---

*File ini adalah source of truth untuk project LangkahHijau. Update jika ada keputusan teknis baru yang disepakati.*
