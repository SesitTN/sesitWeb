import { useEffect, useRef, VideoHTMLAttributes } from "react";

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  /** How far outside the viewport to start loading. Default "200px" for bg videos, "0px" for content videos. */
  rootMargin?: string;
}

/**
 * LazyVideo — loads and plays a video only when it enters the viewport.
 * - Sets src="" until the element is visible (prevents upfront network requests)
 * - Plays on enter, pauses on exit
 * - Restores autoPlay behaviour once src is set
 */
const LazyVideo = ({
  src,
  rootMargin = "200px",
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  ...rest
}: LazyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // First time: set src and start loading
          if (!loadedRef.current) {
            loadedRef.current = true;
            video.src = src;
            video.load();
          }
          if (autoPlay) {
            video.play().catch(() => {
              // Autoplay may be blocked by browser — silently ignore
            });
          }
        } else {
          // Pause when off-screen to save CPU/memory
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { rootMargin }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, rootMargin, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      {...rest}
    />
  );
};

export default LazyVideo;
