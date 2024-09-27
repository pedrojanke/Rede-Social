describe("Login Page Test", () => {
    beforeEach(() => {
    const users = [
        { email: "Pedro@email.com", password: "Pedro", name: "Pedro" },
        { email: "Maria@email.com", password: "Maria", name: "Maria" },
    ];

    localStorage.setItem("users", JSON.stringify(users));

    cy.visit("login.html");
});

it("Deve realizar o login com sucesso com credenciais válidas", () => {
    cy.get("#email").type("Pedro@email.com");
    cy.get("#password").type("Pedro");

    cy.get("#loginForm").submit();

    cy.get("#loginMessage")
    .should(
        "have.text",
        "Login realizado com sucesso, bem-vindo(a) Pedro!"
    )
    .and("have.css", "color", "rgb(0, 128, 0)");

    cy.url().should("include", "index.html");
});

it("Deve exibir mensagem de erro para credenciais inválidas", () => {
    cy.get("#email").type("usuarioinvalido@email.com");
    cy.get("#password").type("senhaerrada");

    cy.get("#loginForm").submit();

    cy.get("#loginMessage")
    .should("have.text", "Usuário ou senha inválidos!")
    .and("have.css", "color", "rgb(255, 0, 0)");
});

it("Deve armazenar o perfil do usuário logado no localStorage após login bem-sucedido", () => {
    cy.get("#email").type("Maria@email.com");
    cy.get("#password").type("Maria");

    cy.get("#loginForm").submit();

    cy.window().then((window) => {
        const userProfile = JSON.parse(
        window.localStorage.getItem("userProfile")
    );
    expect(userProfile).to.deep.equal({
        email: "Maria@email.com",
        password: "Maria",
        name: "Maria",
    });
    });
});
});
