/**
 * @jest-environment node
 */
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { createMocks } from "node-mocks-http";
import listHandler from "../../pages/api/lists/list";
import mongoose from "mongoose";

describe("Add List API", () => {
  //let con: MongoClient;
  let mongoServer: MongoMemoryServer;
  //const mongoServer = new MongoMemoryServer();

  beforeAll(async () => {
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    //con = await MongoClient.connect(mongoServer.getUri(), {});
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    // if (con) {
    //   await con.close();
    // }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  test("api returns list object and status 200", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { title: "T" },
    });

    await listHandler(req, res);
    console.log(res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).list).toEqual(
      expect.objectContaining({ __v: 0, title: "T" })
    );
  });
});
