/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
	clearMocks: true,
	verbose: true,
	projects: [
		"<rootDir>/jest.main.config.mjs",
		"<rootDir>/jest.renderer.config.mjs",
	],
};

export default config;
