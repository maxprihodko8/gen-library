import {GEN_PREFIX} from "../index.js";
import isValidGen from "../validators/index.js";

export default class GenStrategy {
  /**
   * Read from the stream
   */
  async read(stream) {
    if (!stream) {
      throw new Error('Please set the stream');
    }

    let result = '';
    let index = 0;
    for await (const chunk of stream) {
      const string = (result ? result : '') + chunk.toString();

      if (index === 0) {
        index = chunk.indexOf(GEN_PREFIX);
      }

      let nextIndex = string.indexOf(GEN_PREFIX, index + 1);

      while (nextIndex !== -1) {
        const gen = string.slice(index, nextIndex);

        if (isValidGen(gen)) {
          this.add(gen)
            .catch(e => console.log(e));
        }

        index = nextIndex;
        nextIndex = string.indexOf(GEN_PREFIX, index + 1);
      }

      result = string.slice(index);
    }
  }

  /**
   * Adds the gen to the list of existing
   * @param gen
   * @return {Promise}
   */
  add(gen) {}

  /**
   * Find if the gen exists
   * @param gen
   * @return {Promise<void>}
   */
  has(gen) {}
}