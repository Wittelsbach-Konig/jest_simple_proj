function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function fetchData() {
	await sleep(2000);
	return "Hello, from async function!";
}
