let todos = [
    {
        id: "id1",
        name: "Do shopping",
        date: "30.11.2022",
    },
    {
        id: "id2",
        name: "Take a dog for a walk",
        date: "23.11.2022",
    },
    {
        id: "id3",
        name: "Make an appointment",
        date: "02.12.2022",
    }]   
        

//Model
const addTodo = () =>
{
    const selected_name = document.querySelector(".name");
    const selected_date = document.querySelector(".date");

    if(selected_name.value == '')
        return;

    todos.push({
        id: '' + new Date().getTime(),
        name: selected_name.value,
        date: selected_date.value,
    })
    render();
}

const deleteTodo = (idToDelete) =>
{
    todos = todos.filter(element => element.id != idToDelete);
    render();
}

//View
const render = () =>
{
    const todolist = document.querySelector(".todo-list");
    todolist.innerHTML = '';

    todos.forEach(todo => {
        let element = document.createElement("div");
        element.classList.add('todo');
        
        let task_name = document.createElement("span");
        element.append(task_name);
        task_name.classList.add('task-name');
        task_name.innerText = todo.name + " " + todo.date;

        let delete_button = document.createElement("button");
        delete_button.classList.add('button','delete');
        delete_button.innerText = "delete";
        delete_button.addEventListener("click", function (){
            deleteTodo(todo.id);});
        element.append(delete_button);

        todolist.append(element);
    })
}

//Control
const add_button = document.querySelector(".add");
add_button.addEventListener("click", addTodo);

render();