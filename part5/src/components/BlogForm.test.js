import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("the form calls the event handler it received as props with the right details when a new blog is created", async () => {
    const createBlog = jest.fn();

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByPlaceholderText("write here blog title");
    const authorInput = screen.getByPlaceholderText("write here blog author");
    const urlInput = screen.getByPlaceholderText("write here blog url");
    const createButton = screen.getByText("create");

    await userEvent.type(titleInput, "test title");
    await userEvent.type(authorInput, "test author");
    await userEvent.type(urlInput, "test url");
    await userEvent.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("test title");
    expect(createBlog.mock.calls[0][0].author).toBe("test author");
    expect(createBlog.mock.calls[0][0].url).toBe("test url");
  });
});
