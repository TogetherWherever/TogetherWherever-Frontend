import { useState, useLayoutEffect, useRef, ReactNode } from "react";

interface VerticalLinePropsInterface {
  className?: string;
  children?: ReactNode;
  position?: string;
}

function VerticalLineWrapper({ className, children }: VerticalLinePropsInterface) {
  const [lineHeight, setLineHeight] = useState(0);
  const wrapperHeight = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (wrapperHeight.current) {
        const wrapper = wrapperHeight.current;
        const lastChild = wrapper.lastChild as HTMLElement;

        if (lastChild) {
          setLineHeight(wrapper.clientHeight - lastChild.clientHeight);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [children]);

  return (
    <section
      ref={wrapperHeight}
      className={`relative w-full mx-auto my-8 px-4 ${className}`}
    >
      {/* Center the line instead of keeping it on the left */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] bg-red"
        style={{ height: `${lineHeight}px` }}
      ></div>
      {children}
    </section>
  );
}

function VerticalLineContent({ children, className, position }: VerticalLinePropsInterface) {
  return (
    <aside className={`relative my-8 pl-4 md:pl-0 ${className}`}>
      {/* Center the blue dots */}
      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></span>
      <div
        className={`relative -top-2 w-1/2 md:px-8 ${
          position === "left" ? "md:text-right" : "md:text-left md:ml-auto"
        }`}
      >
        {children}
      </div>
    </aside>
  );
}

export { VerticalLineWrapper, VerticalLineContent };
