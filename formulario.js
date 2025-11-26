/* ------------------------------
   VARIABLES GLOBALES
------------------------------ */
let datosPDF = {};

/* ------------------------------
   GUARDAR Y VALIDAR FORMULARIO
------------------------------ */
function guardarEnviar() {
    const nombre = document.getElementById("nombre").value.trim();
    const curso = document.getElementById("curso").value;
    const participacion = document.getElementById("participacion").value;
    const celular = document.getElementById("celular").value.trim();

    // Validación básica
    if (!nombre || !curso || !participacion || !celular) {
        alert("⚠️ Por favor, complete todos los campos antes de continuar.");
        return;
    }

    // Generar fecha automática: DD/MM/AAAA
    const fecha = new Date();
    const fechaInscripcion = fecha.toLocaleDateString("es-BO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    // Guardar datos
    datosPDF = { nombre, curso, participacion, celular, fechaInscripcion };

    // Cambiar de pantalla
    document.getElementById("formulario").classList.add("hidden");
    document.getElementById("descargaSection").classList.remove("hidden");
}

/* ------------------------------
   GENERAR PDF FORMATO FACTURA
------------------------------ */
function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    /* --- MARCO GENERAL --- */
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1.2);
    doc.rect(10, 10, 190, 270);

    /* --- ENCABEZADO --- */
    doc.setFillColor(70, 120, 240); // Azul elegante
    doc.rect(10, 10, 190, 30, "F");

    doc.setFontSize(17);
    doc.setTextColor(255, 255, 255);
    doc.text("FICHA DE REGISTRO ESTUDIANTIL", 20, 22);

    doc.setFontSize(13);
    doc.text("ÁREA: EDUCACIÓN MUSICAL", 20, 32);

    doc.setFontSize(11);
    doc.text("Profesor: Humberto Yupanqui C.", 20, 40);

    /* --- CUERPO DEL DOCUMENTO --- */
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);

    const yStart = 65;

    doc.text("Nombre y Apellido:", 20, yStart);
    doc.text(datosPDF.nombre, 85, yStart);

    doc.text("Curso:", 20, yStart + 20);
    doc.text(datosPDF.curso, 85, yStart + 20);

    doc.text("Participación:", 20, yStart + 40);
    doc.text(datosPDF.participacion, 85, yStart + 40);

    doc.text("Celular:", 20, yStart + 60);
    doc.text(datosPDF.celular, 85, yStart + 60);

    doc.text("Fecha de Inscripción:", 20, yStart + 80);
    doc.text(datosPDF.fechaInscripcion, 85, yStart + 80);

    /* --- PIE DE PÁGINA --- */
    doc.setFillColor(110, 60, 220);
    doc.rect(10, 260, 190, 20, "F");

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("Gracias por su registro", 70, 273);

    /* --- GUARDAR PDF --- */
    doc.save("Ficha_estudiantil.pdf");
}

/* ------------------------------
   BOTÓN SALIR
------------------------------ */
function salir() {
    window.location.href = "index.html";
}
