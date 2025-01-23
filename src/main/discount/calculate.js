import getDiscount from "./getDiscount";

const calculatePriceWithDiscount = (originalPrice) =>
	originalPrice * (1 - getDiscount());

export { calculatePriceWithDiscount };
