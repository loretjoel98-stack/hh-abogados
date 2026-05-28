const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
        nombre: form.nombre.value.trim(),
        correo: form.correo.value.trim(),
        telefono: form.telefono.value.trim(),
        area: form.area.value,
        mensaje: form.mensaje.value.trim()
    };

    try {

        const respuesta = await fetch("/contacto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const texto = await respuesta.text();

        if (respuesta.ok) {

            alert(
                "Su consulta ha sido recibida correctamente. A la brevedad, uno de nuestros profesionales se comunicará con usted."
            );

            form.reset();

            window.location.href = "#inicio";

        } else {

            alert("Error: " + texto);

            console.error(texto);

        }

    } catch (error) {

        alert("Error de conexión. Inténtelo nuevamente más tarde.");

        console.error(error);

    }
});
