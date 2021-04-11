import letters from "./letters.js";
import prefix from "./prefix.js";
import isString from "./string";

/**
 * Validates that the string is valid gen
 * @param {string} gen
 * @return {boolean}
 */
export default (gen) => {
  return isString(gen)
    && prefix(gen)
    && letters(gen);
}