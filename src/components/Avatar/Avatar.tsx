import classNames from "classnames";
import React from "react";

interface AvatarProps {
  src: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div
      className={classNames(
        "inline-block",
        "rounded-full",
        "shadow-md",
        "overflow-hidden",
        "h-8",
        "w-8",
      )}
    >
      <img src={src} />
    </div>
  );
};
