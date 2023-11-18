import classNames from "classnames";
import React, { useLayoutEffect, useRef } from "react";

interface GrowingTextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  minHeight?: number;
  maxHeight?: number;
}

export const GrowingTextarea: React.FC<GrowingTextareaProps> = ({
  value,
  minHeight = 0,
  maxHeight = Infinity,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useLayoutEffect(() => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = "0px";

      const newHeight = Math.min(
        Math.max(textareaRef.current.scrollHeight, minHeight),
        maxHeight,
      );
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [textareaRef, value, minHeight, maxHeight]);

  return (
    <textarea
      className={classNames(
        "flex-initial",
        "grow",
        "outline-none",
        "p-4",
        "rounded-s-lg",
        "resize-none",
      )}
      value={value}
      ref={textareaRef}
      {...props}
    />
  );
};
