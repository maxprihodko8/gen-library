import {GEN_PERMITTED_LETTERS} from '../index';

/**
 * Validates that the gen consists only of needed letters
 * @param {string} gen
 * @return {boolean}
 */
export default (gen) => {
  const letters = gen.split('');

  for (const letter of letters) {
    if (!GEN_PERMITTED_LETTERS.includes(letter)) {
      return false;
    }
  }

  return true;
}