document.addEventListener("DOMContentLoaded", () => {

    const email = {
        nombre: '',
        apellidos: '',
        email: '',
        asunto: '',
        mensaje: ''
    };

    const formulario = document.querySelector("#formulario");
    const inputNombre = document.querySelector("#nombre");
    const inputApellidos = document.querySelector("#apellidos");
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const btnEnviar = document.querySelector("#enviar");

    // agregar eventos a los inputs
    inputNombre.addEventListener("blur", validar);
    inputApellidos.addEventListener("blur", validar);
    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("input", validar);
    formulario.addEventListener("submit", enviarEmail);

    function enviarEmail(e) {
        e.preventDefault();

        // vaciar formulario
        resetFormulario();

        // alerta de éxito
        const alertaExito = document.createElement("P");
        alertaExito.classList.add("bg-green-500", "text-white", "absolute", "top-2", "rounded-xl", "right-5", "py-5", "px-5", "mt-10", "font-bold", "border-b-blue-100");
        alertaExito.textContent = "El mensaje se ha evíado con éxito";
        formulario.appendChild(alertaExito);

        setTimeout(() => {
            alertaExito.remove();
        }, 3000);
    }

    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }

        // validar email
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta("El email no es válido", e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }

        // limpiar alerta si ya se llenó el campo
        limpiarAlerta(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        const error = document.createElement("P");
        error.classList.add("bg-red-600", "mt-3", "text-white", "rounded", "p-2", "text-center", "alerta-error");
        error.textContent = mensaje;

        // agregar al html
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector(".alerta-error");
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if (Object.values(email).includes("")) {
            btnEnviar.classList.add("opcity-50", "cursor-pointer");
            btnEnviar.disabled = true;
            return;
        }
        btnEnviar.classList.remove("opacity-50");
        btnEnviar.disabled = false;
    }

    function resetFormulario() {
        // reiniciar el objeto
        email.nombre = '';
        email.apellidos = '';
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }
});