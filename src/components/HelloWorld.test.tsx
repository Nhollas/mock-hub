import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { HelloWorld } from "./HelloWorld";
import { useState } from "react";
import Content from "./Content";

jest.mock("./Content.tsx", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedContent = Content as jest.Mock;

it("We can mock components mid test.", () => {
  render(<HelloWorld />);

  // Initial content mock.
  mockedContent.mockImplementation(() => {
    // Returning function here doesn't work..
    function MockContent() {
      const [state] = useState(1);
      return <p>Mocked Content {state}</p>;
    }

    // Must be returned like this...
    return <MockContent />;
  });

  // Click the button to show the header. (This will render the Content component)
  const button = screen.getByText("Show Header");
  fireEvent.click(button);

  // The header should be visible with our initial mocked content.
  expect(screen.getByText("Mocked Content 1")).toBeInTheDocument();

  // Click the button to hide the header.
  const hideButton = screen.getByText("Hide Header");
  fireEvent.click(hideButton);

  // Change the mock to return different content.
  mockedContent.mockImplementation(() => {
    // Returning function here doesn't work..
    function MockContent() {
      const [state] = useState(2);
      return <p>Mocked Content {state}</p>;
    }

    // Must be returned like this...
    return <MockContent />;
  });

  const button2 = screen.getByText("Show Header");

  // Re-render the component
  fireEvent.click(button2);

  // The header should be visible with our second mocked content.
  expect(screen.getByText("Mocked Content 2")).toBeInTheDocument();
});
