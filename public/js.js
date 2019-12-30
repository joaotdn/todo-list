jQuery(function ($) {
    const card = `<div class="card">
        <div class="card-header"><input type="text" placeholder="Nome da tarefa"></div>
        <div class="card-body">
            <div class="card-text clearfix">
                <button class="btn btn-danger btn-sm float-left delete-card" type="button"><i class="fas fa-trash-alt"></i>Excluir</button>
                <button class="btn btn-success btn-sm float-right complete-card d-none" type="button" title="Tarefa completa"><i class="fas fa-check" aria-hidden="true"></i></button>
                <button class="btn btn-warning btn-sm float-right edit-card d-none" type="button"><i class="fas fa-edit"></i>Editar</button>
                <button class="btn btn-success btn-sm float-right save-card" type="button"><i class="fas fa-edit"></i>Salvar</button>
                <button class="btn btn-success btn-sm float-right update-card d-none" type="button"><i class="fas fa-edit"></i>Atualizar</button>
            </div>
        </div>
    </div>`;

    const addBtn = $('button', '.add-task');

    const deleteCard = function () {
        const parent = $(this).parents('.card');
        const id = parent.attr('id');

        $.ajax({
            url: `/delete/${id}`,
            type: 'get'
        })
            .always(function () {
                parent.remove();
            });
    };

    const addCard = function () {
        if (!addBtn.hasClass('disabled')) {
            $('.todo-list.todo').prepend(card);
            $('.card', '.todo-list.todo').first().attr('id', `_${Math.random().toString(36).substr(2, 9)}`);
            $('.card').on('click', '.save-card', saveCard);
            addBtn.addClass('disabled');
            cardEvents();
        } else {
            alert('Salve a tarefa antes de adicionar uma nova.');
        }
    };

    const saveCard = function (e) {
        e.preventDefault();
        const parent = $(this).parents('.card');
        const input = parent.find('input').first();
        const name = input.val();
        const cardText = parent.find('.card-text');
        const id = parent.attr('id');

        console.log(name);

        if (name !== '') {
            $.ajax({
                url: '/todo/',
                type: 'POST',
                data: {name, id}
            })
                .always(function () {
                    input.remove();
                    parent.find('.card-header').text(name);
                    cardText.find('.save-card, .update-card').addClass('d-none');
                    if (cardText.find('.complete-card').hasClass('d-none') || cardText.find('.edit-card').hasClass('d-none')) {
                        cardText.find('.complete-card').removeClass('d-none');
                        cardText.find('.edit-card').removeClass('d-none');
                    }
                    addBtn.removeClass('disabled');
                });
        } else {
            alert('Nome da tarefa obrigatório!');
        }
    };

    const editCard = function () {
        const parent = $(this).parents('.card');
        const task = parent.find('.card-header').text();

        $(this).addClass('d-none');
        parent.find('.update-card').removeClass('d-none');
        parent.find('.complete-card').addClass('d-none');

        parent.find('.card-header')
            .text('')
            .append(`<input type="text" placeholder="Nome da tarefa" value="${task}">`);
    };

    const updateCard = function () {
        const parent = $(this).parents('.card');
        const id = parent.attr('id');
        const name = parent.find('.card-header').find('input').val();
        $(this).addClass('d-none');

        if (name !== '') {
            $.ajax({
                url: `/edit/${id}/`,
                type: 'get',
                data: { name }
            })
                .always(function () {
                    parent.find('.edit-card').removeClass('d-none');
                    parent.find('.complete-card').removeClass('d-none');
                    parent.find('.card-header > input').remove();
                    parent.find('.card-header').text(name);
                });
        } else {
            alert('Nome da tarefa obrigatório!');
        }
    };

    const completeCard = function () {
        const completed = $(this).parents('.card');
        const id = completed.attr('id');
        $(this).parents('.card').remove();

        $.ajax({
            url: `/complete/${id}`,
            type: 'get'
        })
            .always(function () {
                completed
                    .find('.complete-card').remove()
                    .end().find('.edit-card').remove();
                $('.todo-list.done').append(completed);
            });
    };

    const cardEvents = function () {
        $('.edit-card').on('click', editCard);
        $('.delete-card').on('click', deleteCard);
        $('.update-card').on('click', updateCard);
        $('.complete-card').on('click', completeCard);
    };

    $('.add-task').on('click', 'button', addCard);

    cardEvents();
});