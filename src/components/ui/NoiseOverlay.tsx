'use client';

import { useEffect, useRef, memo } from 'react';

let cachedUrl: string | null = null;

function getNoiseUrl(): string {
    if (cachedUrl) return cachedUrl;
    if (typeof document === 'undefined') return '';
    const canvas = document.createElement('canvas');
    const size = 128;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    const imageData = ctx.createImageData(size, size);
    for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    cachedUrl = canvas.toDataURL('image/png');
    return cachedUrl;
}

export const NoiseOverlay = memo(function NoiseOverlay({
    opacity = 0.02,
    className = ''
}: {
    opacity?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.style.backgroundImage = `url(${getNoiseUrl()})`;
        }
    }, []);

    return (
        <div
            ref={ref}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ opacity, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }}
        />
    );
});
