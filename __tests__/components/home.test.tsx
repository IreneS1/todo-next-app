import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "../../components/TodoList";
import UserInput from "../../components/userInput";
import Home from "../../pages/index";

describe("The home page", () => {
  const lists = [
    { _id: "635c03fc63bd12f022aaa6ac", title: "Personal", __v: 0 },
    { _id: "635c040d63bd12f022aaa6ae", title: "Work", __v: 0 },
    { _id: "635c041e63bd12f022aaa6b0", title: "Groceries", __v: 0 },
  ];
  it.only("renders home page", () => {
    //render(<Home lists={lists} />);
    const component = render(<Home lists={lists} />);
    console.log(component);
    console.log(component.container.childNodes);
  });

  it("renders todo list", () => {
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
