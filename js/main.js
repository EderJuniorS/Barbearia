// js/main.js

// 1. CONFIGURAÇÃO DO SUPABASE
// Cole aqui a URL e a Chave ANON do seu projeto Supabase
const SUPABASE_URL = 'https://dqerhegphgxhcsgthzck.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxZXJoZWdwaGd4aGNzZ3RoemNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4OTQ1NTksImV4cCI6MjA3MjQ3MDU1OX0.EYrbAaTYW4mmP5dvHlgjq4TEokC8n5uCjgx0FFrSF1I';

// Inicializa o cliente do Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. LÓGICA DO FORMULÁRIO DE AGENDAMENTO
const form = document.querySelector('.form-container form');
const submitButton = form.querySelector('.btn-enviar');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    // Pega os dados do formulário
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

    // Feedback visual para o usuário
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    // Envia os dados para a tabela 'agendamentos' no Supabase
    const { data, error } = await supabase
        .from('agendamentos')
        .insert([agendamento]);

    // Trata a resposta
    if (error) {
        alert('Erro no agendamento: ' + error.message);
        // Reabilita o botão em caso de erro
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
    } else {
        alert('Agendamento realizado com sucesso!');
        form.reset(); // Limpa o formulário
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
    }
});

// 3. LÓGICA PARA SCROLL SUAVE DOS LINKS DO MENU (OPCIONAL, MAS RECOMENDADO)
document.querySelectorAll('header nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Ignora o link de "Início" que pode ter outra função
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});