import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { About } from "@/components/About";
import { summary } from "@/lib/content";

describe("About", () => {
  it("renders the heading and summary copy from content.ts", () => {
    render(<About />);

    expect(
      screen.getByRole("heading", { level: 2, name: /what i do/i })
    ).toBeInTheDocument();

    expect(screen.getByText(summary)).toBeInTheDocument();
  });
});
