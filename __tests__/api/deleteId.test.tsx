/**
 * @jest-environment node
 */
import { MongoMemoryServer } from "mongodb-memory-server";
import { createMocks } from "node-mocks-http";
var httpMocks = require("node-mocks-http");
import itemHandler from "../../pages/api/lists/item";
import handler from "../../pages/api/lists/[deleteId]";

describe("Add List API", () => {
  let mongoServer: MongoMemoryServer, uri;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    console.log(uri);
    process.env.MONGO_URI = uri;
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  test("api delete, soft deletes item with id", async () => {
    // create item
    const req_01 = httpMocks.createRequest({
      method: "POST",
      body: { title: "Test item" },
    });
    const res_01 = httpMocks.createResponse();
    await itemHandler(req_01, res_01);
    // store item's id
    let itemId = JSON.parse(res_01._getData()).item._id;
    let item = JSON.parse(res_01._getData()).item;
    // soft delete item
    const req_02 = httpMocks.createRequest({
      method: "PUT",
      body: { isDeleted: true },
      query: { deleteId: itemId },
    });
    const res_02 = httpMocks.createResponse();
    await handler(req_02, res_02);
    expect(res_02.statusCode).toBe(200);
    expect(JSON.parse(res_02._getData())).toEqual(
      expect.objectContaining({ success: true })
    );
    console.log("object returned", res_02._getData());
  });

  test("success: false and status 400 when item, soft delete, fails", async () => {
    const itemId = "wrong id";
    const req_02 = httpMocks.createRequest({
      method: "PUT",
      body: { isDeleted: true },
      query: { id: itemId },
    });
    const res_02 = httpMocks.createResponse();
    await handler(req_02, res_02);
    expect(res_02.statusCode).toBe(400);
    expect(JSON.parse(res_02._getData())).toEqual({ success: false });
  });
});
