import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { HelloWorld } from "./HelloWorld";
import { Content } from "./Content";
import { useState } from "react";

jest.mock("./Content.tsx", () => ({
  Content: jest.fn(),
}));

it("We can mock components mid test.", () => {
  // Initial content mock.
  (Content as jest.Mock).mockImplementation(() => {
    // Returning function here doesn't work..
    function MockContent() {
      const [state, setState] = useState(1);
      return (
        <div>
          <p>Mocked Content 1</p>
          <button onClick={() => setState(2)}>Update State</button>
          <p>Current State: {state}</p>
        </div>
      );
    }

    // Must be returned like this...
    return <MockContent />;
  });

  render(<HelloWorld />);

  // Click the button to show the header.
  const button = screen.getByText("Show Header");
  fireEvent.click(button);

  // The header should be visible with our initial mocked content.
  expect(screen.getByText("Mocked Content 1")).toBeInTheDocument();

  // Click the button to hide the header.
  const hideButton = screen.getByText("Hide Header");
  fireEvent.click(hideButton);

  // Change the mock to return different content.
  (Content as jest.Mock).mockImplementation(() => <div>Mocked Content 2</div>);

  const button2 = screen.getByText("Show Header");

  // Re-render the component
  fireEvent.click(button2);

  // The header should be visible with our second mocked content.
  expect(screen.getByText("Mocked Content 2")).toBeInTheDocument();
});
