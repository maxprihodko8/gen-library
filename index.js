import isValidGen from "./validators/index.js";

export const GEN_PREFIX = 'AAAAAAAAAAA';
export const GEN_PERMITTED_LETTERS = [
  'G',
  'C',
  'A',
  'T',
];

/**
 * @class Gen
 * Module which helps to check that the gen is in stream and has validation if the string is gen
 */
export default class Gen {
  /**
   * Constructor of Gen
   * @param {GenStrategy} strategy the strategy, on which the gen is found and saved
   */
  constructor(strategy) {
    if (!strategy) {
      throw new Error('Please set the strategy');
    }

    this._strategy = strategy;
  }

  /**
   * Checks if the input string is the gen
   * @param {string} gen
   * @return {boolean}
   */
  isGen(gen) {
    return isValidGen(gen);
  }

  /**
   * Checks if the gen is located in the file with gens
   * @param {string} gen
   * @return {Promise<boolean>|boolean}
   */
  isExists(gen) {
    if (!this.isGen(gen)) {
      return false;
    }

    return this._strategy.has(gen);
  }
}