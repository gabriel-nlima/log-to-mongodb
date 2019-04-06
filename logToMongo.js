const log = require("./log");
const { MongoClient } = require("mongodb");
const makeInsert = require("./makeInsert");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function handleConnection(e, mClient) {
  if (e) {
    throw e;
  }

  const db = mClient.db();
  const collection = db.collection("logs");
  const insert = makeInsert(false, false);

  rl.on("line", line => {
    insert(collection, log(line));
  });

  process.on("SIGINT", () => {
    rl.close();
    mClient.close(process.exit);
  });
}

const url = "mongodb://localhost:27017/dbName";
MongoClient.connect(url, { useNewUrlParser: true }, handleConnection);
