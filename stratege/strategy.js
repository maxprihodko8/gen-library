import {GEN_PREFIX} from "../index.js";

export default class GenStrategy {
  /**
   * Read from the stream
   */
  async read(stream) {
    if (!stream) {
      throw new Error('Please set the stream');
    }

    let result = '';
    for await (const chunk of stream) {
      console.log(chunk);

     /*  const index = chunk.indexOf(GEN_PREFIX);

      if (index === -1 && (!result || chunk.startsWith(GEN_PREFIX))) {
        result += chunk;
      } else if (1) {

      } */
    }
  }

  /**
   * Find if the gen exists
   * @param gen
   * @return {Promise<void>}
   */
  has(gen) {}
}