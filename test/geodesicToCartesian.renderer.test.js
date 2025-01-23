import { toDegrees, toRadians } from "../src/renderer/geodesicToCartesian";

describe("geodesicToCartesian", () => {
	it("should convert degrees to radians", () => {
		expect(toDegrees(toRadians(180))).toBe(180);
	});
});
