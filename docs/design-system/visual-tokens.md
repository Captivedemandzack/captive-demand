# Visual Tokens

This document records the visual design tokens currently implemented in the codebase.

## Colors

### Primary Colors
- **Background**: `#FAFAFA` - Main page background color
  - Usage: `bg-[#FAFAFA]`
- **Foreground/Dark**: `#1a1512` - Primary text color
  - Usage: `text-[#1a1512]`, `bg-[#1a1512]`
  - CSS Variable: `--foreground: #1a1512`
- **White**: `#ffffff` - Pure white
  - Usage: `bg-white`, `text-white`
  - CSS Variable: `--background: #ffffff`

### Accent Colors
- **Orange Primary**: `#ff5501` - Primary accent color (also seen as `#FF5500` in config)
  - Usage: `bg-[#ff5501]`, `text-[#ff5501]`, hover states
  - Tailwind Config: `brand.orange: "#FF5500"`
- **Orange Dark**: `#8f3a00` - Darker orange variant (used in gradients)
- **Black Dark**: `#0a0a0a` - Very dark black (used in gradients)

### Neutral Grays
- **Light Gray**: `#e8e8e8` - Card backgrounds
  - Usage: `bg-[#e8e8e8]`
- **Medium Gray**: `#e5e5e5` - Decorative lines
  - Usage: Line colors in decorative shapes
- **Lighter Gray**: `#d5d5d5` - Decorative shape fills
  - Usage: Shape colors
- **Very Light Gray**: `#f5f5f5` - Logo box backgrounds
  - Usage: `bg-[#f5f5f5]`
- **Faded Gray**: `#f3f4f6` - Accordion collapsed state
  - Usage: `bg-[#f3f4f6]`

### Opacity Variants
Colors are used with Tailwind opacity modifiers:
- `/5` - Very subtle borders: `border-[#1a1512]/5`
- `/10` - Subtle borders/backgrounds: `bg-[#1a1512]/10`, `border-[#1a1512]/10`
- `/20` - Light overlays: `bg-[#ff5501]/20`, `bg-white/20`
- `/40` - Medium opacity text: `text-white/40`, `text-[#1a1512]/40`
- `/60` - Secondary text: `text-white/60`, `text-[#1a1512]/60`
- `/70` - Section labels: `text-[#1a1512]/70`
- `/80` - Body text on dark: `text-white/80`, `text-[#1a1512]/80`

### Gradient Backgrounds
- **Pro Card Gradient**: `radial-gradient(circle at 0% 0%, #ff5501 0%, #8f3a00 25%, #1a1512 60%, #0a0a0a 100%)`
  - Used for premium pricing cards

## Font Families

### Custom Fonts (from `globals.css`)

#### Nohemi
- **ExtraLight**: `font-weight: 200`
  - File: `/fonts/Nohemi-ExtraLight-BF6438cc58a2634.ttf`
- **Light**: `font-weight: 300`
  - File: `/fonts/Nohemi-Light-BF6438cc5899919.ttf`
  - Usage: Section headings with `fontWeight: 300`
- **Regular**: `font-weight: 400`
  - File: `/fonts/Nohemi-Regular-BF6438cc4d0e493.ttf`
- **SemiBold**: `font-weight: 600`
  - File: `/fonts/Nohemi-SemiBold-BF6438cc588a48a.ttf`

**Usage**: Applied via inline style `style={{ fontFamily: 'Nohemi, sans-serif' }}` or Tailwind class `font-nohemi`

#### Galgo
- **Regular**: `font-weight: 400`
  - File: `/fonts/Galgo.ttf`

#### Graphik
- **Medium**: `font-weight: 500`
  - File: `/fonts/Graphik Medium.otf`

### Tailwind Font Families
- `font-sans` - System sans-serif fallback
- `font-mono` - Monospace font (used for labels, descriptions, buttons)
- `font-syne` - Syne font family
- `font-nohemi` - Nohemi font family

## Border Radius

### Standard Radius Values
- **`rounded-lg`** - `0.5rem` (8px) - Small elements like icon containers
- **`rounded-xl`** - `0.75rem` (12px) - Logo boxes, button left side, badge corners
- **`rounded-2xl`** - `1rem` (16px) - Add-on cards, grid containers
- **`rounded-3xl`** - `1.5rem` (24px) - Pricing cards, main card containers
- **`rounded-full`** - Fully rounded - Checkmark icons, pill badges

### Usage Examples
- Pricing cards: `rounded-3xl`
- Logo boxes: `rounded-xl`
- Icon containers: `rounded-lg`
- Badge bottom-left corner: `rounded-bl-xl`
- Checkmark containers: `rounded-full`
- Grid containers: `rounded-2xl`

## High-Fidelity "Antigravity" UI Rules
To achieve the "High Design" aesthetic, all interactive elements must follow these advanced rules:

### 1. The "Tactile" Button (Figma Style)
Instead of flat colors, buttons must use inner shadows to feel 3D.
**Recipe:**
- **Inner Top Highlight:** `shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]`
- **Subtle Border:** `border border-white/10`
- **Hover:** Slightly increase brightness, do not change layout.

### 2. Glass Cards
- **Background:** Use `bg-white/5` or `bg-[#0F172A]/60` with `backdrop-blur-md`.
- **Border:** Always use `border-white/5` for a premium, subtle edge.
- **Noise Texture:** (Optional) Add a subtle noise overlay at opacity-5 for texture.

### 3. Spacing Philosophy
- **Breathing Room:** Minimum `gap-8` (32px) between grid items.
- **Section Padding:** Minimum `py-24` (96px) for major sections to feel "premium."