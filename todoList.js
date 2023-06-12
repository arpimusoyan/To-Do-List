
let tasks = [];

document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const deadlineInput = document.getElementById("deadlineInput");

    if (taskInput.value.trim() !== "") {
        const task = {
            text: taskInput.value.trim(),
            deadline: new Date(deadlineInput.value),
            completed: false
        };
        tasks.push(task);

    
        taskInput.value = "";
        deadlineInput.value = "";

        renderTasks();
    }
});

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function modifyTask(index) {
    const newText = prompt("Enter new text for the task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        renderTasks();
    }
}

function markAsCompleted(index) {
    tasks[index].completed = true;
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let completedCount = 0;
    let approachingDeadline = false;

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function () {
            markAsCompleted(i);
        });
        listItem.appendChild(checkbox);

        const text = document.createElement("span");
        text.textContent = task.text;
        if (task.completed) {
            text.classList.add("completed");
            completedCount++;
        } else if (task.deadline - new Date() < 0) {
            text.classList.add("red");
        } else if (task.deadline - new Date() < 24 * 60 * 60 * 1000) {
            approachingDeadline = true;
        }

        listItem.appendChild(text);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteTask(i);
        });
        listItem.appendChild(deleteButton);

        const modifyButton = document.createElement("button");
        modifyButton.textContent = "Modify";
        modifyButton.addEventListener("click", function () {
            modifyTask(i);
        });
        listItem.appendChild(modifyButton);

        taskList.appendChild(listItem);
    }

    const summary = document.createElement("p");
    summary.textContent = "Completed: " + completedCount + " | Not Completed: " + (tasks.length - completedCount);
    taskList.appendChild(summary);

    if (approachingDeadline) {
        alert("Task deadline is approaching!");
    }
}
