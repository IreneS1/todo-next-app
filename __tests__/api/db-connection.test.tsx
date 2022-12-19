/**
 * @jest-environment node
 */
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

describe("mongodb", () => {
  const lists = [
    { title: "Personal" },
    { title: "Work" },
    { title: "Groceries" },
  ];

  let con: MongoClient;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    mongoServer = await MongoMemoryServer.create();
    con = await MongoClient.connect(mongoServer.getUri(), {});
  });
  afterAll(async () => {
    if (con) {
      await con.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
    // await connection.close();
  });
  it("should successfully set & get information from the database", async () => {
    const db = con.db(mongoServer.instanceInfo!.dbName);
    //console.log(db);
    const col = db.collection("test");
    const result = await col.insertMany(lists);
    console.log("result", result);
    expect(result.acknowledged).toBeTruthy();
    expect(result.insertedCount).toStrictEqual(3);
    expect(await col.countDocuments({})).toBe(3);
  });
});
