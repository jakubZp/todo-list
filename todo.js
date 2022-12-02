let todos;

const savedTodos = JSON.parse(localStorage.getItem("todos"));
if(Array.isArray(savedTodos))
    todos = savedTodos;
else
    todos = [
    {
        id: "id1",
        name: "Do shopping",
        date: new Date("2022-11-30T12:00:00.000Z"),
        isEditing: false,
    },
    {
        id: "id2",
        name: "Take a dog for a walk",
        date: new Date("2022-11-23T12:00:00.000Z"),
        isEditing: false,
    },
    {
        id: "id3",
        name: "Make an appointment",
        date: new Date("2022-12-02T12:00:00.000Z"),
        isEditing: false,
    }]   
        
const dateFormater = (date) =>
{
    return new Date(date).toLocaleDateString();
}

const addTodo = () =>
{
    const selected_name = document.querySelector(".name");
    const date_input = document.querySelector(".date");

    if(selected_name.value == '')
        return;

    let selected_date = new Date(`${date_input.value}T12:00:00.000Z`);

    todos.push({
        id: '' + new Date().getTime(),
        name: selected_name.value,
        date: selected_date,
        isEditing: false,
    })
    saveTodos();
    render();
}

const deleteTodo = (idToDelete) =>
{
    todos = todos.filter(element => element.id != idToDelete);
    saveTodos();
    render();
}

const editTodo = (todo) =>
{
    todo.isEditing = true;
    render();
}

const updateTodo = (todo, new_name, new_date) =>
{
    todo.name = new_name.value;
    //todo.date = new_date.value;
    todo.date = new Date(`${new_date.value}T12:00:00.000Z`)
    todo.isEditing = false;
    saveTodos();
    render();
}

const saveTodos = () =>{
    localStorage.setItem("todos", JSON.stringify(todos));
}

const sortTodos = (direct) =>
{
    todos.sort(function(a,b){
        return (new Date(a.date).valueOf() * direct) - (new Date(b.date).valueOf() * direct);
    })
}

const render = () =>
{
    const todolist = document.querySelector(".todo-list");
    todolist.innerHTML = '';

    todos.forEach(todo => {
        let element = document.createElement("div");
        element.classList.add('todo');
        
        if(todo.isEditing == true)
        {
            let edit_input_name = document.createElement("input");
            edit_input_name.type = "text";
            edit_input_name.value = todo.name;
            element.append(edit_input_name);

            let edit_input_date = document.createElement("input");
            edit_input_date.type = "date";
            edit_input_date.value = todo.date;
            element.append(edit_input_date);

            let accept = document.createElement("button");
            accept.classList.add("button", "accept");
            accept.innerText = "accept";
            accept.addEventListener("click", function(){
                updateTodo(todo, edit_input_name, edit_input_date);
            })
            element.append(accept);

            todolist.append(element);
            return;
        }

        let task_name = document.createElement("span");
        task_name.classList.add('task-name');
        task_name.innerText = todo.name;
        element.append(task_name);

        let task_date = document.createElement("span");
        task_date.classList.add("task-name");
        task_date.innerText = dateFormater(todo.date);
        //task_date.innerText = todo.date;
        element.append(task_date);

        let edit_button = document.createElement("button");  
        edit_button.classList.add("button", "edit");
        edit_button.innerText = "edit";
        edit_button.addEventListener("click", function(){
            editTodo(todo);
        })
        element.append(edit_button);

        let delete_button = document.createElement("button");
        delete_button.classList.add('button','delete');
        delete_button.innerText = "delete";
        delete_button.addEventListener("click", function (){
            deleteTodo(todo.id);});
        element.append(delete_button);

        todolist.append(element);
    })
}

const add_button = document.querySelector(".add");
add_button.addEventListener("click", addTodo);

const default_button = document.querySelector(".default");
default_button.addEventListener("click", function(){
    if(confirm("Todo list will be restored to default settings"))
    {
        localStorage.removeItem("todos");
        window.location.reload();
        render();
    }
    else
        render();
});

let direct = 1;
const sort_button = document.querySelector(".sort");
sort_button.addEventListener("click", function(){
    sortTodos(direct);
    saveTodos();
    direct *= -1;
    render();
})

render();