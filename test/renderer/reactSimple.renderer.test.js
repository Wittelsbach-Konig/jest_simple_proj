//reactSimple.renderer.test.js
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { HelloWorld } from "../../src/renderer/helloWorld";

describe("Renderer process tests", () => {
	test("Renders the HelloWorld component", () => {
		render(<HelloWorld name='Electron' />);

		const heading = screen.getByText("Hello, Electron!");
		expect(heading).toBeInTheDocument();
	});
});
