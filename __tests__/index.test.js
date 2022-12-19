/**
 * @jest-environment node
 */
import { MongoMemoryServer } from "mongodb-memory-server";
import { getServerSideProps } from "../pages/index";
import { MongoClient } from "mongodb";
import connectMongo from "../utils/connectMongo"
import mongoose from "mongoose";

let mongod, uri, con;
jest.mock("../utils/connectMongo", () => {
  const original = jest.requireActual("../utils/connectMongo");
  return {
    __esModule: true,
    default: jest.fn(original.default),
  };
});

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  process.env.MONGO_URI = uri;
  con = await MongoClient.connect(uri, {});
});

afterAll(async () => {
  if (con) {
    await con.close();
  }
  mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
});

describe("Test Home Page GetServerSideProps", () => {
  it("returns empty lists array when there are no lists", async () => {
    const result = await getServerSideProps();
    expect(Array.isArray(result.props.lists)).toBeTruthy();
    expect(result).toEqual({ props: { lists: [] } });
  });

  it("returns all lists in array", async () => {
    const dummyData = [
      {
        title: "title 1",
      },
      {
        title: "title 2",
      },
    ];

    const db = con.db(mongod.instanceInfo.dbName);
    const res = await db.collection("lists").insertMany(dummyData);
    console.log(res)
    let result = await getServerSideProps();
    console.log(result.props)
    expect(result.props).toBeDefined();
    expect(result.props.lists).toBeDefined();
    expect(Array.isArray(result.props.lists)).toBeTruthy();
    expect(result.props.lists.length).toBe(dummyData.length);

    for (const i in dummyData) {
      expect(result.props.lists[i].title).toBe(dummyData[i].title);
    }
    for (const j in res.insertedIds) {
      expect(result.props.lists[j]._id).toEqual(res.insertedIds[j] + "");
    }
  });

  it("handles thrown errors well", async () => {

    connectMongo.mockImplementationOnce(async () => {
      throw new Error("mocked an error!");
    });

    const result = await getServerSideProps();
    expect(result.props).toBeUndefined();
    expect(result.notFound).toBeDefined();
    expect(result.notFound).toBeTruthy();
  });
});