import {GEN_PREFIX} from "../index";

export default class GenStrategy {
  constructor(stream) {
    if (!stream) {
      throw new Error('Please set the stream');
    }

    this._stream = stream;
  }

  /**
   * Read from the stream
   */
  async read() {
    let result = '';
    for await (const chunk of this._stream) {
      const index = chunk.indexOf(GEN_PREFIX);

      if (index === -1 && (!result || chunk.startsWith(GEN_PREFIX))) {
        result += chunk;
      } else if (1) {

      }
    }
  }

  /**
   * Find if the gen exists
   * @param gen
   * @return {Promise<void>}
   */
  has(gen) {}
}