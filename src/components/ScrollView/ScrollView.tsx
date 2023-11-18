import classNames from "classnames";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface ScrollViewProps extends PropsWithChildren {
  scrollToBottomOffset?: number;
}

export const ScrollView: React.FC<ScrollViewProps> = ({
  children,
  scrollToBottomOffset = 0,
}) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const onScroll = useCallback(() => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;

      if (scrollTop + clientHeight >= scrollHeight - scrollToBottomOffset) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    }
  }, [listRef, scrollToBottomOffset]);

  useEffect(() => {
    if (isAtBottom) {
      listEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [children, isAtBottom]);

  return (
    <div
      className={classNames(
        "overflow-y-auto",
        "flex",
        "flex-col",
        "basis-full",
        "px-4",
        "pt-4",
      )}
      ref={listRef}
      onScroll={onScroll}
    >
      {children}
      <div ref={listEndRef}></div>
    </div>
  );
};
