document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================
    // 1. INICIALIZAÇÃO DO CALENDÁRIO (FLATPICKR)
    // ==========================================================
    flatpickr("#data_agendamento", {
        locale: "pt",
        dateFormat: "Y-m-d",
        minDate: "today",
        altInput: true,
        altFormat: "d/m/Y",
    });

    // ==========================================================
    // 2. LÓGICA DA MÁSCARA DE CELULAR (IMASK)
    // ==========================================================
    const celularInput = document.getElementById('celular');
    const maskOptions = {
        mask: '(00) 00000-0000'
    };
    const mask = IMask(celularInput, maskOptions);

    // ==========================================================
    // 3. LÓGICA DA GRADE DE HORÁRIOS
    // ==========================================================
    const horarioGrid = document.querySelector('.horario-grid');
    const horarioButtons = document.querySelectorAll('.horario-btn');
    const hiddenHorarioInput = document.querySelector('#horario_agendamento');

    horarioGrid.addEventListener('click', function(event) {
        if (event.target.classList.contains('horario-btn')) {
            horarioButtons.forEach(btn => btn.classList.remove('selected'));
            const selectedButton = event.target;
            selectedButton.classList.add('selected');
            hiddenHorarioInput.value = selectedButton.textContent;
        }
    });

    // ==========================================================
    // 4. CONFIGURAÇÃO E LÓGICA DO SUPABASE
    // ==========================================================
    const SUPABASE_URL = 'https://dqerhegphgxhcsgthzck.supabase.co'; // MANTENHA SUAS CHAVES
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxZXJoZWdwaGd4aGNzZ3RoemNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4OTQ1NTksImV4cCI6MjA3MjQ3MDU1OX0.EYrbAaTYW4mmP5dvHlgjq4TEokC8n5uCjgx0FFrSF1I'; // MANTENHA SUAS CHAVES

    const { createClient } = supabase;
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const form = document.querySelector('.form-container form');
    const submitButton = form.querySelector('.btn-enviar');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!hiddenHorarioInput.value) {
            alert('Por favor, selecione um horário.');
            return;
        }
        
        const celularValue = mask.unmaskedValue; 

        const agendamento = {
            servico: form.servico.value,
            nome: form.nome.value,
            celular: celularValue,
            email: form.email.value,
            data_agendamento: form.data_agendamento.value,
            horario_agendamento: form.horario_agendamento.value,
            observacao: form.observacao.value
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
            document.querySelector("#data_agendamento")._flatpickr.clear();
            horarioButtons.forEach(btn => btn.classList.remove('selected'));
            hiddenHorarioInput.value = '';
            mask.updateValue();

            submitButton.disabled = false;
            submitButton.textContent = 'Enviar';
        }
    });

    // ==========================================================
    // 5. LÓGICA DOS LINKS DO MENU
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
});
