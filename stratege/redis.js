import GenStrategy from "./strategy.js";
import redis from 'redis';
import {promisify} from 'util';
import md5 from 'md5';

export default class RedisStrategy extends GenStrategy {
  constructor() {
    super();

    this._client = redis.createClient();
    this._client.getAsync = promisify(this._client.get).bind(this._client);

    this._client.on("error", function(error) {
      console.error(error);
    });
  }

  /**
   *
   * @param gen
   * @return {*}
   */
  add(gen) {
    return this._client.set(md5(gen), 1);
  }

  /**
   * Finds if the gen exists
   * @param gen
   * @return {Promise<void>}
   */
  async has(gen) {
    return this._client.getAsync(md5(gen));
  }
}