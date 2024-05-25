const titleInput = document.getElementById('title')
const descriptionInput = document.getElementById('description')
const statusInput = document.getElementById('status')
const dueDateInput = document.getElementById('due-date');
const toDoForm = document.getElementById('to-do');
const taskList = document.getElementById('task-list')
const submitBtn = document.getElementById('submit-btn');

toDoForm.addEventListener('submit',submitToDo);

async function submitToDo(e){
    e.preventDefault();
    submitBtn.innerHTML = "Submit"
    let obj = {
        title:titleInput.value,
        description:descriptionInput.value,
        status:statusInput.value,
        dueDate:dueDateInput.value
    }

    const toDo = await axios.post('http://localhost:6600/add-task',obj);

    toDoForm.reset();

    showTasks(toDo.data);


}

function showTasks(obj){
    const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.id = obj.id;

        const todoTitle = document.createElement('div');
        todoTitle.classList.add('todo-title');
        todoTitle.textContent = `Title: ${obj.title}`;
        todoItem.appendChild(todoTitle);

        const todoDescription = document.createElement('div');
        todoDescription.classList.add('todo-description');
        todoDescription.textContent = `Description: ${obj.description}`;
        todoItem.appendChild(todoDescription);

        const todoStatus = document.createElement('div');
        todoStatus.classList.add('todo-status');
        todoStatus.textContent = `Status: ${obj.status}`;
        todoItem.appendChild(todoStatus);

        const todoDueDate = document.createElement('div');
        todoDueDate.classList.add('todo-dueDate');
        todoDueDate.textContent = `Due Date: ${obj.dueDate}`;
        todoItem.appendChild(todoDueDate);

        const todoActions = document.createElement('div');
        todoActions.classList.add('todo-actions');

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', async () => {
            let result = await axios.get(`http://localhost:6600/get-task/${obj.id}`);
            
            titleInput.value = result.data.title;
            descriptionInput.value = result.data.description;
            statusInput.value = result.data.status;
            dueDateInput.value = result.data.dueDate;

            deleteTask(obj.id)
            submitBtn.innerHTML = "Update";

            
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            deleteTask(obj.id)
        });

        todoActions.appendChild(editBtn);
        todoActions.appendChild(deleteBtn);

        todoItem.appendChild(todoActions);


        taskList.appendChild(todoItem)

}

window.addEventListener('DOMContentLoaded', async() => {
    try{
    const tasks = await axios.get('http://localhost:6600/get-tasks')
    tasks.data.forEach((task) => {
        showTasks(task);
    })
}
catch(err){
    console.log(err);
}
})



async function deleteTask(id){
    const todoItem = document.getElementById(id);
    const result = await axios.get(`http://localhost:6600/delete-task/${id}`);
    taskList.removeChild(todoItem);
    
}

