export async function onRequest(context) {
    const { request, env: { DB } } = context;

    if (request.method !== "POST") {
        return new Response("Método no permitido", { status: 405 });
    }

    try {
        const datos = await request.json();

        await DB.prepare(`
            INSERT INTO contactos
            (nombre, correo, "teléfono", "área", mensaje)
            VALUES (?, ?, ?, ?, ?)
        `)
        .bind(
            datos.nombre,
            datos.correo,
            datos.telefono,
            datos.area,
            datos.mensaje
        )
        .run();

        return new Response("Guardado correctamente");

    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}
