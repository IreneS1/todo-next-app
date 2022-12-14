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

//   test("api returns list object and status 200", async () => {
//     const { req, res } = createMocks({
//       method: "POST",
//       body: { title: "Test" },
//     });

//     await itemHandler(req, res);
//     expect(res._getStatusCode()).toBe(200);
//     expect(JSON.parse(res._getData())).toEqual(
//       expect.objectContaining({ __v: 0, title: "Test" })
//     );
  });
});
