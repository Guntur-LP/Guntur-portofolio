# DESIGN.md — Guntur Listyo Prabowo Portfolio

Panduan UI berbasis token untuk portofolio pribadi (React + Vite, Tailwind CSS, shadcn/ui). Arah visual mengacu pada Overmind (<https://www.overmindlab.ai/?ref=darkmodedesign>) sebagai referensi, bukan untuk disalin.

**Design intent:** antarmuka gelap-terang yang terstruktur, hemat elemen, dan mengutamakan konten, sehingga recruiter dan calon klien menilai proyek Guntur dalam hitungan detik tanpa terganggu dekorasi.

**Konvensi kata kunci**

- **harus** = aturan wajib (non-negotiable).
- **sebaiknya** = rekomendasi kuat; penyimpangan perlu alasan tertulis.
- Setiap aturan aksesibilitas bersifat testable: ada cara cek dan hasil lulus/gagal (lihat Bagian 4).
- Tim **sebaiknya** memilih konsistensi sistem dibanding pengecualian visual lokal.

---

## 1. Konteks dan Tujuan

| Item | Nilai |
|---|---|
| Produk | Personal portfolio satu halaman (MVP 1 minggu) |
| Permukaan | Website statis, deploy via GitHub + Vercel |
| Audiens | Recruiter/HR, calon klien freelance, hiring manager, developer/designer |
| Bahasa antarmuka | Inggris (dokumen ini ditulis dalam bahasa Indonesia) |
| Target aksesibilitas | WCAG 2.2 AA |
| Tema | Light dan dark, mengikuti preferensi sistem, dapat diganti pengguna |
| Gaya visual | Structured, tokenized, content-first, modern minimalis |

**Tujuan desain**

1. Pengunjung memahami spesialisasi dalam satu layar pertama.
2. Setiap proyek dapat dievaluasi tanpa meninggalkan halaman (modal detail).
3. Semua kontrol dapat dipakai dengan keyboard, mouse, dan sentuhan.
4. Animasi hanya memberi feedback atau orientasi; tidak pernah membawa konten penting.

**Kepadatan komponen**

Halaman referensi Overmind padat tautan (±83 link, 12 tombol, 8 navigasi, 3 daftar, 1 input). Portofolio ini **tidak** mengadopsi kepadatan itu. Perkiraan target: navigasi 1, tombol ±10 (CTA, toggle tema, tombol kartu), tautan teks sedikit, daftar 3–4 (skills), input 3 (name, email, message).

---

## 2. Design Tokens dan Foundations

Aturan umum: komponen **harus** memakai token semantik, bukan nilai hex/px mentah. Pengecualian spasi atau tipografi satu-kali **tidak boleh** dibuat.

### 2.1 Tipografi

| Token | Nilai | Catatan |
|---|---|---|
| `font.family.primary` | `Geist` (usulan) | Referensi memakai neueBit; font itu tidak tersedia di Google Fonts. Ganti nama font tanpa mengubah token lain. |
| `font.family.stack` | `Geist, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif` | Fallback wajib ada. |
| `font.family.accent` | `"Geist Mono", ui-monospace, monospace` | Hanya untuk eyebrow, nomor section, dan label kecil. |
| `font.weight.base` | `400` | |
| `font.weight.strong` | `600` | Hanya dua bobot yang dimuat (batas variasi font). |
| `font.size.base` | `16px` | |
| `font.lineHeight.base` | `24px` | |

| Token ukuran | Nilai | Line height | Penggunaan |
|---|---|---|---|
| `font.size.xs` | 12px | 16px | Label, caption, hitungan karakter |
| `font.size.sm` | 14px | 20px | Teks bantu, chip, pesan error |
| `font.size.md` | 16px | 24px | Teks isi, tombol, input |
| `font.size.lg` | 18px | 28px | Paragraf pembuka, ringkasan hero |
| `font.size.xl` | 24px | 32px | Judul kartu/modal (h3) |
| `font.size.2xl` | 28px | 36px | Judul section (h2) mobile |
| `font.size.3xl` | 32px | 40px | Judul section (h2) ≥ md, hero (h1) mobile |
| `font.size.4xl` | 40px | 48px | Hero (h1) ≥ md |

Aturan tipografi:

- Teks isi **harus** ≥ 16px. Ukuran < 14px **tidak boleh** dipakai untuk informasi penting.
- Satu `h1` per halaman (hero). Level heading **tidak boleh** dilompati.
- Panjang baris paragraf **sebaiknya** ≤ 65 karakter (`max-width: 65ch`).
- `font-display: swap`; maksimal dua keluarga font.

### 2.2 Warna (semantik, dua tema)

Nilai dark mengambil arah dari token referensi Overmind (hitam, hangat, border putih 10%). Nilai light diturunkan dari nada hangat yang sama. Rasio kontras di bawah adalah perkiraan hitung manual dan **harus** diverifikasi ulang dengan alat kontras saat implementasi.

| Token | Dark | Light | Fungsi |
|---|---|---|---|
| `color.surface.base` | `#000000` | `#faf9f7` | Latar halaman |
| `color.surface.muted` | `#16120f` | `#f0eeeb` | Latar section alternatif, hover permukaan |
| `color.surface.raised` | `#0a0a0a` | `#ffffff` | Kartu, modal, input |
| `color.text.primary` | `#ffffff` | `#16120f` | Teks utama, judul |
| `color.text.secondary` | `#a8a49e` | `#5c5750` | Teks pendukung (≈ 8,5:1 dark, ≈ 6,8:1 light) |
| `color.text.disabled` | `#6b6863` | `#8a857e` | Kontrol nonaktif (≥ 3:1) |
| `color.text.inverse` | `#cecdc9` | `#faf9f7` | Teks di atas permukaan inverse |
| `color.border.default` | `rgba(255,255,255,0.10)` | `rgba(22,18,15,0.12)` | Pemisah dekoratif saja |
| `color.border.strong` | `rgba(255,255,255,0.45)` | `rgba(22,18,15,0.55)` | Batas input/kontrol (≥ 3:1) |
| `color.focus.ring` | `#ffffff` | `#16120f` | Indikator fokus |
| `color.action.primary.bg` | `#ffffff` | `#16120f` | Tombol primer |
| `color.action.primary.bgHover` | `#e6e4e0` | `#2f2a26` | |
| `color.action.primary.bgActive` | `#cecdc9` | `#45403b` | |
| `color.action.primary.fg` | `#000000` | `#faf9f7` | |
| `color.status.error` | `#ff8a80` | `#b42318` | Teks/ikon/border error |
| `color.status.success` | `#7ee2a8` | `#067647` | Pesan sukses |
| `color.overlay` | `rgba(0,0,0,0.60)` | `rgba(22,18,15,0.50)` | Latar di belakang modal |

Aturan warna:

- Teks normal **harus** ≥ 4,5:1; teks besar (≥ 24px, atau ≥ 18,66px tebal) dan komponen UI/indikator fokus **harus** ≥ 3:1.
- Informasi **tidak boleh** disampaikan hanya lewat warna (error = warna + ikon + teks).
- Palet sengaja monokrom. Aksen warna tunggal (`color.accent.default`) adalah keputusan terbuka; bila ditambahkan, **harus** lolos kontras di kedua tema.

### 2.3 Spasi

Token referensi: `space.1=4px`, `space.2=6px`, `space.3=8px`, `space.4=12px`, `space.5=16px`, `space.6=64px`, `space.7=80px`, `space.8=96px`.

Skala referensi melompat dari 16px ke 64px, sehingga kebutuhan 24/32/48px akan memaksa nilai satu-kali. Tiga token berikut **harus** ditambahkan agar aturan "tanpa pengecualian lokal" bisa dijalankan:

| Token | Nilai | Status |
|---|---|---|
| `space.9` | 24px | Tambahan |
| `space.10` | 32px | Tambahan |
| `space.11` | 48px | Tambahan |

Pemakaian: jarak ikon–teks `space.3`; padding kontrol `space.4`–`space.5`; jarak antar kartu `space.5`–`space.10`; padding vertikal section `space.6` (mobile) dan `space.8` (≥ lg).

### 2.4 Radius, elevasi, z-index

| Token | Nilai | Pemakaian |
|---|---|---|
| `radius.sm` | 4px | Chip |
| `radius.md` | 8px | Tombol, input |
| `radius.lg` | 12px | Kartu, modal |
| `radius.full` | 9999px | Toggle tema, avatar/monogram |
| `shadow.none` | tanpa bayangan | Default; pemisahan lewat border dan permukaan |
| `shadow.modal` | `0 24px 64px rgba(0,0,0,0.40)` | Hanya untuk modal |
| `z.nav` / `z.modal` / `z.skip` | 40 / 50 / 100 | Tidak ada nilai z-index lain |

Radius, bayangan, dan z-index ini adalah usulan karena referensi hanya mendefinisikan token motion.

### 2.5 Motion

| Token | Nilai | Pemakaian |
|---|---|---|
| `motion.duration.instant` | 150ms | Hover, fokus, tekan, toggle tema |
| `motion.duration.base` | 250ms | Modal buka/tutup, menu mobile |
| `motion.duration.slow` | 400ms | Scroll reveal (sekali per elemen) |
| `motion.easing.standard` | `cubic-bezier(0.2, 0, 0, 1)` | Semua transisi |

- Hanya properti `opacity`, `transform`, `color`, `background-color`, `border-color` yang dianimasikan (tanpa layout shift).
- Dengan `prefers-reduced-motion: reduce`, durasi **harus** mendekati 0 dan transform/scroll reveal **harus** dimatikan; konten tetap tampil penuh.
- Scroll reveal **tidak boleh** menyembunyikan elemen dari keyboard atau screen reader (elemen tetap ada di DOM dan dapat difokus).

### 2.6 Layout dan breakpoint

| Token | Nilai |
|---|---|
| `layout.container.max` | 1120px |
| `layout.gutter.mobile` | `space.5` (16px) |
| `layout.gutter.desktop` | `space.6` (64px) pada ≥ lg |
| `bp.sm` / `bp.md` / `bp.lg` / `bp.xl` | 640 / 768 / 1024 / 1280px (default Tailwind) |

Pendekatan desain desktop-first, tetapi seluruh fungsi **harus** bekerja pada 320px tanpa scroll horizontal. Anchor section **harus** memakai `scroll-margin-top` setara tinggi navbar agar fokus dan judul tidak tertutup navbar sticky.

### 2.7 Implementasi token (CSS variables)

Token **harus** dideklarasikan sebagai CSS variables di `src/styles/` dan dipetakan ke Tailwind/shadcn (mis. `--background` ← `color.surface.base`, `--foreground` ← `color.text.primary`, `--ring` ← `color.focus.ring`, `--border` ← `color.border.strong` untuk kontrol).

```css
:root {
  --color-surface-base: #faf9f7;
  --color-surface-muted: #f0eeeb;
  --color-surface-raised: #ffffff;
  --color-text-primary: #16120f;
  --color-text-secondary: #5c5750;
  --color-border-default: rgba(22, 18, 15, 0.12);
  --color-border-strong: rgba(22, 18, 15, 0.55);
  --color-focus-ring: #16120f;
  --color-status-error: #b42318;
  /* token lain mengikuti tabel 2.2 */
}

/* Dark: ikuti sistem kecuali pengguna memilih light */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-surface-base: #000000;
    --color-surface-muted: #16120f;
    --color-surface-raised: #0a0a0a;
    --color-text-primary: #ffffff;
    --color-text-secondary: #a8a49e;
    --color-border-default: rgba(255, 255, 255, 0.1);
    --color-border-strong: rgba(255, 255, 255, 0.45);
    --color-focus-ring: #ffffff;
    --color-status-error: #ff8a80;
  }
}

/* Dark: pilihan eksplisit pengguna (nilai sama dengan blok di atas) */
:root[data-theme="dark"] {
  --color-surface-base: #000000;
  --color-surface-muted: #16120f;
  --color-surface-raised: #0a0a0a;
  --color-text-primary: #ffffff;
  --color-text-secondary: #a8a49e;
  --color-border-default: rgba(255, 255, 255, 0.1);
  --color-border-strong: rgba(255, 255, 255, 0.45);
  --color-focus-ring: #ffffff;
  --color-status-error: #ff8a80;
}
```

Tema **harus** ditetapkan lewat skrip inline kecil di `<head>` sebelum render pertama agar tidak ada kilatan tema (flash) dan layout shift.

---

## 3. Aturan Komponen

### 3.0 Kontrak state global

Berlaku untuk semua komponen interaktif kecuali komponen menetapkan lain secara eksplisit.

| State | Aturan |
|---|---|
| default | Memakai token permukaan, teks, dan border sesuai varian. |
| hover | Hanya di dalam `@media (hover: hover)`; transisi `motion.duration.instant`; **tidak boleh** mengubah ukuran atau memicu layout shift. |
| focus-visible | `outline: 2px solid color.focus.ring; outline-offset: 2px`. **Tidak boleh** dihapus (`outline: none`) tanpa pengganti setara. Indikator **harus** ≥ 3:1 terhadap latar di sekitarnya dan tidak boleh terpotong `overflow: hidden`. |
| active | Pergeseran warna satu langkah lebih gelap/terang (token `bgActive`); **tidak boleh** memakai scale yang menggeser tata letak. |
| disabled | Atribut `disabled` (atau `aria-disabled="true"` bila harus tetap difokus); `color.text.disabled`; kursor `not-allowed`; status **tidak boleh** hanya dibedakan lewat warna. |
| loading | `aria-busy="true"`; label berubah (mis. "Sending…"); lebar kontrol tetap; klik berulang diblokir; fokus **tidak boleh** hilang. |
| error | `aria-invalid="true"` (untuk field), `color.status.error` pada border + ikon + pesan teks, pesan terhubung lewat `aria-describedby`. |

Target sentuh: area interaktif **harus** ≥ 24×24px (WCAG 2.5.8) dan **sebaiknya** ≥ 44×44px untuk kontrol utama.

### 3.1 Brand mark (monogram + nama)

- **Anatomi:** monogram SVG (inisial "GLP", usulan) + teks "Guntur Listyo Prabowo".
- **Fungsi:** tautan ke `#top`; nama aksesibel "Guntur Listyo Prabowo, back to top". SVG dekoratif memakai `aria-hidden="true"`.
- **Responsif:** < md hanya monogram tampil, nama tetap ada sebagai teks visually-hidden.

| State | Aturan |
|---|---|
| default | Monogram `color.text.primary`; teks `font.size.md`, `font.weight.strong`. |
| hover | Teks bergaris bawah. |
| focus-visible | Kontrak global. |
| active | Opasitas 0,8. |
| disabled | Tidak berlaku (selalu aktif). |
| loading | Tidak berlaku (aset inline, tanpa pemuatan jaringan). |
| error | Tidak berlaku. |

### 3.2 Navbar

- **Anatomi:** skip link ("Skip to main content") → brand mark → daftar tautan section → toggle tema → (mobile) tombol menu.
- **Varian:** desktop (inline, ≥ md), mobile (panel buka-tutup).
- **Perilaku:** sticky; `z.nav`; tinggi tetap sehingga tidak menutup fokus (gunakan `scroll-margin-top`). Tautan section aktif memakai `aria-current="location"` dan penanda non-warna (garis bawah).

| State | Aturan |
|---|---|
| default | `color.surface.base` dengan border bawah `color.border.default`; tautan `color.text.secondary`. |
| hover | Tautan → `color.text.primary`. |
| focus-visible | Kontrak global; skip link tampil saat difokus (`z.skip`). |
| active | Tautan ditekan → `color.text.primary` + garis bawah. |
| disabled | Tidak berlaku; tautan yang tujuannya belum ada **tidak boleh** dirender. |
| loading | Tidak berlaku; navbar statis. |
| error | Tidak berlaku. |

- **Keyboard:** Tab berurutan; Enter pada tautan melompat ke section dan memindahkan fokus ke judul section (`tabindex="-1"` pada heading). Tombol menu: `aria-expanded`, `aria-controls`; Esc menutup panel dan mengembalikan fokus ke tombol menu.
- **Pointer:** klik tautan; klik di luar panel mobile menutupnya.
- **Touch:** area tap ≥ 44px; panel tidak menutupi konten tanpa overlay yang bisa ditutup.
- **Edge case:** 7 tautan **harus** muat; pada 320px tautan pindah ke panel menu. Tanpa JavaScript, tautan anchor tetap berfungsi.

### 3.3 Toggle tema

- **Anatomi:** tombol ikon 44×44px (`radius.full`), ikon matahari/bulan.
- **Aksesibilitas:** nama aksesibel berubah sesuai aksi, mis. "Switch to dark theme" (jangan gabungkan dengan `aria-pressed`). Ikon `aria-hidden`.
- **Penyimpanan:** pilihan pengguna ke `localStorage` dalam `try/catch`; bila gagal, tetap berfungsi untuk sesi berjalan.

| State | Aturan |
|---|---|
| default | Border `color.border.strong`, ikon `color.text.primary`. |
| hover | Latar `color.surface.muted`. |
| focus-visible | Kontrak global. |
| active | Latar `color.surface.muted` dan border `color.text.primary`; tanpa pergeseran posisi ikon. |
| disabled | Tidak berlaku (selalu tersedia). |
| loading | Tidak berlaku; pergantian tema sinkron. |
| error | Bila penyimpanan gagal, tidak ada pesan; fungsi tetap berjalan (degradasi diam-diam). |

- **Keyboard:** Enter/Space. **Pointer/touch:** klik/tap. Transisi tema `motion.duration.instant`.

### 3.4 Tombol dan tautan aksi

- **Varian:** `primary` (View Projects, Get in Touch), `secondary` (outline; Download CV), `ghost` (aksi tersier).
- **Ukuran:** `md` tinggi 44px (padding `space.4`/`space.5`, `font.size.md`, `font.weight.strong`); `sm` tinggi 36px hanya untuk konteks padat di desktop.
- **Elemen:** aksi yang berpindah halaman/mengunduh memakai `<a>`; aksi yang mengubah state di halaman memakai `<button>`.
- **Download CV:** tautan `<a download>` ke `/cv.pdf`. Bila berkas belum tersedia, tombol **tidak boleh** dirender.

| State | Primary | Secondary |
|---|---|---|
| default | `action.primary.bg` + `action.primary.fg` | Transparan, border `color.border.strong`, teks `color.text.primary` |
| hover | `action.primary.bgHover` | Latar `color.surface.muted` |
| focus-visible | Kontrak global | Kontrak global |
| active | `action.primary.bgActive` | Latar `color.surface.muted` + border `color.text.primary` |
| disabled | Latar `color.surface.muted`, teks `color.text.disabled` | Border dan teks `color.text.disabled` |
| loading | Label "Please wait…", `aria-busy`, ikon spinner (statis bila reduced motion) | Sama |
| error | Tidak berlaku pada tombol; error ditampilkan di komponen induk (form) | Sama |

- **Keyboard:** Enter dan Space untuk `<button>`; Enter untuk `<a>`. **Pointer:** klik; kursor `pointer`. **Touch:** tap tanpa delay, area ≥ 44px.
- **Responsif:** CTA hero bertumpuk vertikal < sm (lebar penuh), sejajar ≥ sm.
- **Edge case:** label panjang boleh membungkus ke dua baris (tinggi tombol bertambah, tidak dipotong); label **tidak boleh** memakai ellipsis.

### 3.5 Tautan teks

- Tautan di dalam paragraf **harus** bergaris bawah (`text-underline-offset: 3px`) dan tidak hanya dibedakan lewat warna.
- Tautan eksternal **harus** memakai `rel="noopener noreferrer"`; jika membuka tab baru (`target="_blank"`), tambahkan ikon dan teks visually-hidden "(opens in new tab)".

| State | Aturan |
|---|---|
| default | `color.text.primary`, garis bawah `color.border.strong`. |
| hover | Garis bawah menjadi `color.text.primary`, ketebalan naik. |
| focus-visible | Kontrak global. |
| active | Garis bawah putus dihindari; cukup opasitas 0,8. |
| disabled | Tidak berlaku; tautan tidak valid **tidak boleh** dirender. |
| loading | Tidak berlaku. |
| error | Tidak berlaku; tautan rusak dicegah lewat checklist rilis. |

### 3.6 Section header

- **Anatomi:** eyebrow (`font.family.accent`, `font.size.xs`, mis. "02 — About") + `h2` (`font.size.2xl` mobile, `font.size.3xl` ≥ md) + deskripsi opsional (`font.size.lg`, `color.text.secondary`).
- Section **harus** diberi `id` dan `aria-labelledby` ke `h2`-nya.
- Tidak interaktif: state hover/focus/active/disabled/loading/error **tidak berlaku**; hanya state default. Padding vertikal `space.6` (mobile) / `space.8` (≥ lg).
- **Edge case:** judul panjang boleh membungkus; **tidak boleh** dipotong.

### 3.7 Kartu proyek

- **Anatomi:** gambar preview (rasio 16:10, `alt` bermakna) → chip kategori → judul `h3` (`font.size.xl`) → ringkasan (`font.size.md`, maks 3 baris) → chip teknologi (maks 4, sisanya "+N") → tombol "View details".
- **Pola interaksi:** satu kontrol utama per kartu (tombol "View details" dengan area klik diperluas ke seluruh kartu lewat pseudo-element). **Tidak boleh** ada elemen interaktif bersarang dalam kartu yang juga klik penuh.
- **Kategori:** Frontend/Web Development, UI/UX Design, Full-stack Web Application.
- **Grid:** 1 kolom (< md), 2 kolom (md), 3 kolom (≥ lg); jarak `space.5` → `space.10`.

| State | Aturan |
|---|---|
| default | Permukaan `color.surface.raised`, border `color.border.default`, `radius.lg`. |
| hover | Border → `color.border.strong`; gambar tidak di-zoom (tanpa layout shift). |
| focus-visible | Cincin fokus pada seluruh kartu (lewat tombol di dalamnya, `:focus-visible` pada pseudo-element). |
| active | Latar `color.surface.muted`. |
| disabled | Tidak berlaku; proyek tanpa informasi memadai **tidak boleh** dirender. |
| loading | Gambar memakai skeleton `color.surface.muted` dengan dimensi tetap (cegah CLS); `loading="lazy"` untuk kartu di bawah fold. |
| error | Gambar gagal → placeholder `color.surface.muted` dengan inisial proyek; kartu tetap bisa dibuka. |

- **Keyboard:** Tab ke tombol "View details"; Enter/Space membuka modal. **Pointer:** klik di mana saja pada kartu. **Touch:** tap membuka modal; tanpa mekanisme hover-only.
- **Edge case:** judul > 2 baris dipotong dengan `line-clamp` dan tetap lengkap di modal; proyek tanpa gambar memakai placeholder; tautan GitHub/demo/Figma yang tidak tersedia **tidak boleh** dirender. **Empty state** (tidak ada proyek): pesan "Projects are being added." dengan tautan ke GitHub; tidak ada grid kosong.

### 3.8 Modal detail proyek

- **Basis:** shadcn/ui `Dialog` (Radix) untuk focus trap, Esc, dan penguncian scroll.
- **Anatomi:** overlay (`color.overlay`) → panel (`color.surface.raised`, `radius.lg`, `shadow.modal`) → header (judul `h2` + tombol tutup) → konten (ringkasan masalah/tujuan, peran dan kontribusi, tools utama, screenshot, tautan) → footer tautan aksi.
- **Aksesibilitas:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` ke judul; tombol tutup bernama "Close project details"; latar belakang inert.

| State | Aturan |
|---|---|
| default | Panel lebar maks 720px, tinggi maks 90dvh, konten menggulir di dalam panel. |
| hover | Hanya pada kontrol di dalam (tombol tutup, tautan) sesuai kontrak global. |
| focus-visible | Fokus awal ke judul/tombol tutup; fokus **tidak boleh** keluar dari panel. |
| active | Tidak berlaku pada panel; berlaku pada kontrol di dalamnya. |
| disabled | Tidak berlaku. |
| loading | Screenshot memakai skeleton dengan rasio tetap; modal tampil segera tanpa menunggu gambar. |
| error | Screenshot gagal dimuat → placeholder + teks alternatif; tautan tetap berfungsi. |

- **Keyboard:** Esc menutup; Tab/Shift+Tab berputar dalam panel; saat tertutup, fokus **harus** kembali ke tombol pemicu.
- **Pointer:** klik overlay atau tombol tutup menutup modal. **Touch:** swipe tidak wajib; tombol tutup ≥ 44px.
- **Responsif:** < sm tampil penuh layar (sheet) dengan padding `space.5`; ≥ sm dialog di tengah.
- **Motion:** buka/tutup dengan `opacity` + `transform` kecil, `motion.duration.base`; dimatikan saat reduced motion.
- **Edge case:** konten panjang menggulir di dalam panel (bukan di halaman); judul panjang membungkus; bagian tanpa data (mis. tanpa Figma) dihilangkan, bukan ditampilkan kosong. Bila implementasi modal mengancam tenggat, panel overlay sederhana diperbolehkan asalkan aksesibilitasnya setara.

### 3.9 Chip (kategori/teknologi)

- **MVP:** elemen statis `<span>` (`font.size.sm`, `radius.sm`, border `color.border.default`, padding `space.2`/`space.3`); **bukan** tombol.
- **Fase lanjut (filter proyek):** berubah menjadi `<button>` dengan `aria-pressed`, tinggi ≥ 36px (ideal 44px), dan mengikuti kontrak state global.

| State | Aturan |
|---|---|
| default | Teks `color.text.secondary`. |
| hover / active | Tidak berlaku pada MVP (non-interaktif). |
| focus-visible | Tidak berlaku pada MVP; berlaku saat berubah menjadi tombol. |
| disabled / loading / error | Tidak berlaku. |

- **Edge case:** deretan chip membungkus (`flex-wrap`); chip > 4 diringkas "+N".

### 3.10 Daftar skills

- **Anatomi:** `ul` per kelompok (Frontend, UI/UX, Tools); judul kelompok `h3`; item berupa teks + ikon opsional.
- **Aturan:** tidak ada persentase atau bar kemampuan; hanya item yang benar-benar dikuasai.
- Non-interaktif: hanya state default. **Edge case:** kelompok tanpa item disembunyikan; item panjang membungkus; grid 1 kolom (< md), 2–3 kolom (≥ md).

### 3.11 Form kontak

- **Field:** Name (`autocomplete="name"`), Email (`type="email"`, `autocomplete="email"`), Message (`textarea`, maks 2000 karakter).
- **Anatomi per field:** label terlihat (selalu di atas input) → input/textarea → teks bantu → pesan error. Field wajib ditandai teks "(required)", bukan hanya tanda bintang.
- **Anti-spam:** field honeypot tersembunyi (`aria-hidden="true"`, `tabindex="-1"`, di luar layar) dan perlindungan dari layanan form yang dipilih.
- **Gaya input:** tinggi 44px, `radius.md`, border `color.border.strong`, latar `color.surface.raised`, teks `font.size.md`.

| State | Aturan |
|---|---|
| default | Placeholder (`color.text.secondary`) **tidak boleh** menggantikan label. |
| hover | Border → `color.text.primary`. |
| focus-visible | Kontrak global (cincin fokus 2px) plus border `color.text.primary`. |
| active | Sama dengan focus saat mengetik. |
| disabled | Hanya saat pengiriman berlangsung; `color.text.disabled`, `aria-disabled`. |
| loading | Tombol kirim: "Sending…", `aria-busy="true"`; input dipertahankan; pengiriman ganda diblokir. |
| error | `aria-invalid="true"`, border + ikon + pesan `color.status.error`, `aria-describedby` ke pesan. |

- **Validasi:** saat submit dan saat blur setelah field disentuh; tidak memvalidasi pada setiap ketikan. Saat submit gagal, fokus pindah ke field pertama yang error.
- **Status pengiriman:** sukses memakai `role="status"` (pesan "Message sent. I'll get back to you soon."); gagal memakai `role="alert"` dan menampilkan alternatif email serta LinkedIn. Input pengguna **tidak boleh** dihapus saat gagal.
- **Keyboard:** Tab berurutan, Enter pada tombol kirim; Enter pada textarea membuat baris baru. **Pointer/touch:** target ≥ 44px; keyboard mobile sesuai tipe field.
- **Edge case:** email > 254 karakter ditolak dengan pesan jelas; teks tempelan panjang dipotong di 2000 karakter dengan hitungan "n/2000"; koneksi putus menampilkan status gagal; konten pesan **tidak boleh** dikirim ke analytics.

---

## 4. Persyaratan Aksesibilitas dan Kriteria Penerimaan

Target: WCAG 2.2 AA. Setiap kriteria punya cara cek dan hasil lulus/gagal.

| ID | Persyaratan | Cara uji | Lulus bila |
|---|---|---|---|
| AC-01 | Kontras teks normal ≥ 4,5:1 di kedua tema | Alat kontras (DevTools/axe) pada setiap kombinasi `text.*` × `surface.*` | Tidak ada pelanggaran |
| AC-02 | Kontras teks besar, border kontrol, ikon, dan fokus ≥ 3:1 | Alat kontras pada `border.strong`, `focus.ring`, ikon | Semua ≥ 3:1 |
| AC-03 | Semua kontrol dapat dijangkau dan dioperasikan dengan keyboard | Tab/Shift+Tab/Enter/Space/Esc dari awal sampai akhir halaman | Tidak ada kontrol yang tak terjangkau; tidak ada keyboard trap di luar modal |
| AC-04 | Urutan fokus mengikuti urutan visual | Tab melalui halaman | Urutan logis, tanpa lompatan |
| AC-05 | Indikator fokus terlihat pada semua kontrol | Tab dan periksa visual di light/dark | Cincin 2px terlihat, tidak terpotong |
| AC-06 | Fokus tidak tertutup navbar sticky (WCAG 2.4.11) | Tab ke elemen di bawah navbar saat scroll | Elemen terfokus tidak tertutup sepenuhnya |
| AC-07 | Skip link tersedia dan berfungsi | Tab pertama dari awal halaman | Skip link tampil dan memindahkan fokus ke `main` |
| AC-08 | Modal: focus trap, Esc, dan pengembalian fokus | Buka modal lewat keyboard | Fokus terkunci, Esc menutup, fokus kembali ke pemicu |
| AC-09 | Form: label eksplisit, error terbaca screen reader | Screen reader (NVDA/VoiceOver) + axe | Label terbaca; error diumumkan; `aria-invalid` benar |
| AC-10 | Status sukses/gagal form diumumkan | Kirim form pada kondisi berhasil dan gagal | `role="status"` / `role="alert"` terumumkan |
| AC-11 | Struktur heading semantik | Outline heading (HeadingsMap/axe) | Satu `h1`, tanpa lompat level |
| AC-12 | `prefers-reduced-motion` dihormati | Aktifkan reduce motion di OS | Tidak ada transform/reveal; konten tetap tampil |
| AC-13 | Informasi tidak hanya lewat warna | Uji grayscale | Error/aktif tetap dapat dikenali (ikon/teks/garis) |
| AC-14 | Target sentuh ≥ 24×24px (sebaiknya 44×44) | Ukur di DevTools | Tidak ada target < 24px |
| AC-15 | Tidak ada scroll horizontal pada 320px | Viewport 320px | Lebar dokumen = viewport |
| AC-16 | Zoom 200% dan teks 200% tetap dapat dipakai | Zoom browser 200% | Tidak ada konten terpotong/tumpang tindih |
| AC-17 | Gambar bermakna punya `alt`; dekoratif `alt=""` | axe + inspeksi | Tidak ada gambar tanpa atribut `alt` |
| AC-18 | Tautan eksternal aman dan diumumkan | Inspeksi DOM | `rel="noopener noreferrer"` ada; tab baru diumumkan |
| AC-19 | Konten inti tersedia tanpa JavaScript/animasi | Nonaktifkan JS | Teks, tautan, dan CV tetap dapat diakses |
| AC-20 | Tema tanpa flash dan tanpa layout shift | Muat ulang dengan tema tersimpan; Lighthouse | CLS ≤ 0,1; tidak ada kilatan tema |

---

## 5. Standar Konten dan Tone

**Tone:** ringkas, percaya diri, dan berorientasi hasil; profesional tanpa bahasa korporat kaku; mengutamakan bukti dibanding klaim. Antarmuka berbahasa Inggris.

**Aturan konten**

- Label aksi **harus** menyebut hasilnya; Title Case untuk CTA (View Projects, Get in Touch, Download CV).
- Tautan **harus** dapat dipahami di luar konteks. Tautan serupa (mis. beberapa "Live demo") **harus** diberi konteks visually-hidden berisi nama proyek.
- Klaim pengalaman atau pencapaian yang belum terverifikasi **tidak boleh** dipakai.
- Deskripsi proyek **sebaiknya** mengikuti pola: tujuan → peran → hasil, maksimal 3 kalimat di kartu.

| Konteks | Contoh baik | Contoh buruk |
|---|---|---|
| CTA hero | View Projects | Click here |
| Unduh CV | Download CV (PDF) | Download |
| Tautan proyek | Live demo<span class="sr-only"> — Project Name</span> | Link |
| Tautan eksternal | GitHub repository (opens in new tab) | Go |
| Error nama | Enter your name so I know who to reply to. | Invalid input |
| Error email | Enter a valid email address, for example name@example.com. | Error |
| Sukses form | Message sent. I'll get back to you soon. | Success! |
| Gagal form | Couldn't send your message. Try again, or email me directly at the address below. | Something went wrong |
| Empty state | Projects are being added. Browse my work on GitHub in the meantime. | No data |
| Headline (usulan) | Building Thoughtful Digital Experiences. | Passionate ninja rockstar developer |

---

## 6. Anti-pattern dan Implementasi Terlarang

1. **Tidak boleh** memakai teks berkontras rendah (mis. `color.text.tertiary` referensi `#292623` di atas latar gelap).
2. **Tidak boleh** menyembunyikan atau menghapus indikator fokus (`outline: none` tanpa pengganti).
3. **Tidak boleh** memakai nilai hex/px mentah di komponen; gunakan token.
4. **Tidak boleh** membuat pengecualian spasi atau tipografi satu-kali; tambah token bila memang perlu.
5. **Tidak boleh** memakai label ambigu ("Click here", "Read more", "Submit" tanpa konteks).
6. **Tidak boleh** memakai placeholder sebagai pengganti label.
7. **Tidak boleh** menampilkan persentase/bar skill yang arbitrer.
8. **Tidak boleh** merender tombol atau tautan yang tujuannya belum ada (CV, demo, Figma, GitHub).
9. **Tidak boleh** menaruh elemen interaktif di dalam elemen interaktif (mis. tombol di dalam kartu yang seluruhnya `<a>`).
10. **Tidak boleh** mengandalkan hover untuk mengungkap informasi atau aksi (perangkat sentuh).
11. **Tidak boleh** menganimasikan properti yang memicu layout shift (`width`, `height`, `top`, `margin`).
12. **Tidak boleh** memakai animasi berulang yang mengalihkan perhatian, atau mengabaikan `prefers-reduced-motion`.
13. **Tidak boleh** mengirim nama, email, atau isi pesan form ke analytics.
14. **Tidak boleh** mengirim komponen tanpa aturan state eksplisit (tujuh state atau pernyataan "tidak berlaku" beserta alasannya).

---

## 7. Catatan Migrasi dan Penanganan Kasus Khusus

### 7.1 Dari referensi Overmind ke portofolio

| Aspek referensi | Keputusan | Alasan |
|---|---|---|
| Hanya tema gelap | Diperluas menjadi light + dark | Diwajibkan PRD (FR-05) |
| Font neueBit | Diganti `Geist` (usulan) lewat token `font.family.primary` | PRD mensyaratkan Google Fonts |
| `color.text.tertiary=#292623` | Dipetakan sebagai `color.text.primary` tema light (`#16120f` sebagai basis hangat) | Warna itu tidak terbaca di atas latar gelap |
| `color.focus.ring` = abu-abu 50% (oklab) | Diganti `#ffffff` (dark) / `#16120f` (light) | Perkiraan kontras ±1,8:1 terhadap hitam; di bawah 3:1 (gagal AC-02) |
| Skala spasi melompat 16 → 64px | Ditambah `space.9–11` | Mencegah pengecualian satu-kali |
| `color.border.default` (putih 10%) | Dipakai hanya untuk pemisah dekoratif; `border.strong` untuk kontrol | Border kontrol perlu ≥ 3:1 |
| Hanya `motion.duration.instant=150ms` | Ditambah `base` dan `slow` | Modal dan reveal butuh durasi lebih panjang |
| Kepadatan tautan tinggi (±83) | Tidak diadopsi | Fokus pada proyek dan kontak |

### 7.2 Edge case lintas komponen

- **Konten panjang:** judul membungkus atau `line-clamp` dengan versi lengkap tersedia di modal; tidak ada teks dipotong tanpa akses ke versi penuh.
- **Overflow:** tabel/kode/diagram menggulir di dalam wadah `overflow-x: auto`; halaman tidak menggulir horizontal.
- **Gambar gagal:** placeholder dengan dimensi tetap; kartu dan modal tetap berfungsi.
- **Empty state:** bagian tanpa data disembunyikan atau diganti pesan empty state, bukan dibiarkan kosong.
- **Penyimpanan tidak tersedia:** tema dan preferensi dibungkus `try/catch`; fungsi inti tetap jalan.
- **Analytics gagal:** tidak boleh mengganggu fungsi utama.
- **Tanpa JavaScript:** konten inti dan tautan anchor tetap dapat diakses.

---

## 8. QA Checklist

**Token dan visual**
- [ ] Tidak ada nilai warna/spasi/ukuran font mentah di komponen; semua dari token.
- [ ] Dua tema tampil benar; tidak ada flash tema saat muat ulang.
- [ ] Hanya dua bobot font dan maksimal dua keluarga font yang dimuat.
- [ ] Section memakai padding vertikal token (`space.6` / `space.8`).

**Komponen dan state**
- [ ] Setiap komponen interaktif memiliki state default, hover, focus-visible, active, disabled, loading, error (atau "tidak berlaku" yang beralasan).
- [ ] Hover hanya di `@media (hover: hover)` dan tanpa layout shift.
- [ ] Tidak ada tombol/tautan ke tujuan yang belum ada (CV, GitHub, demo, Figma).
- [ ] Kartu proyek: satu kontrol utama, tidak ada elemen interaktif bersarang.

**Keyboard, pointer, touch**
- [ ] Seluruh halaman dapat dioperasikan dengan keyboard; skip link berfungsi.
- [ ] Modal: focus trap, Esc, dan pengembalian fokus lulus.
- [ ] Menu mobile: `aria-expanded`/`aria-controls`, Esc menutup.
- [ ] Target sentuh ≥ 24px (sebaiknya 44px) dan tidak ada interaksi hover-only.

**Aksesibilitas**
- [ ] AC-01 sampai AC-20 lulus (Bagian 4).
- [ ] Lighthouse Accessibility tanpa temuan kritis; axe tanpa pelanggaran.
- [ ] Diuji dengan satu screen reader (NVDA atau VoiceOver) pada form dan modal.

**Responsif**
- [ ] Layout dipakai tanpa scroll horizontal pada 320, 768, 1024, 1280px.
- [ ] Grid proyek 1/2/3 kolom sesuai breakpoint.
- [ ] Zoom 200% tetap dapat dipakai.

**Konten**
- [ ] Semua label aksi deskriptif; tautan serupa diberi konteks.
- [ ] Pesan error, sukses, gagal, dan empty state sesuai Bagian 5.
- [ ] Tidak ada klaim yang belum terverifikasi.

**Performa dan keandalan**
- [ ] LCP ≤ 2,5 detik, INP ≤ 200 ms, CLS ≤ 0,1 pada pengujian lab.
- [ ] Gambar dikompresi, berdimensi tetap, dan lazy-load di bawah fold.
- [ ] Animasi hanya `opacity`/`transform`; reduced motion dihormati.
- [ ] Form terkirim ke tujuan yang benar di production; isi pesan tidak masuk analytics.
