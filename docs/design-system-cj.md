# Cicero Joias - Visual Identity System

## 1. Core Concept: "Tradição & Excelência"
A visual identity that conveys 40 years of tradition, craftsmanship, and timeless elegance.
The aesthetic oscillates between **Dark Premium (Hero/Cinematic)** and **Classic Light (Content/Reading)**.

## 2. Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Deep Green** | `#184434` | Primary Brand Color. Backgrounds for Hero, Footer, Luxury Sections. |
| **Gold** | `#c79a34` | Accents, Icons, Buttons, Borders. The "Joia" element. |
| **Off-White** | `#f7f5f0` | Light Backgrounds (Beige/Cream). Reading surfaces. |
| **Dark** | `#1a1a1a` | Text on Light backgrounds, Deep contrast. |

### Secondary / Functional
| Name | Hex | Usage |
|------|-----|-------|
| **Overlay Green** | `#0B2B20` | Gradients, Depth layers on Deep Green. |
| **White/Alpha** | `rgba(255,255,255, n)` | Glassmorphism, Text on Dark. |

## 3. Typography
- **Headings**: *Philosopher* (Serif/Display) - Elegant, classic.
- **Subheadings/Tags**: *Jost* (Sans) - Modern, geometric, uppercase tracking.
- **Body**: *Montserrat* (Sans) - Clean, readable, versatile.

## 4. Visual Effects (Dark Premium)
Used in Hero and Dark Sections.

### Glassmorphism & Depth
- **Surface**: `bg-white/[0.03]` to `bg-white/[0.07]` with `backdrop-blur-md` or `backdrop-blur-xl`.
- **Borders**: Thin, elegant borders. `border-white/10` or `border-ouro/30` on hover.
- **Shadows**: Colored glowing shadows.
  - *Default*: `shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]`
  - *Golden Glow*: `shadow-[0_0_40px_-10px_rgba(207,154,36,0.5)]`

### Gradients & Noise
- **Cinematic Overlay**: `bg-gradient-to-br from-[#0B2B20]/80 via-[#184434]/80 to-[#04160F]/80`
- **Texture**: Perlin Noise at 3% opacity (`opacity-[0.03]`) mixed with overlay.
- **Atmosphere**: Radial gradients (blobs) in Esmeralda or Gold to create separation and depth.

## 5. UI Elements

### Buttons (Gold)
- **Background**: `#c79a34` (Ouro)
- **Text**: Dark Green (Contrast) or White (depending on context).
- **Shape**: Rounded Full (`rounded-full`).
- **Style**: Uppercase, Tracking Wide (`tracking-[0.2em]`).

### Cards (Dark Theme)
- **Container**: Glassmorphic dark container.
- **Interactive**: Hover lifts (`-translate-y`), brightens border (`border-ouro/30`), and triggers internal glows.

## 6. Implementation Notes
- **Alternating Rhythm**: The site usually alternates between Dark (Hero, CTA) and Light (Services, Testimonials) sections to maintain visual interest.
- **Motion**: Elements should always enter with `framer-motion` (fade-up, stagger).

## 7. Visual Effects (Light Premium)
Used in Content Sections (Services, Testimonials).

### Classic Elegance
- **Background**: `bg-[#f7f5f0]` (Beige/Off-white).
- **Typography**:
  - *Headings*: **Deep Green** (`#184434`) for high contrast and brand identity.
  - *Body*: **Dark Gray** (`#1a1a1a`) or Deep Green/80.
  - *Accents*: **Gold** (`#c79a34`) for subtitles and badges.

### Cards (Light Theme)
- **Container**: White (`#ffffff`) or Cream (`#fffbf2`) to stand out against Beige.
- **Borders**: Minimalist. `border-[#c79a34]/10` (Gold/10).
- **Shadows**: Soft, diffuse shadows.
  - *Default*: `shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]`
  - *Hover*: Gold glow `shadow-[0_10px_40px_-10px_rgba(199,154,52,0.15)]`
- **Interactions**: Subtle lift (`-translate-y-1`) + Border darkening (`border-[#c79a34]/50`).

### Pattern & Texture (Light)
- **Noise**: Very subtle (`opacity-[0.03]`) mix-blend-multiply to add paper-like texture.
- **Radial**: Gold/Green radials at 3% opacity (`rgba(199,154,52,0.03)`) to break flatness.

### Specific Components

#### Service Cards
- **Style**: Catalog-like, elegant, sharp but rounded (`rounded-xl`).
- **Background**: Pure White (`#ffffff`).
- **Iconography**:
    - *Functional*: Small, inside Gold/10 circle. **Hover**: White Icon on Gold Background.
    - *Decorative*: Large, background, Gold/5 opacity, rotated.
- **Typography**:
    - *Title*: Serif (Philosopher) in Deep Green. **Hover**: Gold (`#c79a34`).
    - *CTA*: Sans (Jost) Uppercase in Gold.


