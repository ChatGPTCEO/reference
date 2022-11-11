export function numberToWan(value) {
	let unit = '';
	var k = 10000,
		sizes = ['', '��', '��', '����'],
		i;
	if (value < k) {
		value = value;
	} else {
		i = Math.floor(Math.log(value) / Math.log(k));
		value = ((value / Math.pow(k, i))).toFixed(2);
		unit = sizes[i];
	}
	return value + unit;
}

module.exports = {
	numberToWan: numberToWan
};
