# Component Patterns

This document extracts reference component patterns from the codebase.

## Pricing Card Component

**Location**: `src/components/services/website/PricingAndAddons.tsx`

### Component Code

```tsx
const PricingCard = ({
    title,
    description,
    price,
    features,
    isPro = false,
    buttonText = "Select Plan"
}: {
    title: string;
    description: string;
    price: string;
    features: string[];
    isPro?: boolean;
    buttonText?: string;
}) => (
    <div className={`
        relative w-full rounded-3xl p-8 lg:p-10 flex flex-col h-full transition-all duration-300 hover:shadow-2xl overflow-hidden
        ${isPro
            ? 'text-white' // Pro: No border, gradient bg set in style
            : 'bg-[#e8e8e8] border border-[#1a1512]/5 text-[#1a1512]' // Starter: Grey BG + Light Border
        }
    `}
        style={isPro ? {
            background: 'radial-gradient(circle at 0% 0%, #ff5501 0%, #8f3a00 25%, #1a1512 60%, #0a0a0a 100%)'
        } : {}}
    >

        {/* Most Popular Badge for Pro */}
        {isPro && (
            <div className="absolute top-0 right-0 bg-[#ff5501] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-2 rounded-bl-xl z-10">
                Most Popular
            </div>
        )}

        {/* Top Section: Logo & Title */}
        <div className="relative z-10">

            {/* LOGO BOX */}
            <div className="w-14 h-14 rounded-xl mb-8 flex items-center justify-center bg-[#f5f5f5] border border-[#1a1512]/5">
                <div className="relative w-8 h-8">
                    <Image
                        src="/C.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-medium mb-3" style={{ fontFamily: 'Nohemi, sans-serif' }}>
                    {title}
                </h3>
                <p className={`text-base font-mono ${isPro ? 'text-white/60' : 'text-[#1a1512]/60'}`}>
                    {description}
                </p>
            </div>

            {/* Divider */}
            <div className={`w-full h-[1px] mb-8 ${isPro ? 'bg-gradient-to-r from-white/20 to-transparent' : 'bg-[#1a1512]/10'}`} />

            {/* Features List */}
            <div className={`mb-12 flex-1 ${isPro ? 'grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4' : 'space-y-4'}`}>
                {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className={`mt-1 rounded-full p-0.5 ${isPro ? 'bg-[#ff5501]/20 text-[#ff5501]' : 'bg-[#1a1512]/10 text-[#1a1512]'}`}>
                            <Check size={12} strokeWidth={3} />
                        </div>
                        <span className={`text-sm leading-tight ${isPro ? 'text-white/80' : 'text-[#1a1512]/80'}`}>
                            {feature}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* Footer: Price + Button */}
        <div className="mt-auto relative z-10">
            <div className="flex flex-col mb-8">
                <span className="text-4xl font-bold tracking-tight mb-1">{price}</span>
                <span className={`text-xs font-mono uppercase tracking-widest ${isPro ? 'text-white/40' : 'text-[#1a1512]/40'}`}>Per month / Cancel anytime</span>
            </div>

            <PricingCTAButton text={buttonText} isDarkBg={isPro} />
        </div>
    </div>
);
```

### Key Design Patterns

1. **Card Structure**:
   - `rounded-3xl` - Large border radius
   - `p-8 lg:p-10` - Responsive padding
   - `flex flex-col h-full` - Full height flex column
   - `hover:shadow-2xl` - Hover shadow effect

2. **Variant Styling**:
   - **Starter**: Light gray background (`bg-[#e8e8e8]`) with subtle border
   - **Pro**: Dark gradient background with white text

3. **Logo Box**: `w-14 h-14 rounded-xl` with light gray background

4. **Typography**:
   - Title: `text-3xl md:text-4xl` with Nohemi font
   - Description: `text-base font-mono` with opacity

5. **Features List**:
   - Pro variant: 2-column grid on desktop
   - Starter variant: Vertical stack
   - Checkmark icons with rounded-full containers

6. **Price Display**: `text-4xl font-bold` with monospace label

## Primary CTA Button Component

**Location**: `src/components/services/website/PricingAndAddons.tsx`

### Component Code

