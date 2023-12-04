let tasks = [
  {
    id: 1,
    description: "Terminar desafio",
    completed: false,
  },
  {
    id: 2,
    description: "poner despertador",
    completed: false,
  },
  {
    id: 3,
    description: "leer la porción",
    completed: false,
  },
];

let contadorId = 4;

const updateTaskList = () => {
  const taskListContainer = document.getElementById("taskList");
  const indexNewTask = tasks.length - 1;
  const task = tasks[indexNewTask];

  const taskElement = document.createElement("li");
  taskElement.className = "list-group-item";
  taskElement.id = `task${task.id}OnList`;

  const numberId = document.createElement("p");
  numberId.textContent = task.id;

  const taskDescription = document.createElement("label");
  taskDescription.textContent = task.description;
  taskDescription.className = "form-check-label";
  taskDescription.htmlFor = `task${task.id}checkBox`;
  taskDescription.id = `task${task.id}OnLabel`;

  const checkBox = document.createElement("input");
  checkBox.className = "form-check-input me-1";
  checkBox.type = "checkbox";
  checkBox.value = "option";
  checkBox.id = `task${task.id}checkBox`;

  const bottonDelete = document.createElement("button");
  bottonDelete.type = "button";
  bottonDelete.className = "btn btn-danger";
  bottonDelete.id = `task${task.id}btn`;
  bottonDelete.textContent = "X";
  taskElement.appendChild(numberId);
  taskElement.appendChild(checkBox);
  taskElement.appendChild(taskDescription);
  taskElement.appendChild(bottonDelete);
  taskListContainer.appendChild(taskElement);
  updateTaskCount();
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const description = taskInput.value.trim();

  if (description !== "") {
    const newTask = {
      id: contadorId,
      description: description,
      completed: false,
    };

    tasks.push(newTask);
  }
  taskInput.value = "";
  updateTaskList();
  return contadorId++
};

const updateTaskCount = () => {
  const totalTasksElement = document.getElementById("totalTasks");
  const completedTasksElement = document.getElementById("completedTasks");

  totalTasksElement.textContent = tasks.length;
  completedTasksElement.textContent = tasks.filter(
    (task) => task.completed
  ).length;
};

const bottonAdd = document.querySelector("#buttonAdd");

bottonAdd.addEventListener("click", addTask);

const updateTaskStatus = () => {
  tasks.forEach((task) => {
    const checkBox = document.querySelector(`#task${task.id}checkBox`);
    task.completed = checkBox.checked;
    const taskDescription = document.querySelector(`#task${task.id}OnLabel`);
    task.completed
      ? (taskDescription.style.textDecorationLine = "line-through")
      : (taskDescription.style.textDecorationLine = "none");
  });
  updateTaskCount();
};

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskCount();
}

function encontrarIndicePorId(id) {
    return tasks.findIndex(objeto => objeto.id === id);
  }
  

document.addEventListener("DOMContentLoaded", function () {
  const taskListContainer = document.getElementById("taskList");

  taskListContainer.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("btn-danger")) {
      const idDelBotonClickeado = event.target.id;
      const numeroExtraido = idDelBotonClickeado.replace(/\D/g, '')
      if (numeroExtraido !== "") {
        const numero = parseInt(numeroExtraido, 10);
        const elemenToDelete = document.getElementById(`task${numero}OnList`);
        elemenToDelete.remove();
        const indiceToDelete = encontrarIndicePorId(numero);
        deleteTask(indiceToDelete)
        updateTaskCount();
    }
    
    }
  });

  document.addEventListener("change", function (event) {
    const target = event.target;

    if (target.tagName === "INPUT" && target.type === "checkbox") {
      updateTaskStatus();
    }
  });
});
