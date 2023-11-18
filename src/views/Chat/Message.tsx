import React, { PropsWithChildren, useEffect, useState } from "react";
import { MessageBubble } from "../../components/MessageBubble";
import classNames from "classnames";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "../../components/Avatar/Avatar";

interface MessageContainerProps extends PropsWithChildren {
  isSelf?: boolean;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  isSelf = false,
  children,
}) => (
  <div
    className={classNames("flex", "flex-row", "py-2", {
      "justify-end": isSelf,
      "justify-start": !isSelf,
    })}
  >
    {children}
  </div>
);

interface MessageProps extends PropsWithChildren {
  timestamp?: Date;
  isSelf?: boolean;
  userName?: string;
  isTyping?: boolean;
}

export const Message: React.FC<MessageProps> = ({
  timestamp,
  children,
  userName = "",
  isSelf = false,
  isTyping = false,
}) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (timestamp !== undefined) {
      setTime(formatDistanceToNow(timestamp, { addSuffix: true }));

      const timer = setInterval(() => {
        setTime(formatDistanceToNow(timestamp, { addSuffix: true }));
      }, 30000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timestamp]);

  const avatar = (
    <div className="flex flex-col px-2 justify-end py-1.5">
      <Avatar
        src={
          isSelf
            ? "https://1.gravatar.com/avatar/7cabefba56d36144f9c5dbeed84b533a97c9af7eaad919f17416f5ceff69574e?size=256"
            : "/robot.png"
        }
      />
    </div>
  );

  return (
    <MessageContainer isSelf={isSelf}>
      {!isSelf && avatar}
      <div
        className={classNames("flex", "flex-col", {
          "items-end": isSelf,
          "items-start": !isSelf,
        })}
      >
        <MessageBubble isSelf={isSelf} isTyping={isTyping}>
          {children}
        </MessageBubble>
        <div className="py-1">
          <div
            className={classNames("text-xs", "text-neutral-400", "font-bold", {
              "text-end": isSelf,
            })}
          >
            {userName}
          </div>
          <div className="text-xs text-neutral-400">{time}</div>
        </div>
      </div>
      {isSelf && avatar}
    </MessageContainer>
  );
};
