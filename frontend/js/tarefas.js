
const token = localStorage.getItem('token');
if (!token) window.location.href = 'index.html';

async function carregarTarefas() {
  const res = await fetch('http://localhost:3000/tasks', {
    headers: { 'Authorization': token }
  });
  const tarefas = await res.json();
  const lista = document.getElementById('lista');
  lista.innerHTML = '';
  tarefas.forEach(tarefa => {
    const li = document.createElement('li');
    li.textContent = tarefa.title;
    lista.appendChild(li);
  });
}

async function criarTarefa() {
  const titulo = document.getElementById('novaTarefa').value;
  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ title: titulo })
  });
  carregarTarefas();
}

carregarTarefas();
