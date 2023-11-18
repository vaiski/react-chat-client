import React from "react";
import { TypingIndicator } from "../../components/TypingIndicator";
import { Message } from "./Message";
import { parseISO } from "date-fns";
import { ScrollView } from "../../components/ScrollView";

interface MessagesProps {
  userId: string;
  messages?: ReadonlyArray<any>;
  othersTyping?: boolean;
}

export const Messages: React.FC<MessagesProps> = ({
  userId,
  othersTyping = false,
  messages = [],
}) => {
  return (
    <ScrollView scrollToBottomOffset={100}>
      {messages.map((message) => (
        <Message
          timestamp={parseISO(message.ts)}
          isSelf={message.usr === userId}
          userName={message.dn}
          key={message.id}
        >
          {message ? (
            message.msg
              .split("\n\n")
              .map((p: string, i: number) => <p key={i}>{p}</p>)
          ) : (
            <></>
          )}
        </Message>
      ))}
      {othersTyping && (
        <Message isTyping>
          <TypingIndicator />
        </Message>
      )}
    </ScrollView>
  );
};
