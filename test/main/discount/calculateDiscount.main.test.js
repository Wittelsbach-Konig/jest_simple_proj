import { calculatePriceWithDiscount } from "../../../src/main/discount/calculate";
import getDiscount from "../../../src/main/discount/getDiscount";

jest.mock("../../../src/main/discount/getDiscount");

describe("Discount test", () => {
	it("Скидка 50 процентов", () => {
		getDiscount.mockReturnValue(0.5);
		expect(calculatePriceWithDiscount(100)).toBe(50);
	});
});
