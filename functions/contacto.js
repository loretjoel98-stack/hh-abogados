export async function onRequest(context) {
    const { request, env } = context;

    if (request.method !== "POST") {
        return new Response("Método no permitido", { status: 405 });
    }

    try {
        const datos = await request.json();

        await env.DB.prepare(`
            INSERT INTO contactos
            (nombre, correo, telefono, area, mensaje)
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

        return new Response("Guardado correctamente", { status: 200 });

    } catch (error) {
        return new Response("Error del servidor: " + error.message, { status: 500 });
    }
}