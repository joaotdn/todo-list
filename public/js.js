jQuery(function ($) {
    const createID = '_' + Math.random().toString(36).substr(2, 9);

    const card = `<div class="card">
        <div class="card-header"><input type="text" placeholder="Nome da tarefa"></div>
        <div class="card-body">
            <div class="card-text clearfix">
                <button class="btn btn-danger btn-sm float-left delete-card" type="button"><i class="fas fa-trash-alt"></i>Excluir</button>
                <button class="btn btn-success btn-sm float-right save-card" type="button"><i class="fas fa-edit"></i>Salvar</button>
            </div>
        </div>
    </div>`;

    const deleteCard = function () {
        $(this).parents('.card').remove();
    };

    const addCard = function () {
        $('.todo-list.todo').prepend(card);
        $('.card').on('click', '.delete-card', deleteCard);
        $('.card').on('click', '.save-card', saveCard);
    };

    const saveCard = function () {
        const parent = $(this).parents('.card');
        const input = parent.find('input').first();
        const value = input.val();

        if (value !== '') {
            input.remove();

            parent.find('.card-header').text(value);

            parent
                .find('.card-text')
                .find('.save-card')
                .remove()
                .end()
                .append('<button class="btn btn-warning btn-sm float-right edit-card" type="button"><i class="fas fa-edit"></i>Editar</button>');

        } else {
            alert('Nome da tarefa obrigatório!');
        }
    };

    const editCard = function () {

    };

    $('.add-task').on('click', 'button', addCard);

    $('.card').on('click', '.delete-card', deleteCard);
});