const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

let token = "";

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

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });

  describe("additon of a new blog", () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash("sekret", 10);

      await new User({ username: "root", passwordHash }).save();

      const user = await User.findOne({ username: "root" });
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      token = jwt.sign(userForToken, process.env.SECRET);
    });

    test("a valid blog can be added", async () => {
      const newBlog = {
        title: "new blog",
        author: "Carol",
        url: "url-3",
        likes: 1,
      };

      await api
        .post("/api/blogs")
        .set("authorization", "bearer " + token)
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
        .set("authorization", "bearer " + token)
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

      await api
        .post("/api/blogs")
        .set("authorization", "bearer " + token)
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });

    test("blog without token or url is not added", async () => {
      const newBlog = {
        title: "new blog",
        author: "Carol",
        url: "url-3",
        likes: 1,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe("deletion of a blog", () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash("sekret", 10);

      await new User({ username: "root", passwordHash }).save();

      const user = await User.findOne({ username: "root" });
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      token = jwt.sign(userForToken, process.env.SECRET);
    });

    test("succeeds with status code 204 if id is valid", async () => {
      const newBlog = {
        title: "new blog",
        author: "Carol",
        url: "url-3",
        likes: 1,
      };

      await api
        .post("/api/blogs")
        .set("authorization", "bearer " + token)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart.at(-1);

      expect(blogsAtStart).toHaveLength(helper.initialBlogs.length + 1);

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("authorization", "bearer " + token)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

      const titles = blogsAtEnd.map((b) => b.title);

      expect(titles).not.toContain(blogToDelete.title);
    });
  });

  describe("update of a blog", () => {
    test("update the amount of likes for a blog post", async () => {
      const blogsAtStart = await helper.blogsInDb();
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

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with code 400 and proper message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with code 400 and proper message if username shorter than three characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "am",
      name: "Alice Munro",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with code 400 and proper message if password shorter than three characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "alice",
      name: "Alice Munro",
      password: "am",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
