$(document).ready(function () {
    const nomeTarefas = [];
    const tabelaTarefas = $('#tabela-tarefas');
    const formTarefas = $('#form-tarefas');
    const tbody = tabelaTarefas.find('tbody');
  
    tabelaTarefas.on('click', '.editar-tarefa', function () {
      const linhaTarefa = $(this).closest('tr');
      const nomeTarefaElement = linhaTarefa.find('.nome-tarefa');
      const nomeTarefa = nomeTarefaElement.text();
  
      const novoNomeTarefa = prompt('Digite o novo nome da tarefa', nomeTarefa);
      if (novoNomeTarefa) {
        nomeTarefaElement.text(novoNomeTarefa);
        const index = nomeTarefas.indexOf(nomeTarefa);
        nomeTarefas[index] = novoNomeTarefa;
      }
    });
  
    tabelaTarefas.on('click', '.remover-tarefa', function () {
      const linhaTarefa = $(this).closest('tr');
      const nomeTarefa = linhaTarefa.find('.nome-tarefa').text();
      const index = nomeTarefas.indexOf(nomeTarefa);
      nomeTarefas.splice(index, 1);
  
      linhaTarefa.remove();
    });
  
    formTarefas.on('submit', function (e) {
      e.preventDefault();
  
      const inputNomeTarefa = $('#nome-tarefa');
  
      if (nomeTarefas.includes(inputNomeTarefa.val())) {
        alert(`A tarefa "${inputNomeTarefa.val()}" já foi adicionada à lista.`);
      } else {
        nomeTarefas.push(inputNomeTarefa.val());
        inputNomeTarefa.val('');
  
        atualizarTabela();
      }
    });
  
    $(document).on('change', '.concluida-checkbox', function () {
        const isChecked = $(this).is(':checked');
        const nomeTarefa = $(this).closest('tr').find('.nome-tarefa');
      
        if (isChecked) {
          nomeTarefa.addClass('concluida');
        } else {
          nomeTarefa.removeClass('concluida');
        }
      });
      
  
    function atualizarTabela() {
      let linhaTabelaTarefas = '';
  
      for (let i = 0; i < nomeTarefas.length; i++) {
        let linha = '<tr>';
        linha += `<td class="nome-tarefa">${nomeTarefas[i]}</td>`;
        linha += '<td>';
        linha += '<input type="checkbox" id="idCheckd" class="concluida-checkbox concluida estilo-input">';
        linha += '<button class="editar-tarefa">Editar Tarefa</button>';
        linha += '<button class="remover-tarefa">Remover Tarefa</button>';
        linha += '</td>';
        linha += '</tr>';
        linhaTabelaTarefas += linha;
      }
  
      tbody.html(linhaTabelaTarefas);
    }
  });
  