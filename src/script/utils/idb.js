import { openDB } from "idb";

const DB_NAME = "story-app-db";
const STORE_NAME = "stories";
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(database) {
    database.createObjectStore(STORE_NAME, { keyPath: "id" });
  },
});

export const idbStory = {
  async getAll() {
    return (await dbPromise).getAll(STORE_NAME);
  },
  async get(id) {
    return (await dbPromise).get(STORE_NAME, id);
  },
  async put(story) {
    return (await dbPromise).put(STORE_NAME, story);
  },
  async delete(id) {
    return (await dbPromise).delete(STORE_NAME, id);
  },
};
