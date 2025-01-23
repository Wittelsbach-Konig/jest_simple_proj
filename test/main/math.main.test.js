//math.main.test.js
import { add, subtract } from "../../src/main/math";

describe("Math test", () => {
	it("func add(2, 3) should return 5", () => {
		expect(add(2, 3)).toBe(5);
	});
	it("func subtract(5,2) should return 3", () => {
		expect(subtract(5, 2)).toBe(3);
	});
});
