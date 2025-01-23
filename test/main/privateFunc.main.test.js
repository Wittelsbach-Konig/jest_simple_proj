import { cos, _test } from "../../src/main/privateFunc";

describe("cos test", () => {
	it("cos(180) should return -1", () => {
		expect(cos(180)).toBe(-1);
	});
	it("private toRadians(180) should return pi", () => {
		expect(_test.toRadians(180)).toBe(Math.PI);
	});
});
