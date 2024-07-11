const alerta = document.querySelector('.alerta');
let listaTarefas = {};
// let idGlobal = 1;

// Ação do button
const btnCadastrar = document.querySelector('#btnCadastrar');
btnCadastrar.addEventListener('click', function (evento) {
    // Previne o comportamento padrão (do formulário)
    evento.preventDefault();

    if (!receberDados()) {
        return;
    }

    cadastrarTarefa(listaTarefas);
});

function receberDados() {
    const titulo = document.querySelector('#titulo');

    // Verifica se foi preenchido o titulo
    if (validarDados(titulo.value)) {
        titulo.focus();
        alerta.innerHTML = 'Preencha o campo título';
        return false;
        // Early return (retorno antecipado)
    }

    // Verifica se foi preenchido a descricao
    const descricao = document.querySelector('#descricao');
    if (validarDados(descricao.value)) {
        descricao.focus();
        alerta.innerHTML = 'Preencha o campo descrição';
        return false;
    }

    // Adiciona o objeto no array
    // listaTarefas.push(
    //     {
    //         id: idGlobal++,
    //         titulo: titulo.value,
    //         descricao: descricao.value,
    //     }
    // );
    listaTarefas = {
        // id: idGlobal++,
        titulo: titulo.value,
        descricao: descricao.value,
    };

    return true;
}

function validarDados(campo) {
    // Se o campo for diferente de '', retorna true, senão retorna false
    return campo != '' ? false : true;

    // É o mesma validação
    // if (campo != '') {
    //     return false;
    // } else {
    //     return true;
    // }
}

function cadastrarTarefa(listaTarefas) {
    const id = gerenciarID();
    const titulo = listaTarefas.titulo;
    const descricao = listaTarefas.descricao;

    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.push({ id, titulo, descricao });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    alerta.style.color = '#00c02a';
    alerta.innerHTML = 'Tarefa cadastrada';
    listarTarefas();
}

function listarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    const tarefasListadas = document.createElement('div')

    const adicionarTarefas = tarefas.map(tarefa => {
        return `ID: ${tarefa.id}\nTítulo: ${tarefa.titulo}\nDescrição: ${tarefa.descricao}`;
    });

    const novasTarefasListadas = document.createTextNode(adicionarTarefas)

    tarefasListadas.appendChild(novasTarefasListadas)

    document.body.appendChild(tarefasListadas);
    
}

listarTarefas();



function gerenciarID() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    if (tarefas.length < 1) {
        return 1;

    } else {
        const maiorID = tarefas.reduce((max, obj) => obj.id > max.id ? obj : max, tarefas[0]);
        return maiorID.id + 1;
    }

}



function excluirTarefa(id) {
    // Busca a lista de tarefas em LocalStorage
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    const localizaId = tarefas.findIndex(tarefa => tarefa.id === id);

    if (localizaId !== -1) {

        // Exclui o objeto na posição indicada
        tarefas.splice(localizaId, 1);

        // Atualiza a lista de tarefas em LocalStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    } else {
        console.log(`não encontrado a exclusão`);
    }
}

document.querySelector('#btnExcluir').addEventListener('click', () => {
    excluirTarefa(5);
});

