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
    expect(res_02._getJSONData().data).toEqual(
      expect.objectContaining({
        __v: 0,
        completed: false,
        isDeleted: true,
        title: "Test item",
      })
    );
  });

  test("success: false and status 400 when item, soft delete, fails", async () => {
    const itemId = "";
    const req_02 = httpMocks.createRequest({
      method: "PUT",
      body: { isDeleted: true },
      query: { id: itemId },
    });
    const res_02 = httpMocks.createResponse();
    await handler(req_02, res_02);
    expect(expect.stringContaining("no item id found"));
    //console.log(res_02);
    expect(res_02.statusCode).toBe(400);
    expect(res_02._getJSONData()).toEqual({ success: false });
  });

  test("completed/checked an item successfully", async () => {
    // create item
    const req_01 = httpMocks.createRequest({
      method: "POST",
      body: { title: "Test item" },
    });
    const res_01 = httpMocks.createResponse();
    await itemHandler(req_01, res_01);
    // store item's id
    let itemId = JSON.parse(res_01._getData()).item._id;
    // mark item as completed
    const req_02 = httpMocks.createRequest({
      method: "PUT",
      body: { completed: true },
      query: { deleteId: itemId },
    });
    const res_02 = httpMocks.createResponse();
    await handler(req_02, res_02);
    console.log("check:", res_02._getJSONData());
    expect(res_02.statusCode).toBe(200);
    expect(res_02._getJSONData().data).toEqual(
      expect.objectContaining({
        __v: 0,
        completed: true,
        isDeleted: false,
        title: "Test item",
      })
    );
  });

  test("when item is unchecked/uncompleted, the item is not completed anymore", async () => {
    // create item
    const req_01 = httpMocks.createRequest({
      method: "POST",
      body: { title: "Test item" },
    });
    const res_01 = httpMocks.createResponse();
    await itemHandler(req_01, res_01);
    // store item's id and item
    let item = JSON.parse(res_01._getData()).item;
    let itemId = JSON.parse(res_01._getData()).item._id;
    // mark item as completed
    const req_02 = httpMocks.createRequest({
      method: "PUT",
      body: { completed: true },
      query: { deleteId: itemId },
    });
    const res_02 = httpMocks.createResponse();
    await handler(req_02, res_02);
    expect(res_02._getJSONData().data).toEqual(
      expect.objectContaining({
        __v: 0,
        completed: true,
        isDeleted: false,
        title: "Test item",
      })
    );
    // mark item as uncompleted
    const req_03 = httpMocks.createRequest({
      method: "PUT",
      body: { completed: false },
      query: { deleteId: itemId },
    });
    const res_03 = httpMocks.createResponse();
    await handler(req_03, res_03);
    expect(res_03.statusCode).toBe(200);
    expect(res_03._getJSONData().data).toEqual(
      expect.objectContaining({
        __v: 0,
        completed: false,
        isDeleted: false,
        title: "Test item",
      })
    );
  });
});
