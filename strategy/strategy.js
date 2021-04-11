import {GEN_PREFIX} from "../index.js";
import isValidGen from "../validators/index.js";
import md5 from 'md5';

/**
 * Strategy file which defines how the defined gens are saved and how are they found
 */
export default class GenStrategy {
  /**
   * Read from the stream
   */
  async read(stream) {
    if (!stream) {
      throw new Error('Please set the stream');
    }

    let waitingForSave = [];
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

        if (isValidGen(gen)) {
          waitingForSave.push(gen);
        }

        index = nextIndex;
        nextIndex = string.indexOf(GEN_PREFIX, index + 1);
      }

      tail = string.slice(index);

      if (waitingForSave.length > 100) {
        await this.add(waitingForSave);
        waitingForSave = [];
      }
    }

    if (isValidGen(tail)) {
      waitingForSave.push(tail);
    }

    if (waitingForSave.length) {
      await this.add(waitingForSave);
    }
  }

  /**
   * Adds the gen to the list of existing
   * @param {Array} gens
   * @return {Promise}
   */
  add(gens) {
    return new Promise(() => {});
  }

  /**
   * Find if the gen exists
   * @param gen
   * @return {Promise<void>}
   */
  has(gen) {
    return false;
  }
}