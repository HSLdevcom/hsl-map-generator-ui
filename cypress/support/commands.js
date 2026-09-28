Cypress.Commands.add("hslLogin", () => {
    const AUTH_URI = "https://hslid-uat.cinfra.fi/openid/token";
    const AUTH_SCOPE =
        "email https://oneportal.trivore.com/scope/groups.readonly";

    cy.env([
        "HSLID_CLIENT_ID",
        "HSLID_CLIENT_SECRET",
        "TESTING_HSLID_USERNAME",
        "TESTING_HSLID_PASSWORD"
    ]).then((env) => {
        const CLIENT_ID = env.HSLID_CLIENT_ID;
        const CLIENT_SECRET = env.HSLID_CLIENT_SECRET;
        const HSLID_USERNAME = env.TESTING_HSLID_USERNAME;
        const HSLID_PASSWORD = env.TESTING_HSLID_PASSWORD;

        if (!CLIENT_ID || !CLIENT_SECRET) {
            throw new Error("Missing HSLID envs");
        }

        const authHeader = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`;

        const options = {
            method: "POST",
            url: AUTH_URI,
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            form: true,
            body: {
                scope: AUTH_SCOPE,
                grant_type: "password",
                username: HSLID_USERNAME,
                password: HSLID_PASSWORD
            }
        };

        cy.request({...options, failOnStatusCode: false}).then((response) => {
            if (response.status !== 200) {
                throw new Error(
                    `Auth failed: ${response.status} ${JSON.stringify(
                        response.body
                    )}`
                );
            }
            const {access_token} = response.body;
            cy.log(access_token);
            expect(response.status).to.eq(200);
            expect(access_token).to.be.ok;
            cy.visit(`/?code=${access_token}&testing=true`);
            cy.wait(3000);
        });
    });
});
