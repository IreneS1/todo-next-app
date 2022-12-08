import React from "react";
import { render, screen } from "@testing-library/react";
import ListItem from "../../components/ListItem";

describe("List Item component", () => {
  it("renders list item component", () => {
    const item = {
      completed: false,
      isDeleted: false,
      listId: "635c041e63bd12f022aaa6b0",
      title: "Sparkling Water",
      __v: 0,
      _id: "635c0cd563bd12f022aaa6b7",
    };
    const deleteItem = jest.fn();
    const checkItem = jest.fn();
    render(
      <ListItem item={item} deleteItem={deleteItem} checkItem={checkItem} />
    );
    expect(screen.getByText(/sparkling water/i)).toBeTruthy();
    expect(screen.getByTestId("delete-icon")).toBeInTheDocument;
    expect(screen.getByTestId("checkbox")).toBeInTheDocument;
  });
});
