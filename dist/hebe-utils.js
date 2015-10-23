var hebeutils = (function () {
    var private_var;

    function private_function() {
    }

    function setupExtensionFunctions() {
        
        // obj.notNullOrEmpty
        //        if (typeof Object.prototype.notNullOrEmpty != 'function') {
        //            Object.prototype.notNullOrEmpty = function () {
        //                return (this != null && this.length > 0);
        //            };
        //        }
        // str.notNullOrEmpty
        if (typeof String.prototype.notNullOrEmpty != 'function') {
            String.prototype.notNullOrEmpty = function () {
                return (this != null && this.length > 0);
            };
        }
        //console.log('Setting up extension functions');
        // str.trimString(string)
        if (typeof String.prototype.trimString != 'function') {
            String.prototype.trimString = function (str) {
                var tmp = this;
                tmp = this.ensureNoStartingString(str);
                tmp = this.ensureNoEndingString(str);
                return tmp;
            };
        }
        // str.ensureNoStartingString
        if (typeof String.prototype.ensureNoStartingString != 'function') {
            String.prototype.ensureNoStartingString = function (str) {
                if (this.startsWith(str)) {
                    return this.substr(str.length);
                } else {
                    return this;
                }
            };
        }
        // str.ensureStartingString
        if (typeof String.prototype.ensureStartingString != 'function') {
            String.prototype.ensureStartingString = function (str) {
                if (!this.startsWith(str)) {
                    return str + this;
                } else {
                    return this;
                }
            };
        }
        // str.startsWith
        if (typeof String.prototype.startsWith != 'function') {
            String.prototype.startsWith = function (str) {
                return this.slice(0, str.length) == str;
            };
        }
        // str.endsWith
        if (typeof String.prototype.endsWith != 'function') {
            String.prototype.endsWith = function (str) {
                return this.slice(-str.length) == str;
            };
        }
        // str.ensureNoEndingString
        if (typeof String.prototype.ensureNoEndingString != 'function') {
            String.prototype.ensureNoEndingString = function (str) {
                if (this.endsWith(str)) {
                    return this.substr(0, this.length - str.length);
                } else {
                    return this;
                }
            };
        }
        // str.toPrecisionDigits
        if (typeof Number.prototype.toPrecisionDigits != 'function') {
            Number.prototype.toPrecisionDigits = function (len) {
                var str = this.toString();
                // figure out how many decimal places we want
                var numberOfDecimalPlaces = (
                    str.indexOf('.') === -1 ?
                        0 :
                        (3 - (str.indexOf('.')))
                    );
                var rounded = hebeutils.evenRound(this, numberOfDecimalPlaces);
                return rounded;
            };
        }
        // str.fixChars
        if (typeof String.prototype.fixChars != 'function') {
            String.prototype.fixChars = function (str) {
                //todo: replace any dodgy characters here
                return this.replace('ÂŁ', '£').replace('__', "'");
            };
        }

        // str.cleanDateFormats
        if (typeof String.prototype.cleanDateFormats != 'function') {
            String.prototype.cleanDateFormats = function () {
                var sanitizedStr = this;
                sanitizedStr = sanitizedStr.replace('T00:00:00', '');
                return sanitizedStr;
            };
        }
        
        // str.replaceAll
        if (typeof String.prototype.replaceAll != 'function') {
            String.prototype.replaceAll = function (str1, str2, ignore) {
                return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
            }
        }    
            
        // str.cleanText
        if (typeof String.prototype.cleanText != 'function') {
            String.prototype.cleanText = function () {
                return this.replaceAll('Licenc', 'Licens', true);
            };
        }
        
        // str.isValidEmail
        if (typeof String.prototype.isValidEmail != 'function') {
            String.prototype.isValidEmail = function () {
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                return re.test(this);
            };
        }
        
        // str.extractPostcode
        if (typeof String.prototype.extractPostcode != 'function') {
            String.prototype.extractPostcode = function () {
                try {
                    // var matches = address.match(new RegExp("^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$"));
                    var matches = this.match(new RegExp("(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))"));
                    if (matches != null && matches.length > 0) {
                        return matches[0];
                    }
                }
                catch (err) {
                    return null;
                }
                return null;
            }
        }

        // str.isValidPostcode
        if (typeof String.prototype.isValidPostcode != 'function') {
            String.prototype.isValidPostcode = function () {
                try {
                    var matches = this.match(new RegExp("^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$"));
                    if (matches != null && matches.length > 0) {
                        return true;
                    }
                }
                catch (err) {
                    return false;
                }
                return false;
            }
        }

        // str.underscorize
        if (typeof String.prototype.underscorize != 'function') {
            String.prototype.underscorize = function () {
                return this.replace(/[A-Z]/g, function (char, index) {
                    return (index !== 0 ? '_' : '') + char.toLowerCase();
                });
            };
        }

        // str.dasherize
        if (typeof String.prototype.dasherize != 'function') {
            String.prototype.dasherize = function () {
                return this.replace(/[A-Z]/g, function (char, index) {
                    return (index !== 0 ? '-' : '') + char.toLowerCase();
                });
            };
        }
        // str.capitalizeFirstLetter
        if (typeof String.prototype.capitalizeFirstLetter != 'function') {
            String.prototype.capitalizeFirstLetter = function () {
                return this.charAt(0).toUpperCase() + this.slice(1);
            };
        }

        // str.capitalizeEachWord
        if (typeof String.prototype.capitalizeEachWord != 'function') {
            String.prototype.capitalizeEachWord = function () {
                var index, word, words, _i, _len;
                words = this.split(" ");
                for (index = _i = 0, _len = words.length; _i < _len; index = ++_i) {
                    word = words[index].charAt(0).toUpperCase();
                    words[index] = word + words[index].substr(1);
                }
                return words.join(" ");
            };
        }
    };

    return {
        init: function () {
            setupExtensionFunctions();
        },
        random: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        isArray: function (target) {
            return (Object.prototype.toString.call(target) === '[object Array]');
        },
        parseNumber: function (string) {
            var str = string.toString();
            var number = str.replace(/[^0-9\.]+/g, '');
            return parseFloat(number);
        },
        evenRound: function (num, decimalPlaces) {
            var d = decimalPlaces || 0;
            var m = Math.pow(10, d);
            var n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
            var i = Math.floor(n), f = n - i;
            var e = 1e-8; // Allow for rounding errors in f
            var r = (f > 0.5 - e && f < 0.5 + e) ?
                ((i % 2 == 0) ? i : i + 1) : Math.round(n);
            return d ? r / m : r;
        },
        guid: function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        },

        shortcode: {
            _alphabet: '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_',
            _base: null,
            _initialized: false,

            init: function () {
                this._base = this._alphabet.length;
                this._initialized = true;
            },

            encodeFromNumber: function (num) {
                if (!this._initialized) {
                    this.init();
                }
                var str = '';
                while (num > 0) {
                    str = this._alphabet.charAt(num % this._base) + str;
                    num = Math.floor(num / this._base);
                }
                return str;
            },

            decodeToNumber: function (str) {
                if (!this._initialized) {
                    this.init();
                }
                var num = 0;
                for (var i = 0; i < str.length; i++) {
                    num = num * this._base + this._alphabet.indexOf(str.charAt(i));
                }
                return num;
            },

            randomString: function (length) {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }
        },

        // Create Base64 Object
        Base64: { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = hebeutils.Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = hebeutils.Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

    }
})();


hebeutils.init();

if (typeof module !== "undefined") {
    module.exports = hebeutils;
}