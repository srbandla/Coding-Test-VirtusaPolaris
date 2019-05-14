/*Global Variables*/

/* Store Units ex. gold,iron */
const Units = {};

/* Store different types of currencies and their conversion rates */
const Currency = {};

/* All Valid Roman numerals,used keep track of used one. */
const romanNumerals = [ 'i', 'v', 'x', 'l', 'c', 'd', 'm' ];

/* Regular Expressions to Check Valid input */
const isValueRegEx = new RegExp(/^[a-z]+\s+is\s+[i|v|x|l|c|d|m]$/i);
const isCreditRegEx = new RegExp(/^([a-z\s]+)is\s+(\d+.?\d*)\s+credits$/i);
const HowMuchRegEx = new RegExp(/^how\s+much\s+is\s+([a-z\s]+)[?]$/i);
const HowManyRegEx = new RegExp(/^how\s+many\s+credits\s+is\s+([a-z\s]+)[?]$/i);

/* Regular expression to validate roman numeral */
const isValidRomanRegEx = new RegExp(
		/^m{0,3}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/);

/* Roman numerals and their decimal values */
const romanNumeralsVal = {
	i : 1,
	v : 5,
	x : 10,
	l : 50,
	c : 100,
	d : 500,
	m : 1000
};

/*
 * Use This function to convert inter-galaxy currency to it's value. Function
 * Works as follows,
 * 1)Convert inter-Galaxy currency array to respective roman
 * numeral,while converting use saved inter-galaxy currency for conversion.
 * 2)Check if constructed roman numeral is valid.
 * 3)Convert that roman numeral
 * to decimal number.
 */
function CurrencyToValue(CurrencyArr) {
	let RomanString = "";
	let answer = 0;
	for (var ite = 0; ite < CurrencyArr.length; ite++) {
		if (Currency[CurrencyArr[ite].toLowerCase()]) {
			RomanString += Currency[CurrencyArr[ite].toLowerCase()];
		} else if (Units[CurrencyArr[ite].toLowerCase()]) {
			console.log(CurrencyArr[ite] + " is not currency,it's a unit");
			return -1;
		} else {
			console.log("Unknown currency " + CurrencyArr[ite] + " queried");
			return -1;
		}
	}
	if (!isValidRomanRegEx.test(RomanString)) {
		console.log("Invalid amount " + CurrencyArr.join(" "));
		return -1;
	}
	const RomanDigits = [];
	RomanString.split("").forEach(function(e, i, arr) {
		RomanDigits.push(romanNumeralsVal[e]);
		if (romanNumeralsVal[e] < romanNumeralsVal[arr[i + 1]]) {
			RomanDigits[i] *= -1;
		}
	});
	answer = RomanDigits.reduce(function(sum, elt) {
		return sum + elt;
	});
	return answer;
}
/*
 * Public function to process inputs and to do inter-Galaxy currency
 * conversions.input is validated against regular expressions and if valid
 * respective input part is processes further.
 */
exports.Merchant = function(input) {
	let RegAns = null;
	RegAns = isValueRegEx.exec(input);
	if (RegAns !== null) {
		let partials = RegAns[0].split(/\s+/);
		if (!Currency[partials[0].toLowerCase()]) {
			let index = romanNumerals.indexOf(partials[2].toLowerCase());
			if (index > -1) {
				Currency[partials[0].toLowerCase()] = partials[2].toLowerCase();
				romanNumerals.splice(index, 1);
			} else {
				console.log(partials[2] + " is already assigned");
			}
		} else if (Currency[partials[0].toLowerCase()] !== romanNumeralsVal[partials[2]
				.toLowerCase()]) {
			console.log(partials[0] + " already has a conversion unit");
		}
		return;
	}
	RegAns = isCreditRegEx.exec(input);
	if (RegAns !== null) {
		let CreditVal = parseFloat(RegAns[2]);
		let partials = RegAns[1].trim();
		if (partials === "") {
			return console.log("Please enter any currency");
		}
		partials = partials.split(/\s+/);
		let unit = partials.pop();
		if (Currency[unit.toLowerCase()]) {
			return console.log(unit + " is currency,provide a Unit");
		}
		if (partials.length < 1) {
			return console.log("No Currency provided");
		}
		let value = CurrencyToValue(partials);
		if ((CreditVal / value) < 0.00001) {
			return console.log("Credit is too low");
		}
		if (value !== -1) {
			value = CreditVal / value;
			Units[unit.toLowerCase()] = value;
		} else {
			return console.log("Invalid Currency");
		}
		return;
	}
	RegAns = HowMuchRegEx.exec(input);
	if (RegAns !== null) {
		let partials = RegAns[1].trim();
		if (partials === "") {
			return console.log("Please enter any currency to convert");
		}
		partials = partials.split(/\s+/);
		let value = CurrencyToValue(partials);
		if (value !== -1) {
			return console.log(partials.join(" ") + " is " + value);
		} else {
			return console.log("Invalid Currency");
		}
	}
	RegAns = HowManyRegEx.exec(input);
	if (RegAns !== null) {
		let partials = RegAns[1].trim();
		if (partials === "") {
			return console.log("Please enter any currency");
		}
		partials = partials.split(/\s+/);
		let unit = partials.pop();
		if (!Units[unit.toLowerCase()]) {
			return console.log("No unit Provided");
		}
		if (partials.length < 1) {
			return console.log("No Currency provided");
		}
		let value = CurrencyToValue(partials);
		if (value !== -1) {
			value *= Units[unit.toLowerCase()];
			return console.log(RegAns[1].trim() + " is " + value + " Credits");
		} else {
			return console.log("Invalid Currency");
		}
	}
	return console.log("I have no idea what you are talking about");
};