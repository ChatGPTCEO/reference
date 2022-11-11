export function groupArray(data, num) {

	let result = [];

	for (var i = 0; i < data.length; i += num) {

		result.push(data.slice(i, i + num));

	}

	return result;

}