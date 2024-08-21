import { createClient, RedisClientType } from 'redis';
import config from 'config';

const redisCfg = config.get<RedisConf>('db.redis');

interface RedisConf {
  port: number;
  host: string;
  username: string;
  password?: string;
}

class RedisDB {
  private _redis: RedisClientType;
  private _connected: boolean = false;

  constructor(redisCfg: RedisConf) {
    const { port, host, username, password } = redisCfg;
    if (!redisCfg?.port) {
      throw new Error('Redis port is not defined! You have to define "db.redis.port" in config.');
    }
    if (!redisCfg?.host) {
      throw new Error('Redis host is not defined! You have to define "db.redis.host" in config.');
    }

    this._redis = createClient({url: `redis://${username}:${password}@${host}:${port}`});
  }

  get redis() {
    return this._redis;
  }

  get connected() {
    return this._connected;
  }

  set connected(bool: boolean) {
    this._connected = bool;
  }

  async redisInitialization() {
    try {
      await this.redis.connect();
      this.connected = true;
    } catch (e: any) {
      this.connected = false;
      throw new Error(e);
    }
  }

  async closeConnection() {
    await this.redis.disconnect();
  }

  async set(key: string, value: string) {
    return this.redis.set(key, value);
  }

  async get(key: string) {
    return this.redis.get(key);
  }
}

export default new RedisDB(redisCfg);
