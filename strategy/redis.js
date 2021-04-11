import GenStrategy from "./strategy.js";
import redis from 'redis';
import {promisify} from 'util';
import md5 from 'md5';

/**
 * Add and found gens using the Redis
 * Use md5 as the key
 */
export default class RedisStrategy extends GenStrategy {
  constructor() {
    super();

    this._client = redis.createClient();
    this._client.getAsync = promisify(this._client.get).bind(this._client);
    this._client.msetAsync = promisify(this._client.mset).bind(this._client);

    this._client.on("error", function(error) {
      console.error(error);
    });
  }

  /**
   * Finds if the gen exists, use md5 of the gen as the key
   * @param gen
   * @return {Promise<void>}
   */
  async has(gen) {
    return this._client.getAsync(md5(gen));
  }

  /**
   * Saves the batch to the Redis
   * @return {Promise}
   * @private
   */
  _save() {
    const query = [];

    this._waitingForSave.forEach(gen => {
      query.push(md5(gen));
      query.push(1);
    });

    this._waitingForSave = [];

    return this._client.msetAsync(query);
  }
}