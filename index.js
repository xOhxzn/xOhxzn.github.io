// Función para formatear la fecha en el formato deseado
function formatearFecha(fecha) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', options);
}


function genPDF() {
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    const fechaInput = document.getElementById('fecha');
    const fechaSeleccionada = new Date(fechaInput.value);
    const portada1 ="portada.png";
    const fondo ="fondo.png";
    var pageWidth = doc.internal.pageSize.width;
    var pageHeight = doc.internal.pageSize.height;
    var pageWidth = doc.internal.pageSize.width;
    var pageHeight = doc.internal.pageSize.height;
    doc.addImage(portada1, "png", 0, 0 , pageWidth, pageHeight);
    const nombre = document.getElementById('nombre').value;
    const nombre_propio = document.getElementById('nombre_propio').value;
    const materia = document.getElementById('materia').value;
    const matricula = document.getElementById('matricula').value;
    const actividad = document.getElementById('actividad').value;
    const fecha = document.getElementById('fecha').value;
    console.log(doc.getFontList());
    doc.setFont('helvetica', 'bold');
    centrarTexto(doc, "FACULTAD DE INGENIERA MECANICA Y ELECTRICA", 10, 50);
    doc.setFont('helvetica', 'normal');
    centrarTexto(doc, "Actividad: " + actividad, 25, 120);
    doc.setFont('helvetica', 'bold');
    centrarTexto(doc, materia, 45, 140);
    doc.setFont('helvetica', 'normal');
    centrarTexto(doc, "Nombre del Profesor: " + nombre, 17, 160);
    centrarTexto(doc, "Nombre: " + nombre_propio, 17, 170);
    centrarTexto(doc, "Matricula: " + matricula, 17, 180);
    const fechaFormateada = formatearFecha(fechaSeleccionada);
    doc.setFont('helvetica', 'bold');
    centrarTexto(doc, fechaFormateada, 20, 240);
    // Obtener todos los elementos con la clase image-preview
    const imagenes = document.querySelectorAll('.image-preview');
    let offsetY = 0; // Variable para controlar la posición vertical de las imágenes
    // Iterar sobre los elementos con la clase image-preview
    imagenes.forEach(function (imagen) {
        let offsetY = 0;
        const image = new Image();
        image.src = imagen.src;
        // Agregar la imagen al PDF y ajustar posición y tamaño
        var pageWidth = doc.internal.pageSize.width;
        var pageHeight = doc.internal.pageSize.height;
        const imageWidth = 150; // Ancho de la imagen
        const anchuraImagen = imagen.clientWidth;
        const relacionAnchura = imageWidth / anchuraImagen;
        var imageHeight = imagen.clientWidth / relacionAnchura; // Alto de la imagen
        if (imageHeight > 250) {
            imageHeight = 250;
        }
        const marginLeft = (pageWidth - imageWidth) / 2;
        const marginTop = 30;

        // Agregar la imagen al PDF y ajustar posición y tamaño
        doc.addPage();
        doc.addImage(fondo, "png", 0, 0 , pageWidth, pageHeight);
        doc.addImage(image, "png", marginLeft, marginTop, imageWidth, imageHeight);
        // Incrementar offsetY para la siguiente imagen
        offsetY += 110; // Puedes ajustar este valor según tus necesidades
    });

    // Guardar el PDF
    doc.save(actividad + ".pdf");
}




// Función para mostrar miniaturas de imágenes
function mostrarMiniatura(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageContainer = document.getElementById('image-container');
        const img = document.createElement('img');
        const img2 = document.createElement('img');
        img.classList.add('image-preview');
        img2.classList.add('miniatura');
        img.src = event.target.result;
        img2.src = img.src;
        imageContainer.appendChild(img);
        imageContainer.appendChild(img2);
    };
    reader.readAsDataURL(file);
}

// Evento cuando se selecciona un archivo
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', function() {
    const files = fileInput.files;
          
    // Verificar si se excede el límite de imágenes
    if (files.length > 10) {
        alert('No puedes subir más de 10 fotografías.');
        return;
    }

    // Mostrar miniaturas de imágenes seleccionadas
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Verificar si el archivo es una imagen
        if (file.type.startsWith('image/')) {
            mostrarMiniatura(file);
        } else {
            alert('El archivo seleccionado no es una imagen.');
        }
    }
});

function centrarTexto(doc, texto, fontSize, y) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getStringUnitWidth(texto) * fontSize / doc.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;
    doc.setFontSize(fontSize);
    doc.text(x, y, texto);
}

// Obtener el input
var matriculaInput = document.getElementById("matricula");

// Agregar evento de entrada para verificar si hay contenido
matriculaInput.addEventListener("input", function () {
  if (matriculaInput.value.length > 0) {
    matriculaInput.classList.add("has-content");
  } else {
    matriculaInput.classList.remove("has-content");
  }
});
