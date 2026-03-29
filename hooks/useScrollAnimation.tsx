// FIX: Import React alongside hooks to use React types like React.RefObject.
import React, { useEffect, useRef, useState } from "react";

// FIX: Make the hook generic to support different element types.
interface ScrollAnimationHook<T extends HTMLElement> {
  ref: React.RefObject<T>;
  isVisible: boolean;
}

const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
): ScrollAnimationHook<T> => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
        ...options,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isVisible };
};

export default useScrollAnimation;
