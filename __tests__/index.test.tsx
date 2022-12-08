import React from "react";
import Home, { getServerSideProps } from "../pages/index";
import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";
import UserInput from "../components/userInput";
import { ParsedUrlQuery } from "querystring";
import { GetServerSidePropsContext } from "next";
import mongoose from "mongoose";

describe("getServerSideProps", () => {
  beforeAll(() => {
    jest.mock("mongodb");
  });
  it("checks on good case", () => {
    // const context = {
    //   params: { id: "635c03fc63bd12f022aaa6ac" } as ParsedUrlQuery,
    // };
    // const value = getServerSideProps(context as GetServerSidePropsContext);
    // expect(value).toEqual({ props: {} });
  });
});

describe("The home page", () => {
  it("renders todo list", () => {
    const lists = [
      { _id: "635c03fc63bd12f022aaa6ac", title: "Personal", __v: 0 },
      { _id: "635c040d63bd12f022aaa6ae", title: "Work", __v: 0 },
      { _id: "635c041e63bd12f022aaa6b0", title: "Groceries", __v: 0 },
    ];
    render(<TodoList storedList={lists} />);
    expect(screen.getByText(/personal/i));
    expect(screen.getByText(/work/i));
    expect(screen.getByText(/groceries/i));
  });

  it("renders user input", () => {
    let onAdd = jest.fn();
    let input = "List";
    render(<UserInput onAdd={onAdd} inputValue={input} />);
    expect(screen.getByText(/add list/i)).toBeInTheDocument;
  });
});
