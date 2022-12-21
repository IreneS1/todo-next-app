import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "../../components/TodoList";
import UserInput from "../../components/userInput";
import Home from "../../pages/index";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "whatwg-fetch";

describe("Tests the home page", () => {
  const lists = [
    { _id: "635c03fc63bd12f022aaa6ac", title: "Personal", __v: 0 },
    { _id: "635c040d63bd12f022aaa6ae", title: "Work", __v: 0 },
    { _id: "635c041e63bd12f022aaa6b0", title: "Groceries", __v: 0 },
  ];
  const user = userEvent.setup();
  const newListTitle = "a new list test";

  const server = setupServer(
    rest.post("/api/lists/list", async (req, res, ctx) => {
      //const { title } = await req.json();
      return res(
        ctx.json({
          list: {
            title: newListTitle,
            _id: "3",
          },
        })
      );
    })
  );
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("adds new list with userEvent", async () => {
    const component = render(<Home lists={lists} />);

    // get input
    const addListInput = screen.getByRole("textbox");
    const addListButton = screen.getByRole("button", { name: /add list/i });

    //type in the new title
    await user.clear(addListInput);
    await user.type(addListInput, newListTitle);

    //submit the form
    await user.click(addListButton);

    expect(await screen.findByText(newListTitle)).toBeInTheDocument();
  });

  it("displays all the lists it was given", () => {
    //render(<Home lists={lists} />);
    const component = render(<Home lists={lists} />);
    for (let l of lists) {
      expect(screen.getByText(l.title)).toBeInTheDocument;
    }
    screen.debug(screen.getByRole("textbox"));
  });
  describe("todo list component", () => {
    it("renders todo list", () => {
      render(<TodoList storedList={lists} />);
      expect(screen.getByText(/personal/i));
      expect(screen.getByText(/work/i));
      expect(screen.getByText(/groceries/i));
    });
  });

  describe("user input component", () => {
    it("renders user input", () => {
      let onAdd = jest.fn();
      let input = "List";
      render(<UserInput onAdd={onAdd} inputValue={input} />);
      expect(screen.getByText(/add list/i)).toBeInTheDocument;
    });

    it("tests if user enters empty string", () => {});
  });
});
