// js/main.js

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================
    // 1. CONFIGURAÇÃO E LÓGICA DO SUPABASE
    // ==========================================================

    const SUPABASE_URL = 'https://dqerhegphgxhcsgthzck.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxZXJoZWdwaGd4aGNzZ3RoemNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4OTQ1NTksImV4cCI6MjA3MjQ3MDU1OX0.EYrbAaTYW4mmP5dvHlgjq4TEokC8n5uCjgx0FFrSF1I';

    // CORREÇÃO: Usamos a função createClient do objeto global supabase
    const { createClient } = supabase;
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const form = document.querySelector('.form-container form');
    const submitButton = form.querySelector('.btn-enviar');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const formData = new FormData(form);
        const agendamento = {
            servico: formData.get('servico'),
            nome: formData.get('nome'),
            celular: formData.get('celular'),
            email: formData.get('email'),
            data_agendamento: formData.get('data_agendamento'),
            horario_agendamento: formData.get('horario_agendamento'),
            observacao: formData.get('observacao')
        };

        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        const { data, error } = await supabaseClient // Usamos a variável corrigida
            .from('agendamentos')
            .insert([agendamento]);

        if (error) {
            console.error('Erro do Supabase:', error); // Mostra o erro detalhado no console do navegador
            alert('Erro no agendamento: ' + error.message);
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar';
        } else {
            alert('Agendamento realizado com sucesso!');
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar';
        }
    });


    // ==========================================================
    // 2. LÓGICA DOS LINKS DO MENU (DO SEU ANTIGO index.js)
    // ==========================================================

    // Botão Início
    const btnInicio = document.getElementById("btn-inicio");
    btnInicio.addEventListener("click", function (e) {
        e.preventDefault();
        const confirmar = confirm("Tem certeza que deseja recarregar a página? Dados não salvos podem ser perdidos.");
        if (confirmar) {
            location.reload();
        }
    });

    // Links com Scroll Suave
    document.querySelectorAll('header nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

});
