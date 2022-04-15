//Selectors
const TodoInput = document.querySelector('.todo-input');
const TodoButton = document.querySelector('.todo-button');
const TodoList = document.querySelector('.todo-list');
const Filter = document.querySelector('.filter');
const CheckAllButton = document.querySelector('.checkall-button')
const RemoveAllButton = document.querySelector('.removeall-button')


//Event Listeners
TodoButton.addEventListener('click', AddTodo);
TodoList.addEventListener('click', DeleteCheck);
Filter.addEventListener('click', TodoFilter);
document.addEventListener('DOMContentLoaded', GetTodos);
CheckAllButton.addEventListener('click', CheckAll);
RemoveAllButton.addEventListener('click', DeleteAll);

//Functions
function AddTodo(event) {
    event.preventDefault();

    const TodoDiv = document.createElement('div');
    TodoDiv.classList.add('todo');

    const NewTodo = document.createElement('li');
    NewTodo.innerText = TodoInput.value;
    NewTodo.classList.add('todo-item');
    TodoDiv.appendChild(NewTodo);
    
    LocalTodos(TodoInput.value);

    const CheckButton = document.createElement('button');
    CheckButton.innerHTML = '<i class="fas fa-check"></i>';
    CheckButton.classList.add('check-button');
    TodoDiv.appendChild(CheckButton);

    const DeleteButton = document.createElement('button');
    DeleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    DeleteButton.classList.add('delete-button');
    TodoDiv.appendChild(DeleteButton);

    TodoInput.value ="";

    TodoList.appendChild(TodoDiv);
}

function DeleteCheck(event) {
    const item = event.target;
    
    if (item.classList[0] === 'delete-button') {
        const todo = item.parentElement;

        todo.classList.add('fade');
        ClearLocalStorage(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();            
        });
    }

    if (item.classList[0] === 'check-button') {
        const todo = item.parentElement;
        todo.classList.toggle('checked');
    }
}

function TodoFilter(event) {
    const todos = TodoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "checked":
                if (todo.classList.contains("checked")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "incompleted":
                if (todo.classList.contains("checked")) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
                break;
        }
    });
}

function LocalTodos(todo) {
    let Todos;
    if (localStorage.getItem('Todos') === null) {
        Todos = [];
    } else {
        Todos = JSON.parse(localStorage.getItem("Todos"));
    }
    Todos.push(todo);
    localStorage.setItem('Todos', JSON.stringify(Todos));
}

function GetTodos() {
    let Todos;
    if (localStorage.getItem('Todos') === null) {
        Todos = [];
    } else {
        Todos = JSON.parse(localStorage.getItem("Todos"));
    }
    Todos.forEach(function(todo) {
        const TodoDiv = document.createElement('div');
        TodoDiv.classList.add('todo');

        const NewTodo = document.createElement('li');
        NewTodo.innerText = todo;
        NewTodo.classList.add('todo-item');
        TodoDiv.appendChild(NewTodo);

        const CheckButton = document.createElement('button');
        CheckButton.innerHTML = '<i class="fas fa-check"></i>';
        CheckButton.classList.add('check-button');
        TodoDiv.appendChild(CheckButton);

        const DeleteButton = document.createElement('button');
        DeleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        DeleteButton.classList.add('delete-button');
        TodoDiv.appendChild(DeleteButton);

        TodoList.appendChild(TodoDiv);
    });
}

function ClearLocalStorage(todo) {
    let Todos;
    if (localStorage.getItem('Todos') === null) {
        Todos = [];
    } else {
        Todos = JSON.parse(localStorage.getItem("Todos"));
    }

    const TodoIndex = todo.children[0].innerText;
    Todos.splice(Todos.indexOf(TodoIndex), 1);
    localStorage.setItem('Todos', JSON.stringify(Todos));
}

function CheckAll(event) {
    event.preventDefault();
    const todos = TodoList.childNodes;
    todos.forEach(function(todo) {
        todo.classList.add('checked');
    });
}

function DeleteAll(event) {
    event.preventDefault();
    const todos = TodoList.childNodes;
    if (confirm('Are you sure you wish to remove all items?')) {
        todos.forEach(function(todo) {
            todo.classList.add('fade');
            ClearLocalStorage(todo);
            todo.addEventListener('transitionend', function() {
                todo.remove();            
            });
        });
    }
}