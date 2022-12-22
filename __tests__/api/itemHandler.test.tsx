/**
 * @jest-environment node
 */
import { MongoMemoryServer } from "mongodb-memory-server";
import { createMocks } from "node-mocks-http";
import itemHandler from "../../pages/api/lists/item";

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

  test("api returns item object and status 200", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { title: "Test item" },
    });

    await itemHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).item).toEqual(
      expect.objectContaining({
        title: "Test item",
        completed: false,
        isDeleted: false,
        __v: 0,
      })
    );
  });

  test("POST request with no method or body error", async () => {
    const { req, res } = createMocks({});

    await itemHandler(req, res);
    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toBe(
      "Unsupported method GET. Only POST method is supported"
    );
  });

  test("error if empty body sent to api", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {},
    });

    await itemHandler(req, res);
    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toBe("request body not found");
  });

  test("error if empty body sent to api", async () => {
    const { req, res } = createMocks({
      method: "GET",
      body: { title: "Test item" },
    });

    await itemHandler(req, res);
    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toBe(
      "Unsupported method GET. Only POST method is supported"
    );
  });

  test("error if no method sent to api", async () => {
    const { req, res } = createMocks({
      body: { title: "Test item" },
    });

    await itemHandler(req, res);
    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toBe(
      "Unsupported method GET. Only POST method is supported"
    );
  });
});
