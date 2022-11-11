/**
 * 正则效验手机号
 */

export function validateMobile(phone) {
	const reg = /^1[3-9]\d{9}$/
	return reg.test(phone);
}
module.exports = {
	validateMobile: validateMobile
};
