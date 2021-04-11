import {GEN_PREFIX} from "../index";

/**
 * Validates that the gen starts with the required prefix
 * @param {string} gen
 * @return {*}
 */
export default (gen) => {
  return gen.startsWith(GEN_PREFIX);
}