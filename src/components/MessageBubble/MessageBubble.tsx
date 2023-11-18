import classNames from "classnames";
import React, { PropsWithChildren } from "react";

interface MessageBubbleProps extends PropsWithChildren {
  isSelf?: boolean;
  isTyping?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  isSelf,
  isTyping,
  children,
}) => (
  <div
    className={classNames("shadow-md", "px-4", "py-3", "max-w-prose", {
      "bg-white": !isSelf,
      "bg-sky-300": isSelf,
      "rounded-ss-3xl": isSelf || !isTyping,
      "rounded-se-3xl": !isSelf || !isTyping,
      "rounded-es-3xl": isSelf || isTyping,
      "rounded-ee-3xl": !isSelf || isTyping,
    })}
  >
    {children}
  </div>
);
