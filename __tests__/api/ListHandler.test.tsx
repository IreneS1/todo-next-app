/**
 * @jest-environment node
 */
import { MongoMemoryServer } from "mongodb-memory-server";
import { createMocks } from "node-mocks-http";
import listHandler from "../../pages/api/lists/list";

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

  test("passing POST request. api returns list object and status 200", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { title: "Test" },
    });

    await listHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).list).toEqual(
      expect.objectContaining({ __v: 0, title: "Test" })
    );
  });

  test("POST request with no method or body error", async () => {
    const { req, res } = createMocks({});

    await listHandler(req, res);
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual(
      "Unsupported method GET. Only POST method is supported"
    );
  });

  test("error if empty body is sent to api", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    await listHandler(req, res);
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual("request body not found");
  });

  test("error if wrong method is sent to api", async () => {
    const { req, res } = createMocks({
      method: "GET",
      body: { title: "Test" },
    });
    await listHandler(req, res);
    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toBe(
      "Unsupported method GET. Only POST method is supported"
    );
  });

  test("error if no method is sent to api", async () => {
    const { req, res } = createMocks({
      body: { title: "Test" },
    });
    await listHandler(req, res);
    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toBe(
      "Unsupported method GET. Only POST method is supported"
    );
  });
});
