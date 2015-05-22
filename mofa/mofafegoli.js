(function (root, factory) {
	// UMD
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.mofafegoli = factory();
	}
}(this, function () {
	'use strict';

	// data

	var vowelsStr = 'aeiou';
	var consonantsStr = 'bcdfghjklmnprstvwxyz';
	var vowels = vowelsStr.split('');
	var consonants = consonantsStr.split('');

	// utils

	var clean = function (str) {
		return String(str).toLowerCase().replace(/[^a-zA-Z0-9]+/g, '');
	};

	var pad = function (num) {
		if (num >= 10) {
			return num;
		}
		if (num === 0) {
			return '00';
		}
		return '0' + num;
	};

	var syllablesRegExp = '^([' + consonantsStr + '][' + vowelsStr + '])+$';
	var isValidSyllables = function (str) {
		return !!str.match(syllablesRegExp);
	};

	var convertNumberToSyllables = function (str) {
		var res = '';
		str = '' + parseInt(str, 10);
		if (str.length % 2 !== 0) {
			str = '0' + str;
		}
		var digitsPairs = str.match(/../g);
		if (digitsPairs) {
			digitsPairs.forEach(function (digitsPair) {
				var number = parseInt(digitsPair, 10);
				res += consonants[Math.floor(number / vowels.length)];
				res += vowels[number % vowels.length];
			});
		}
		return res;
	};

	var convertSyllablesToNumber = function (str) {
		var res = '';
		var consonantValue;
		str.split('').forEach(function (letter, i) {
			// consonant
			if (i % 2 === 0) {
				consonantValue = consonants.indexOf(letter) * vowels.length;
			// vowels
			} else {
				res += pad(consonantValue + vowels.indexOf(letter));
			}
		});
		return parseInt(res, 10);
	};

	var convert = function (str) {
		str = clean(str);
		if (!str) {
			return '';
		}
		if (!isNaN(str)) {
			return convertNumberToSyllables(str);
		}
		if (isValidSyllables(str)) {
			return convertSyllablesToNumber(str);
		}
		// invalid
		return '';
	};

	return {
		consonants: consonants,
		convert: convert,
		vowels: vowels
	};
}));
