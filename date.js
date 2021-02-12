/**
 * Module to manage dates
 *
 * Author: Elia Contini <https://elia.contini.page>
 *
 */

/**
 * Check if the input in a string that represents a unix timestamp (milliseconds).
 * The regex checks if the string contains only numbers
 *
 * @param {string} input - the string to be checked
 *
 * @returns {boolean} true if it is timestamp, false otherwise
 */
const isDateValue = (input) => {
    return /^\d+$/gi.test(input);
};

/**
 * Check if a date object is valid
 *
 * @param {Date} date - the date object to validate
 *
 * @returns {boolean} true if it is valid, false otherwise
 */
const isValid = (date) => {
    // https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
    //
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
    return !Number.isNaN(date.getTime());
};

/**
 * Parse a route param
 *
 * @param {string} input - It can be a unix timestamp (milliseconds) or a
 *        string that can be successfully parsed by new Date(input)
 *
 * @returns {number|string}
 */
const parseRouteParam = (input) => {
    if (isDateValue(input) === true) {
        return parseInt(input);
    }

    return input;
};

const today = () => {
    const today = new Date();

    return new Date(
        Date.UTC(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            0,
            0,
            0
        )
    );
};

exports.isValid = isValid;
exports.parseRouteParam = parseRouteParam;
exports.today = today;
