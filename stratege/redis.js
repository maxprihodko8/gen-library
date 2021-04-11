import GenStrategy from "./strategy.js";
import redis from 'redis';
import {promisify} from 'util';

export default class RedisStrategy extends GenStrategy {
  constructor(stream) {
    super(stream);

    this._client = redis.createClient();
    this._client.getAsync = promisify(this._client.get).bind(this._client);

    this._client.on("error", function(error) {
      console.error(error);
    });
  }

  add(gens) {

  }

  /**
   * Finds if the gen exists
   * @param gen
   * @return {Promise<void>}
   */
  async has(gen) {
    return this._client.getAsync(gen);
  }
}