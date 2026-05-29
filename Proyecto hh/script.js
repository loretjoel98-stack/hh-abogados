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
      

        // 2. Enviar correo con EmailJS
        await emailjs.send("service_81xwbbh", "template_nmcnnfh", {
            nombre: datos.nombre,
            correo: datos.correo,
            telefono: datos.telefono,
            area: datos.area,
            mensaje: datos.mensaje
        });

        alert("Su consulta ha sido recibida correctamente. Nos comunicaremos a la brevedad.");

        form.reset();
        window.location.href = "#inicio";

    } catch (error) {
        alert("Error de conexión o de envío. Inténtelo nuevamente.");
        console.error(error);
    }
});
