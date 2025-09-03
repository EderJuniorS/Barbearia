// js/main.js

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================
    // 1. INICIALIZAÇÃO DO CALENDÁRIO (FLATPICKR)
    // ==========================================================
    flatpickr("#data_agendamento", {
        locale: "pt", // Traduz para Português
        dateFormat: "Y-m-d", // Formato que o banco de dados espera
        minDate: "today", // Impede que o usuário selecione datas passadas
        altInput: true, // Mostra um formato amigável para o usuário
        altFormat: "d/m/Y", // Formato amigável (ex: 03/09/2025)
    });

    // ==========================================================
    // 2. CONFIGURAÇÃO E LÓGICA DO SUPABASE
    // ==========================================================
    const SUPABASE_URL = 'https://dqerhegphgxhcsgthzck.supabase.co'; // MANTENHA SUAS CHAVES AQUI
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxZXJoZWdwaGd4aGNzZ3RoemNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4OTQ1NTksImV4cCI6MjA3MjQ3MDU1OX0.EYrbAaTYW4mmP5dvHlgjq4TEokC8n5uCjgx0FFrSF1I'; // MANTENHA SUAS CHAVES AQUI

    const { createClient } = supabase;
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const form = document.querySelector('.form-container form');
    const submitButton = form.querySelector('.btn-enviar');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

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

        const { data, error } = await supabaseClient
            .from('agendamentos')
            .insert([agendamento]);

        if (error) {
            console.error('Erro do Supabase:', error);
            alert('Erro no agendamento: ' + error.message);
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar';
        } else {
            alert('Agendamento realizado com sucesso!');
            form.reset();
            // Limpa o calendário também
            document.querySelector("#data_agendamento")._flatpickr.clear();
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar';
        }
    });

    // ==========================================================
    // 3. LÓGICA DOS LINKS DO MENU
    // ==========================================================
    document.querySelectorAll('header nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // A função do botão Início foi removida para simplificar, 
    // pois o link '#' já leva para o topo da página.
});
