import { toDegrees, toRadians } from "./src/geodesicToCartesian.js";

function main() {
	console.log(toRadians(180));
	console.log(toDegrees(Math.PI));
}

main();
