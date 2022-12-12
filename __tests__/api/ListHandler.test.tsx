/**
 * @jest-environment node
 */
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { createMocks } from "node-mocks-http";
import listHandler from "../../pages/api/lists/list";

describe("Add List API", () => {
  let con: MongoClient;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    mongoServer = await MongoMemoryServer.create();
    //process.env.MONGO_URI = mongoServer.getUri();
    con = await MongoClient.connect(mongoServer.getUri(), {});
  });

  afterAll(async () => {
    if (con) {
      await con.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it.only("api returns list object and status 200", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { title: "Test" },
    });

    await listHandler(req, res);
    //console.log(res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).list).toEqual(
      expect.objectContaining({ __v: 0, title: "Test" })
    );
  });
});
