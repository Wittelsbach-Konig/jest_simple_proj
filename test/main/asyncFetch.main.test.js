import fetchData from "../../src/main/asyncFetch";

describe("asyncFetch test", () => {
	it("timeout = 1000 ms", async () => {
		const data = await fetchData();
		expect(data).toBe("Hello, from async function!");
	}, 1000);
	it("timeout = 3000 ms", async () => {
		const data = await fetchData();
		expect(data).toBe("Hello, from async function!");
	}, 3000);
});
