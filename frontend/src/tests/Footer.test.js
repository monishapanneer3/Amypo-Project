import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../layout/Footer";

test("footer renders as a semantic footer element with required branding text", () => {
  render(<Footer />);
  const footerEl = screen.getByText(/EventSphere/i).closest("footer");
  expect(footerEl).toBeInTheDocument();
  expect(footerEl).toHaveTextContent(/conference management/i);
  expect(footerEl).toHaveTextContent(/EventSphere/i);
});
