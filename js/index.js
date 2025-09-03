document.addEventListener("DOMContentLoaded", function () {
    const btnInicio = document.getElementById("btn-inicio");

    btnInicio.addEventListener("click", function (e) {
        e.preventDefault(); // impede o link de navegar

        const confirmar = confirm("Tem certeza que deseja recarregar a página? Dados não salvos podem ser perdidos.");

        if (confirmar) {
            location.reload(); // recarrega a página se o usuário confirmar
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const link = document.getElementById("link-nossa-marca");
    const destino = document.getElementById("nossa_marca");

    link.addEventListener("click", function (e) {
        e.preventDefault(); // Impede o comportamento padrão de pular direto

        destino.scrollIntoView({
            behavior: "smooth"
        });
    });
});