const calculate = (a, b, callback) => {
	return callback(a, b);
};

it("mock callback function", () => {
	const mockCallback = jest.fn((a, b) => a + b);
	const result = calculate(2, 3, mockCallback);

	expect(mockCallback).toHaveBeenCalled();
	expect(mockCallback).toHaveBeenCalledWith(2, 3);
	expect(result).toBe(5);
});
