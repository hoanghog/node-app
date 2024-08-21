import Redis from "../lib/redis";

interface InCreate {
  key: string;
  value: string;
}

interface OutGet {
  key: string;
  value: string;
}

class RedisService {
  async create(dtoIn: InCreate): Promise<void> {

    try {
      await Redis.set(dtoIn.key, dtoIn.value);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async get(key: string): Promise<OutGet> {
    let value;
    try {
      value = await Redis.get(key);
      if (!value) {
        throw new Error(`Key '${key}' does not exist.`);
      }
    } catch (e: any) {
      throw new Error(e);
    }

    return { key, value};
  }
}

export default new RedisService();
