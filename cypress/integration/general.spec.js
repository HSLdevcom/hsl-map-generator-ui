const { v4: uuidv4 } = require("uuid");

// TODO: Envify here and cypress.json properly
const API_URL = Cypress.env("API_URL");
const TEST_PREFIX = "CY-TEST";

describe("Basic functionalities", () => {
    before(() => {
        cy.hslLogin();
        cy.wait(3000);
        cy.request("GET", `${API_URL}/builds`)
            .its("body")
            .then((buildArr) => {
                const testBuilds = buildArr.filter((build) =>
                    build.title.includes("CY-TEST")
                );
                if (testBuilds.length > 0) {
                    console.log(
                        "Removing test builds. This indicates that some tests are probably failing."
                    );
                }
                testBuilds.forEach((testBuild) => {
                    cy.request("DELETE", `${API_URL}/builds/${testBuild.id}`);
                    console.log(`Deleting ${testBuild.id}.`);
                });
            });
    });

    beforeEach(() => {
        cy.visit("/");
        cy.hslLogin();
        cy.wait(3000);
    });

    it("Add list, select it for use and show it", () => {
        const uuid = `${TEST_PREFIX}-${uuidv4()}`;
        cy.intercept("POST", `${API_URL}/builds`).as("postBuild");

        cy.get("[data-cy=toggle-mode-button]").click();
        cy.get("[data-cy=new-list-button").click();
        cy.get("[data-cy=new-list-name-input]")
            .click()
            .type(uuid);

        cy.get("[data-cy=new-list-name-input]").should("have.value", uuid);
        cy.get("[data-cy=add-list-button]").click();
        // cy.wait("@postBuild");

        cy.get("[data-cy=close-new-list-button]").click();

        cy.get("[data-cy=build-selector]").select(uuid);
        cy.get("[data-cy=select-list-button]").click();

        cy.get("[data-cy=selected-poster-name]").contains(uuid);

        cy.get("[data-cy=show-list-button]").click();
        cy.get("[data-cy=show-list-container]").contains("Muut");
        cy.get("[data-cy=show-list-container]").contains("Valmiina");
        cy.get("[data-cy=show-list-container]").contains("Rakentamassa");
        cy.get("[data-cy=close-list-modal-button]").click();

        // Deleting build so the list won't balloon.
        cy.wait(5000);
        cy.request("GET", `${API_URL}/builds`)
            .its("body")
            .then((buildArr) => {
                const build = buildArr.find((build) => build.title === uuid);
                build
                    ? cy.request("DELETE", `${API_URL}/builds/${build.id}`)
                    : cy.contains("Build not found.").should("exist");
            });
    });

    it("Test nav bar selectors", () => {
        cy.get("[data-cy=center-selector-button]").click();

        cy.get("[data-cy=size-selector-button]").click();
        cy.get("[data-cy=size-selector-width-input]")
            .click()
            .clear()
            .type(350);
        cy.get("[data-cy=size-selector-height-input]")
            .click()
            .clear()
            .type(330);
        cy.get("[data-cy=size-selector-width-input]").should(
            "have.value",
            "350"
        );
        cy.get("[data-cy=size-selector-height-input]").should(
            "have.value",
            "330"
        );

        cy.get("[data-cy=dpi-selector-button]").click();
        cy.get("[data-cy=dpi-selector-input]")
            .click()
            .clear()
            .type(305);
        cy.get("[data-cy=dpi-selector-input]").should("have.value", "305");

        cy.get("[data-cy=map-scale-selector-button]").click();
        cy.get("[data-cy=map-scale-selector-input]")
            .click()
            .clear()
            .type(13000);
        cy.get("[data-cy=map-scale-selector-input]").should(
            "have.value",
            "13000"
        );

        cy.get("[data-cy=pixel-scale-selector-button]").click();
        cy.get("[data-cy=pixel-scale-selector-input]")
            .click()
            .clear()
            .type(1);
        cy.get("[data-cy=pixel-scale-selector-input]").should(
            "have.value",
            "1"
        );
    });

    it("Test manual coordinate input", () => {
        cy.get("[data-cy=center-selector-button]").click();

        cy.get("[data-cy=manual-coords-lng-selector-input]")
            .click()
            .clear()
            .type("60.a4b");

        cy.get("[data-cy=manual-coords-lat-selector-input]")
            .click()
            .clear()
            .type("2f,9i7");

        cy.get("[data-cy=manual-coords-lng-selector-input]")
            .click()
            .clear()
            .type("60,345");

        cy.get("[data-cy=manual-coords-lng-selector-input]")
            .click()
            .clear()
            .type(60.246);

        cy.get("[data-cy=manual-coords-lat-selector-input]")
            .click()
            .clear()
            .type(24.987);
    });

    it("Generate poster", () => {
        const uuid = `${TEST_PREFIX}-${uuidv4()}`;
        const posterName = uuid.substr(0, 5);
        cy.server();
        cy.route("POST", `${API_URL}/builds`).as("postBuild");

        cy.get("[data-cy=toggle-mode-button]").click();
        cy.get("[data-cy=new-list-button").click();
        cy.get("[data-cy=new-list-name-input]")
            .click()
            .type(uuid);

        cy.get("[data-cy=new-list-name-input]").should("have.value", uuid);
        cy.get("[data-cy=add-list-button]").click();

        cy.get("[data-cy=close-new-list-button]").click();
        cy.get("[data-cy=build-selector]").select(uuid);
        cy.get("[data-cy=select-list-button]").click();

        cy.get("[data-cy=size-selector-button]").click();
        cy.get("[data-cy=size-selector-width-input]")
            .click()
            .clear()
            .type(200);
        cy.get("[data-cy=size-selector-height-input]")
            .click()
            .clear()
            .type(200);

        cy.get("[data-cy=new-poster-name]").type(posterName);
        cy.get("[data-cy=generate-button").click();
        cy.get("[data-cy=close-generate-prompt-button").click();
        cy.get("[data-cy=show-list-button]").click();

        // 60 seconds should be more than enough for 200x200 poster.
        // Better implementation would be to somehow stop waiting after
        // polling for build status returns "pending: 0".
        cy.wait(60000);
        cy.get(`[data-cy=${posterName}]`).contains("READY");

        // Remove build
        cy.request("GET", `${API_URL}/builds`)
            .its("body")
            .then((buildArr) => {
                const build = buildArr.find((build) => build.title === uuid);
                cy.request("DELETE", `${API_URL}/builds/${build.id}`);
            });

        cy.get("[data-cy=close-list-modal-button]").click();
    });
});
