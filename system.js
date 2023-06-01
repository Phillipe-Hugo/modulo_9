const nomeTarefas = [];
const tabelaTarefas = document.getElementById('tabela-tarefas');
const formTarefas = document.getElementById('form-tarefas');
const tbody = tabelaTarefas.querySelector('tbody');
const checkboxes = document.querySelectorAll('.concluida-checkbox');
const checkbox = document.querySelector("#checkbox");


tabelaTarefas.addEventListener('click', function (event) {
    const elementoClicado = event.target;

    if (elementoClicado.classList.contains('editar-tarefa')) {
        const linhaTarefa = elementoClicado.closest('tr');
        const nomeTarefaElement = linhaTarefa.querySelector('.nome-tarefa');
        const nomeTarefa = nomeTarefaElement.textContent;

        // Aqui você pode implementar a lógica de edição da tarefa
        const novoNomeTarefa = prompt('Digite o novo nome da tarefa', nomeTarefa);
        if (novoNomeTarefa) {
            nomeTarefaElement.textContent = novoNomeTarefa;
            const index = nomeTarefas.indexOf(nomeTarefa);
            nomeTarefas[index] = novoNomeTarefa;
        }
    }

    if (elementoClicado.classList.contains('remover-tarefa')) {
        const linhaTarefa = elementoClicado.closest('tr');
        const nomeTarefa = linhaTarefa.querySelector('.nome-tarefa').textContent;
        const index = nomeTarefas.indexOf(nomeTarefa);
        nomeTarefas.splice(index, 1);

        atualizarTabela();

        // Remova a linha da tabela (opcional)
        linhaTarefa.remove();
    }
});

formTarefas.addEventListener('submit', function (e) {
    e.preventDefault();

    adicionarTarefa();
    atualizarTabela();
    
});

function adicionarTarefa() {
    const inputNomeTarefa = document.getElementById('nome-tarefa');

    if (nomeTarefas.includes(inputNomeTarefa.value)) {
        alert(`A tarefa "${inputNomeTarefa.value}" já foi adicionada à lista.`);
    } else {
        nomeTarefas.push(inputNomeTarefa.value);
        inputNomeTarefa.value = '';
    }
}

function atualizarTabela() {
    let linhaTabelaTarefas = '';

    for (let i = 0; i < nomeTarefas.length; i++) {
        let linha = '<tr>';
        linha += `<td class="nome-tarefa">${nomeTarefas[i]}</td>`;
        linha += '<td><input type="checkbox" class="concluida-checkbox"</td>';
        linha += '<td><button class="editar-tarefa">Editar</button></td>';
        linha += '<td><button class="remover-tarefa">Remover</button></td>';
        linha += '</tr>';
        linhaTabelaTarefas += linha;
    }

    tbody.innerHTML = linhaTabelaTarefas;
}

$(document).ready(function () {
    $('.concluida-checkbox').change(function () {
        const isChecked = $(this).is(':checked');
        const nomeTarefa = $(this)
            .closest('tr')
            .find('.nome-tarefa');

        if (isChecked) {
            nomeTarefa.addClass('concluida');
        } else {
            nomeTarefa.removeClass('concluida');
        }
    });
});






atualizarTabela();

