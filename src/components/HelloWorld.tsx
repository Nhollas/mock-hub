import { useState } from "react";
import { Header } from "./Header";

export const HelloWorld = () => {
  const [showHeader, setShowHeader] = useState(false);

  return showHeader ? (
    <Header setShowHeader={setShowHeader} />
  ) : (
    <button onClick={() => setShowHeader(true)}>Show Header</button>
  );
};
