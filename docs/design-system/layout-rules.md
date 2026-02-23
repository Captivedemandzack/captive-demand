# Layout Rules

This document records the standard layout patterns currently implemented in the codebase.

## Section Padding

### Standard Section Padding Pattern
All major sections use the same responsive padding pattern:

```tsx
className="w-full bg-[#FAFAFA] py-20 md:py-32 px-4"
```

- **Vertical Padding**:
  - Mobile: `py-20` (5rem / 80px)
  - Desktop: `md:py-32` (8rem / 128px)
- **Horizontal Padding**: `px-4` (1rem / 16px) on all breakpoints

### Usage Examples
- `PricingAndAddons` section: `py-20 md:py-32 px-4`
- `Methodology` section: `py-20 md:py-32 px-4`
- `FAQSection`: `py-20 md:py-32 px-4`
- `ProcessSection`: `py-20 md:py-32 px-4`
- `CTASection`: `py-20 md:py-32 px-4`

## Container Max-Width

### Standard Container Pattern
All content containers use:

```tsx
className="max-w-7xl mx-auto"
```

- **Max Width**: `max-w-7xl` (80rem / 1280px)
- **Centering**: `mx-auto` (auto margins on left/right)

### Usage Examples
- Pricing section container: `max-w-7xl mx-auto`
- Methodology section container: `max-w-7xl mx-auto`
- FAQ section container: `max-w-7xl mx-auto`
- Process section container: `max-w-7xl mx-auto`

### Alternative Container Widths
- CTA Section uses: `max-w-[1400px]` (custom width, 1400px)

## Grid Gaps

### Standard Grid Gap Values
The following gap values are used throughout the codebase:

- **`gap-3`** - `0.75rem` (12px) - Tight spacing (pricing cards grid)
- **`gap-4`** - `1rem` (16px) - Standard spacing (accordion items, card stacks)
- **`gap-6`** - `1.5rem` (24px) - Medium spacing
- **`gap-8`** - `2rem` (32px) - Header content spacing, flex gaps
- **`gap-12`** - `3rem` (48px) - Section content spacing
- **`gap-16`** - `4rem` (64px) - Large section spacing
- **`gap-20`** - `5rem` (80px) - Extra large spacing (CTA section)
- **`gap-24`** - `6rem` (96px) - Maximum spacing

### Responsive Grid Gaps
- **`gap-12 lg:gap-16`** - Increases from 48px to 64px on large screens
- **`gap-12 lg:gap-8`** - Decreases from 48px to 32px on large screens (used in Methodology grid)

### Usage Examples

#### Pricing Cards Grid
```tsx
className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-24 items-stretch"
```
- Uses `gap-3` for tight spacing between pricing cards

#### Methodology Grid
```tsx
className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16"
```
- Mobile: `gap-12` (48px)
- Desktop: `lg:gap-8` (32px)

#### FAQ Section Grid
```tsx
className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
```
- Mobile: `gap-12` (48px)
- Desktop: `lg:gap-16` (64px)

#### CTA Section Grid
```tsx
className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start lg:items-center"
```
- Mobile: `gap-12` (48px)
- Desktop: `lg:gap-20` (80px)

#### Add-ons Grid
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1512]/10 border border-[#1a1512]/10 rounded-2xl overflow-hidden"
```
- Uses `gap-px` (1px) for seamless borders between cards

## Header Spacing

### Section Header Margins
Standard pattern for section headers:

```tsx
className="mb-16 md:mb-24"
```

- **Mobile**: `mb-16` (4rem / 64px)
- **Desktop**: `md:mb-24` (6rem / 96px)

### Usage Examples
- Pricing section header: `mb-16 md:mb-24`
- Process section header: `mb-16 md:mb-24`
- Methodology section header: `mb-12 md:mb-16` (slightly smaller variant)

## Decorative Element Spacing

### Decorative Shape Margin
```tsx
className="mb-6 w-full"
```
- **Margin Bottom**: `mb-6` (1.5rem / 24px)
- Used for decorative shape with line component

## Content Spacing Patterns

### Label to Heading
```tsx
className="mb-4"
```
- **Margin Bottom**: `mb-4` (1rem / 16px)
- Spacing between section label and main heading

### Heading to Content
```tsx
className="mb-8"
```
- **Margin Bottom**: `mb-8` (2rem / 32px)
- Common spacing after headings

### Card Internal Spacing
- **Card Padding**: `p-8 lg:p-10`
  - Mobile: `p-8` (2rem / 32px)
  - Desktop: `lg:p-10` (2.5rem / 40px)
- **Feature List Margin**: `mb-12` (3rem / 48px)
- **Price Section Margin**: `mb-8` (2rem / 32px)
