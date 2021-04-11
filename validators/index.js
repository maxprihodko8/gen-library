import letters from "./letters";
import prefix from "./prefix";

/**
 * Validates that the string is valid gen
 * @param gen
 * @return {boolean|*}
 */
export default (gen) => {
  return prefix(gen)
    && letters(gen);
}