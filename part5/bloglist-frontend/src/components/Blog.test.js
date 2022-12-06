import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  const addLikes = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "Hello",
      author: "Carol",
      url: "url...",
      likes: 5,
      user: {
        id: 1234456789,
        name: "tester",
        username: "test",
      },
    };
    container = render(<Blog blog={blog} updateLikes={addLikes} />).container;
  });

  test("renders content", () => {
    const head = container.querySelector("#blog-head");
    const content = container.querySelector("#blog-content");

    expect(head).toHaveTextContent("Hello");
    expect(head).toHaveTextContent("Carol");
    expect(content).toBeNull();
  });

  test("blog's url and number of likes are shown when the button has been clicked", async () => {
    const showButton = screen.getByText("show");
    await userEvent.click(showButton);

    const content = container.querySelector("#blog-content");

    expect(content).toHaveTextContent("url...");
    expect(content).toHaveTextContent("5");
  });

  test("the like button is clicked twice, the event handler the component received as props is called twice", async () => {
    const showButton = screen.getByText("show");
    await userEvent.click(showButton);

    const likeButton = screen.getByText("like");
    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    expect(addLikes.mock.calls).toHaveLength(2);
  });
});