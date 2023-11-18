import React, { memo, useEffect, useRef, useState } from "react";
import * as uuid from "uuid";
import { Messages } from "./Messages";
import { GrowingTextarea } from "../../components/GrowingTextarea";

interface ChatProps {
  userId: string;
  userName: string;
}

export const Chat: React.FC<ChatProps> = memo(({ userId, userName }) => {
  const [message, setMessage] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<Array<any>>([]);
  const [othersTyping, setOthersTyping] = useState<boolean>(false);

  const didUnmount = useRef(false);

  const ws = useRef<WebSocket>();

  const sendJsonMessage = (message: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  const onMessage = (evt: MessageEvent<any>) => {
    if (evt !== null) {
      console.log(evt);
      try {
        const event = JSON.parse(evt.data);

        if (event.type === "message") {
          setMessageHistory((prev) => prev.concat(event.payload));
        } else if (event.type === "typing") {
          setOthersTyping(true);
        } else if (event.type === "notTyping") {
          setOthersTyping(false);
        }
      } catch (err) {
        console.error("Error in message handling", err);
      }
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/");

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "join",
          payload: {
            room: uuid.v4(),
          },
        }),
      );
    };

    socket.onmessage = onMessage;
    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  const sendMessage = () => {
    if (message.length > 0 && ws.current?.readyState === WebSocket.OPEN) {
      sendJsonMessage({
        type: "message",
        payload: {
          id: uuid.v4(),
          dn: userName,
          usr: userId,
          msg: message,
          ts: new Date().toISOString(),
        },
      });

      setMessage("");
    }
  };

  const handleClickSendMessage: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    sendMessage();
  };

  const handleInput: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    evt,
  ) => {
    if (evt.key === "Enter" && !evt.shiftKey) {
      evt.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-h-screen w-full max-w-screen-lg mx-auto flex flex-col grow bg-chat">
      <Messages
        userId={userId}
        othersTyping={othersTyping}
        messages={messageHistory}
      />
      <div className="flex flex-row flex-initial p-4 pt-0">
        <div className="flex flex-row flex-initial grow bg-white shadow-lg rounded-lg">
          <GrowingTextarea
            value={message}
            maxHeight={100}
            onKeyUp={handleInput}
            onChange={(evt) => {
              setMessage(evt.currentTarget.value);
            }}
          />
          <button
            className="p-4 rounded-e-lg"
            onClick={handleClickSendMessage}
            disabled={
              ws.current?.readyState != WebSocket.OPEN && message.length > 0
            }
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
});
