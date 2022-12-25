describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "tester",
      username: "test",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("tester logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("salaine");
      cy.get("#login-button").click();
      cy.get(".error")
        .contains("invalid")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title-input").type("test title");
      cy.get("#author-input").type("test author");
      cy.get("#url-input").type("test url");
      cy.get("#create-button").click();

      cy.contains("test title");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test title",
          author: "test author",
          url: "test url",
        });
      });

      it("A blog can be liked", function () {
        cy.contains("show").click();
        cy.get("#like-button").click();

        cy.contains("1");
      });

      it("A blog can be deleted by its creator", function () {
        cy.contains("show").click();
        cy.contains("remove").click();

        cy.contains("blog removed");
      });

      it("A blog cannot be deleted by other creator", function () {
        const user = {
          name: "testerA",
          username: "testA",
          password: "salainenA",
        };
        cy.request("POST", "http://localhost:3003/api/users/", user);
        cy.login({ username: "testA", password: "salainenA" });

        cy.contains("show").click();
        cy.contains("remove").click();

        cy.get(".error")
          .contains("token invalid")
          .and("have.css", "color", "rgb(255, 0, 0)");
      });
    });

    describe("and some blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "The title with the fewest likes",
          author: "test author",
          url: "test url",
          likes: 2,
        });
        cy.createBlog({
          title: "The title with the most likes",
          author: "test author",
          url: "test url",
          likes: 8,
        });
        cy.createBlog({
          title: "The title with the second likes",
          author: "test author",
          url: "test url",
          likes: 3,
        });
      });

      it("blogs are ordered according to likes with the blog with the most likes being first", function () {
        cy.get(".blog").eq(0).should("contain", "The title with the most likes");
        cy.get(".blog").eq(1).should("contain", "The title with the second likes");
        cy.get(".blog").eq(2).should("contain", "The title with the fewest likes");

        cy.contains("The title with the fewest likes").contains("show").click();
        cy.get("#like-button").click();
        cy.wait(3000);
        cy.get("#like-button").click();

        cy.get(".blog").eq(0).should("contain", "The title with the most likes");
        cy.get(".blog").eq(1).should("contain", "The title with the fewest likes");
        cy.get(".blog").eq(2).should("contain", "The title with the second likes");
      });
    });
  });
});
