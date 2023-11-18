import React from "react";
import { Chat } from "./views/Chat";
import * as uuid from "uuid";

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const userName = "User" + Math.round(Math.random() * 100);
  return <Chat userId={uuid.v4()} userName={userName} />;
};
