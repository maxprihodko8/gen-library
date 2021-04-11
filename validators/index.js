import letters from "./letters.js";
import prefix from "./prefix.js";

/**
 * Validates that the string is valid gen
 * @param gen
 * @return {boolean|*}
 */
export default (gen) => {
  return prefix(gen)
    && letters(gen);
}