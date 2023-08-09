import loki from "lokijs";
var db = new loki("sandbox.db");
var cache = db.addCollection("cache");

export async function addToInMemoryCache(key: string, data) {
  console.log("addToInMemoryCache", key);
  cache.insert({ key, data });
}

export async function getFromInMemoryCache(key: string) {
  console.log("getFromInMemoryCache", key);
  let data = await cache.find({ key: key });
  return data;
}

export async function clearInMemoryCache() {
  console.log("clearing InMemoryCache");

  db.removeCollection("cache");
  db.saveDatabase();
}
