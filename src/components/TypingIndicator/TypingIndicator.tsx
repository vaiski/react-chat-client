import classNames from "classnames";
import React from "react";

interface TypingDotProps {
  delay: string;
}

const TypingDot: React.FC<TypingDotProps> = ({ delay }) => (
  <span
    className={classNames(
      "inline-block",
      "w-2",
      "h-2",
      "m-0.5",
      "align-middle",
      "rounded-full",
      "bg-current",
      "animate-pulsate",
    )}
    style={{ animationDelay: delay }}
  />
);

export const TypingIndicator: React.FC<any> = () => (
  <span>
    <TypingDot delay="0s" />
    <TypingDot delay=".15s" />
    <TypingDot delay=".3s" />
  </span>
);
