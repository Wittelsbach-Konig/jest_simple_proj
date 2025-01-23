//privateFunc.js
function toRadians(degrees) {
	return degrees * (Math.PI / 180);
}

export const _test = { toRadians }; // Экспорт только для тестов

export function cos(input) {
	const radians = toRadians(input);
	return Math.cos(radians);
}
