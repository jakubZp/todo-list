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
        done: false,
    },
    {
        id: "id2",
        name: "Take a dog for a walk",
        date: new Date("2022-11-23T12:00:00.000Z"),
        isEditing: false,
        done: false,
    },
    {
        id: "id3",
        name: "Make an appointment",
        date: new Date("2022-12-02T12:00:00.000Z"),
        isEditing: false,
        done: false,
    }]   
        
/*const isValid = (date) =>
{
    if(Object.prototype.toString.call(date === "[object Date]"))
    {
        if(!isNaN(date.getTime()))
            return 1;
        else
            return 0;
    }
    else
        return 0;
}*/

const dateFormater = (date) =>
{
    return new Date(date).toLocaleDateString();
}

const addTodo = () =>
{
    const selected_name = document.querySelector(".name");
    const date_input = document.querySelector(".date");

    if(selected_name.value == '' || date_input.value == '')
        return;

    let selected_date = new Date(`${date_input.value}T12:00:00.000Z`);

    todos.push({
        id: '' + new Date().getTime(),
        name: selected_name.value,
        date: selected_date,
        isEditing: false,
        done: false,
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
                if(edit_input_name.value != '' && edit_input_date.value != '')
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
        /* if(todo.date === null || todo.date === "Invalid Date" || todo.date === "1970-01-01")
            task_date.display = "none"; */

        element.append(task_date);

        let delete_button = document.createElement("button");//to disable it
        let edit_button = document.createElement("button"); 

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        if(todo.done === true)
        {
            checkbox.checked = true;
            delete_button.disabled = true;
            edit_button.disabled = true;
            element.style.backgroundColor = "rgba(8, 177, 223, 0.15";
        }    
        else
        {
            checkbox.checked = false;
            delete_button.disabled = false;
            edit_button.disabled = false;
            element.style.backgroundColor = "rgb(8, 177, 223)";
        }
            
        element.append(checkbox);

        checkbox.addEventListener("change", e =>{
            if(e.target.checked === true)
            {
                todo.done = true;
                saveTodos();
                render();
            }
            else
            {
                todo.done = false;
                saveTodos();
                render();
            }
        })
 
        edit_button.classList.add("button", "edit");
        edit_button.innerText = "edit";
        edit_button.addEventListener("click", function(){
            editTodo(todo);
        })
        element.append(edit_button);
  
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