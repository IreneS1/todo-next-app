/**
 * @jest-environment node
 */
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import {
  createMocks,
  RequestMethod,
  Query,
  createResponse,
  createRequest,
} from "node-mocks-http";
import addList from "../../pages/index";

describe("Add List API", () => {
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
  });

  it.only("api returns list object and status 200", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { title: "Work" },
    });

    addList(req, res);
    //console.log(res);
    expect(res._getStatusCode()).toBe(200);
  });
});
