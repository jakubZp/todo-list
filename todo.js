let todos = [
    {
        id: "id1",
        name: "Do shopping",
        date: "2022-11-30",
        //date: "30.11.2022",
        isEditing: false,
    },
    {
        id: "id2",
        name: "Take a dog for a walk",
        date: "2022-11-23",
        //date: "23.11.2022",
        isEditing: false,
    },
    {
        id: "id3",
        name: "Make an appointment",
        date: "2022-12-02",
        //date: "02.12.2022",
        isEditing: false,
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
        isEditing: false,
    })
    render();
}

const deleteTodo = (idToDelete) =>
{
    todos = todos.filter(element => element.id != idToDelete);
    render();
}

const editTodo = (todo) =>
{
    todo.isEditing = true;
    render();
}

const changeTodo = (todo, new_name, new_date) =>
{
    todo.name = new_name.value;
    todo.date = new_date.value;
    todo.isEditing = false;
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
                changeTodo(todo, edit_input_name, edit_input_date);
            })
            element.append(accept);

            todolist.append(element);
            return;
        }

        let task_name = document.createElement("span");
        task_name.classList.add('task-name');
        task_name.innerText = todo.name + " " + todo.date;
        element.append(task_name);

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

//Control
const add_button = document.querySelector(".add");
add_button.addEventListener("click", addTodo);

render();