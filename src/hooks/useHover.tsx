import { useEffect, useRef, useState } from "react";

function useHover() {
  const [hovered, setHovered] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);

  function onEnter() {
    setHovered(true);
  }

  function onLeave() {
    setHovered(false);
  }

  useEffect(() => {
    if (ref) {
      ref.current!.addEventListener("mouseenter", onEnter);
      ref.current!.addEventListener("mouseleave", onLeave);
    }

    return () => {
      ref.current?.removeEventListener("mouseenter", onEnter);
      ref.current?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return [hovered, ref];
}

export default useHover;