```tsx
// --- SHAPES FOR THE BUTTON ---
const CornerShape = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 48" className={className} style={{ display: 'block' }}>
        <path d="M0 0h5.63c7.808 0 13.536 7.337 11.642 14.91l-6.09 24.359A11.527 11.527 0 0 1 0 48V0Z" fill="currentColor" />
    </svg>
);

const IconBlobShape = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 48" className={className} style={{ display: 'block' }}>
        <path fill="currentColor" d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z" />
    </svg>
);

const ArrowIcon = ({ color = "currentColor", className = "" }: { color?: string; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 10" fill="none" className={className}>
        <path fill={color} d="M7.703 5.8H.398V4.6h7.305l-3.36-3.36.855-.84 4.8 4.8-4.8 4.8-.855-.84 3.36-3.36Z" />
    </svg>
);

// --- PRIMARY CTA BUTTON COMPONENT ---
const PricingCTAButton = ({ text, isDarkBg = false }: { text: string, isDarkBg?: boolean }) => (
    <button className="group relative inline-flex items-center text-left cursor-pointer focus:outline-none w-full">
        <span className={`
            relative flex items-center h-12 pl-5 pr-2 mr-4 flex-grow
            rounded-l-xl
            font-mono text-sm uppercase tracking-normal
            transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${isDarkBg
                ? 'bg-white text-[#1a1512] group-hover:bg-[#ff5501] group-hover:text-white'
                : 'bg-[#1a1512] text-white group-hover:bg-[#ff5501]'
            }
        `}>
            <span className="z-10 relative font-bold tracking-wider">{text}</span>
            <div className={`
                absolute top-0 right-[-16px] bottom-0 w-[18px] h-12
                transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isDarkBg
                    ? 'text-white group-hover:text-[#ff5501]'
                    : 'text-[#1a1512] group-hover:text-[#ff5501]'
                }
            `}>
                <CornerShape className="w-full h-full" />
            </div>
        </span>
        <i className="
            relative block w-[51px] h-12 
            transform-gpu
            transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
        ">
            <div className={`
                absolute inset-0 z-0 
                transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isDarkBg
                    ? 'text-white group-hover:text-[#ff5501]'
                    : 'text-[#1a1512] group-hover:text-[#ff5501]'
                }
            `}>
                <IconBlobShape className="w-full h-full" />
            </div>
            <span className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
                <span className="
                    absolute flex items-center justify-center w-full h-full
                    transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                    translate-x-0 group-hover:translate-x-[150%]
                ">
                    <ArrowIcon color={isDarkBg ? "#1a1512" : "#FFFFFF"} className="w-5 h-5" />
                </span>
                <span className="
                    absolute flex items-center justify-center w-full h-full
                    transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                    -translate-x-[150%] group-hover:translate-x-0
                ">
                    <ArrowIcon color="#FFFFFF" className="w-5 h-5" />
                </span>
            </span>
        </i>
    </button>
);
```

### Key Design Patterns

1. **Button Structure**:
   - Two-part design: text section + icon blob
   - Full width: `w-full`
   - Height: `h-12` (3rem / 48px)

2. **Text Section**:
   - `rounded-l-xl` - Left side rounded
   - `pl-5 pr-2 mr-4` - Padding and margin
   - `font-mono text-sm uppercase` - Monospace, small, uppercase
   - `font-bold tracking-wider` - Bold text with wider letter spacing

3. **Corner Shape**:
   - Connects text section to icon blob
   - Positioned absolutely with `right-[-16px]`
   - Width: `w-[18px]`, Height: `h-12`

4. **Icon Blob**:
   - Width: `w-[51px]`, Height: `h-12`
   - Contains animated arrow icon
   - Uses `transform-gpu` for performance

5. **Hover States**:
   - Background changes to `#ff5501` (orange)
   - Arrow icon slides from dark/white to white
   - Smooth transitions: `duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]`

6. **Variants**:
   - **Light Background** (`isDarkBg={false}`): Dark button (`bg-[#1a1512]`) with white text
   - **Dark Background** (`isDarkBg={true}`): White button (`bg-white`) with dark text

7. **Accessibility**:
   - `focus:outline-none` - Custom focus handling
   - `cursor-pointer` - Pointer cursor
   - Semantic button element
