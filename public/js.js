jQuery(function ($) {
    const createID = '_' + Math.random().toString(36).substr(2, 9);

    const card = `<form action="" novalidate class="card">
        <div class="card-header"><input type="text" placeholder="Nome da tarefa"></div>
        <div class="card-body">
            <div class="card-text clearfix">
                <button class="btn btn-danger btn-sm float-left delete-card" type="button"><i class="fas fa-trash-alt"></i>Excluir</button>
                <button class="btn btn-success btn-sm float-right complete-card invisible" type="button" title="Tarefa completa"><i class="fas fa-check" aria-hidden="true"></i></button>
                <button class="btn btn-success btn-sm float-right save-card" type="submit"><i class="fas fa-edit"></i>Salvar</button>
            </div>
        </div>
    </form>`;

    const deleteCard = function () {
        $(this).parents('.card').remove();
    };

    const addCard = function () {
        $('.todo-list.todo').prepend(card);
        $('.card').on('click', '.save-card', saveCard);
        cardEvents();
    };

    const saveCard = function (e) {
        e.preventDefault();
        const parent = $(this).parents('.card');
        const input = parent.find('input').first();
        const value = input.val();
        const cardText = parent.find('.card-text');

        if (value !== '') {
            input.remove();

            parent.addClass('saved').find('.card-header').text(value);

            cardText
                .find('.save-card, .update-card')
                .remove()
                .end()
                .append('<button class="btn btn-warning btn-sm float-right edit-card" type="button"><i class="fas fa-edit"></i>Editar</button>');

            if (cardText.find('.complete-card').hasClass('invisible')) cardText.find('.complete-card').removeClass('invisible');

        } else {
            alert('Nome da tarefa obrigatório!');
        }
    };

    const editCard = function () {
        const parent = $(this).parents('.card');
        const task = parent.find('.card-header').text();
        parent
            .find('.card-header')
            .html(`<input type="text" placeholder="Nome da tarefa" value="${task}">`);
        parent
            .find('.edit-card').remove()
            .end().find('.card-text')
            .append('<button class="btn btn-success btn-sm float-right update-card" type="submit"><i class="fas fa-edit"></i>Atualizar</button>');
    };

    const completeCard = function () {
        const completed = $(this).parents('.card').clone();
        $(this).parents('.card').remove();

        completed
            .find('.complete-card').remove()
            .end().find('.edit-card').remove();

        $('.todo-list.done').append(completed);
        $('.card').on('click', '.delete-card', deleteCard);
    };

    const cardEvents = function () {
        $('.card').on('click', '.edit-card', editCard);
        $('.card').on('click', '.delete-card', deleteCard);
        $('.card').on('click', '.update-card', saveCard);
    };

    $('.complete-card', '.todo').each(function () {
        $(this).click(completeCard);
    });

    $('.add-task').on('click', 'button', addCard);

    cardEvents();
});