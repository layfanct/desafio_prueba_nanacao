const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafés", () => {
    
    test("GET /cafes debe devolver un status 200 y un arreglo con al menos un objeto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("DELETE /cafes/:id con un id inexistente debe devolver un status 404", async () => {
        const idInexistente = 999;
        const response = await request(server)
            .delete(`/cafes/${idInexistente}`)
            .set("Authorization", "Bearer token_falso");
        expect(response.status).toBe(404);
    });

    test("POST /cafes debe agregar un nuevo café y devolver un status 201", async () => {
        const nuevoCafe = { id: 5, nombre: "Latte" };
        const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(nuevoCafe)])
        );
    });

    test("PUT /cafes/:id debe devolver un status 400 si los IDs no coinciden", async () => {
        const cafeActualizado = { id: 10, nombre: "Espresso" };
        const idDiferente = 1;
        const response = await request(server)
            .put(`/cafes/${idDiferente}`)
            .send(cafeActualizado);
        expect(response.status).toBe(400);
    });

});
