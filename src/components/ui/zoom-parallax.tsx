'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);
	const rafRef = useRef<number | null>(null);

	// Throttled scroll handler using RAF
	const handleScroll = useCallback(() => {
		if (rafRef.current) return;

		rafRef.current = requestAnimationFrame(() => {
			if (!container.current) {
				rafRef.current = null;
				return;
			}

			const rect = container.current.getBoundingClientRect();
			const containerHeight = rect.height;
			const windowHeight = window.innerHeight;

			// Calculate progress: 0 at start, 1 at end
			const scrollEnd = containerHeight - windowHeight;
			const currentScroll = -rect.top;

			const newProgress = Math.max(0, Math.min(1, currentScroll / scrollEnd));

			// Only update if change is significant
			if (Math.abs(newProgress - progress) > 0.003) {
				setProgress(newProgress);
			}

			rafRef.current = null;
		});
	}, [progress]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, [handleScroll]);

	// ORIGINAL scale values restored - center image (index 0) gets full 4x zoom
	const getScale = (index: number) => {
		const baseScales = [4, 5, 6, 5, 6, 8, 9]; // Original values
		const targetScale = baseScales[index % baseScales.length];
		return 1 + (targetScale - 1) * progress;
	};

	// Get image URL - center image (index 0) keeps full quality, others get reduced
	const getImageUrl = (src: string, index: number) => {
		// Index 0 = center image, keep original 4K quality
		if (index === 0) {
			return src;
		}
		// Other images - reduce size for performance (w=800 instead of w=1080)
		if (src.includes('unsplash.com')) {
			return src.replace('w=1080', 'w=600');
		}
		return src;
	};

	// Position configurations for each image
	const positions: React.CSSProperties[] = [
		{}, // index 0 - center (main image, full quality)
		{ top: '-30vh', left: '5vw', height: '30vh', width: '35vw' },
		{ top: '-10vh', left: '-25vw', height: '45vh', width: '20vw' },
		{ left: '27.5vw', height: '25vh', width: '25vw' },
		{ top: '27.5vh', left: '5vw', height: '25vh', width: '20vw' },
		{ top: '27.5vh', left: '-22.5vw', height: '25vh', width: '30vw' },
		{ top: '22.5vh', left: '25vw', height: '15vh', width: '15vw' },
	];

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 h-screen overflow-hidden">
				{images.map(({ src, alt }, index) => {
					const scale = getScale(index);
					const posStyle = positions[index] || {};
					const imageSrc = getImageUrl(src, index);

					return (
						<div
							key={index}
							className="absolute top-0 flex h-full w-full items-center justify-center"
							style={{
								transform: `scale(${scale})`,
								willChange: 'transform',
							}}
						>
							<div
								className="relative overflow-hidden rounded-2xl shadow-2xl"
								style={{
									height: posStyle.height || '25vh',
									width: posStyle.width || '25vw',
									top: posStyle.top,
									left: posStyle.left,
									position: 'relative',
									transform: 'translateZ(0)',
									backfaceVisibility: 'hidden',
								}}
							>
								<img
									src={imageSrc || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									className="h-full w-full object-cover"
									loading={index === 0 ? 'eager' : 'lazy'}
									decoding="async"
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
