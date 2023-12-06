let tasks = [
  {
    id: "9t2r",
    description: "Terminar desafio",
    completed: false,
  },
  {
    id: "0cm3",
    description: "poner despertador",
    completed: false,
  },
  {
    id: "p0e3",
    description: "leer la porción",
    completed: false,
  },
];

const taskListDom = document.querySelector("#taskList");
const bottonAdd = document.querySelector("#buttonAdd");
const input = document.getElementById("taskInput");

bottonAdd.addEventListener("click", () => {
  if (input.value === "") return;
  tasks.push({
    id: Math.random().toString(36).slice(9),
    description: input.value,
  });
  updateTaskList();
  input.value = "";
});

const updateTaskList = () => {
  taskListDom.innerHTML = tasks
    .map(
      (task) => `
  <li class="list-group-item"> 
  <p>${task.id}</p>
  <input class="form-check-input me-1" type="checkbox" value="option" onClick="checkBox('${
    task.id
  }')" ${task.completed ? "checked" : ""}>
  <p>${task.description} </p>
  <button type="button" class="btn btn-danger" onClick="deleteTask('${
    task.id
  }')">X</button>
</li> `
    )
    .join("");
  updateTaskCount();
  console.log(tasks);
};

const updateTaskCount = () => {
  const totalTasksElement = document.getElementById("totalTasks");
  const completedTasksElement = document.getElementById("completedTasks");

  totalTasksElement.textContent = tasks.length;
  completedTasksElement.textContent = tasks.filter(
    (task) => task.completed
  ).length;
};

const checkBox = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  tasks[index].completed = !tasks[index].completed;

  updateTaskList();
};

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  tasks.splice(index, 1);
  updateTaskList();
};

updateTaskList();
