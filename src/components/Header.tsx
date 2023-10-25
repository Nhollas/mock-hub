import { Dispatch, SetStateAction } from "react";
import Content from "./Content";

export const Header = ({
  setShowHeader,
}: {
  setShowHeader: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <header>
      <h1>Header</h1>
      <Content />
      <button onClick={() => setShowHeader(false)}>Hide Header</button>
    </header>
  );
};
