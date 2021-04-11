import {GEN_PREFIX} from "../index.js";
import isValidGen from "../validators/index.js";

/**
 * Strategy file which defines how the defined gens are saved and how are they found
 */
export default class GenStrategy {
  constructor() {
    this._waitingForSave = [];
  }

  /**
   * Read from the stream
   */
  async read(stream) {
    if (!stream) {
      throw new Error('Please set the stream');
    }

    let tail = '';
    let index = 0;
    for await (const chunk of stream) {
      const string = (tail || '') + chunk.toString();

      if (index === 0) {
        index = chunk.indexOf(GEN_PREFIX);
      }

      let nextIndex = string.indexOf(GEN_PREFIX, index + 1);

      while (nextIndex !== -1) {
        const gen = string.slice(index, nextIndex);

        this._add(gen);

        index = nextIndex;
        nextIndex = string.indexOf(GEN_PREFIX, index + 1);
      }

      tail = string.slice(index);

      if (this._waitingForSave.length > 100) {
        await this._save();
      }
    }

    if (isValidGen(tail)) {
      this._add(tail);
    }

    await this._save();
  }

  /**
   * Find if the gen exists
   * @param gen
   * @return {Promise<void>}
   */
  has(gen) {
    return new Promise(() => {return false});
  }

  /**
   * Adds the gen to the list of existing
   * @param {string} gen
   */
  _add(gen) {
    if (isValidGen(gen)) {
      this._waitingForSave.push(gen);
    }
  }

  /**
   * Saves the batch
   * @return {Promise}
   */
  _save() {
    this._waitingForSave = [];
    return new Promise((resolve) => {resolve()});
  }
}