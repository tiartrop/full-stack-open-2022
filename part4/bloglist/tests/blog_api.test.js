const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("two blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });

  describe("additon of a new blog", () => {
    test("a valid blog can be added", async () => {
      const newBlog = {
        title: "new blog",
        author: "Carol",
        url: "url-3",
        likes: 1,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((b) => b.title);
      expect(titles).toContain("new blog");
    });

    test("blog without likes will default to the value 0", async () => {
      const newBlog = {
        title: "new blog",
        author: "Carol",
        url: "url-3",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const blog = blogsAtEnd.find((b) => b.title === "new blog");
      expect(blog.likes).toBe(0);
    });

    test("blog without title or url is not added", async () => {
      const newBlog = {
        url: "url-3",
        likes: 1,
      };

      await api.post("/api/blogs").send(newBlog).expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map((b) => b.title);

      expect(titles).not.toContain(blogToDelete.title);
    });
  });

  describe("update of a blog", () => {
    test("update the amount of likes for a blog post", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0];
      blogToUpdate.likes += 1;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect("Content-Type", /application\/json/);


      const blogsAtEnd = await helper.blogsInDb();
      const blog = blogsAtEnd.find((b) => b.title === blogToUpdate.title);
      expect(blog.likes).toBe(6);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
