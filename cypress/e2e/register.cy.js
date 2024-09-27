describe("Register Page Test", () => {
  beforeEach(() => {
    localStorage.clear();

    cy.visit("register.html");
  });

  it("Deve registrar um novo usuário com sucesso", () => {
    cy.get("#name").type("Novo Usuário");
    cy.get("#email").type("novo.usuario@email.com");
    cy.get("#password").type("senha123");

    cy.get("#registerForm").submit();

    cy.get("#registerMessage")
      .should("have.text", "Cadastro realizado com sucesso!")
      .and("have.css", "color", "rgb(0, 128, 0)");

    cy.url().should("include", "login.html");
  });

  it("Deve exibir mensagem de erro se todos os campos não estiverem preenchidos", () => {
    cy.get("#name").type("Usuário Incompleto");

    cy.get("#registerForm").submit();

    cy.get("#registerMessage")
      .should("have.text", "Preencha todos os campos.")
      .and("have.css", "color", "rgb(255, 0, 0)");
  });

  it("Deve exibir mensagem de erro ao tentar registrar um e-mail já cadastrado", () => {
    const users = [
      {
        name: "Usuário Existente",
        email: "usuario.existente@email.com",
        password: "senha123",
      },
    ];
    localStorage.setItem("users", JSON.stringify(users));

    cy.get("#name").type("Usuário Existente");
    cy.get("#email").type("usuario.existente@email.com");
    cy.get("#password").type("senha123");

    cy.get("#registerForm").submit();

    cy.get("#registerMessage")
      .should("have.text", "Usuário já cadastrado.")
      .and("have.css", "color", "rgb(255, 0, 0)");
  });

  it("Deve armazenar o novo usuário no localStorage após cadastro bem-sucedido", () => {
    cy.get("#name").type("Usuário Novo");
    cy.get("#email").type("usuario.novo@email.com");
    cy.get("#password").type("senha123");

    cy.get("#registerForm").submit();

    cy.window().then((window) => {
      const users = JSON.parse(window.localStorage.getItem("users"));
      expect(users).to.have.length(1);
      expect(users[0]).to.deep.equal({
        name: "Usuário Novo",
        email: "usuario.novo@email.com",
        password: "senha123",
      });
    });
  });
});
