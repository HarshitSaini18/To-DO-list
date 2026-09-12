const header = document.getElementById("header");
const dateDisplay = document.getElementById("date-display");
const taskInput = document.getElementById("task-input");
const newTask = document.getElementById("new-task");
const addBtn = document.getElementById("add-btn");
const navigationBtn = document.getElementById("navigation-btn");
const allBtn = document.getElementById("all-btn");
const activeBtn = document.getElementById("active-btn");
const completedBtn = document.getElementById("completed-btn");
const startScreen = document.getElementById("start-screen");
const allScreen = document.getElementById("all-screen");
const checkbox = document.getElementById("checkbox");
const activeScreen = document.getElementById("active-screen");
const completedScreen = document.getElementById("completed-screen");
const taskInfo = document.getElementById("task-info");
const taskLeft = document.getElementById("task-left");
const clear = document.getElementById("clear");
const taskAll = document.getElementById("task-all");
const taskAct = document.getElementById("task-act");
const taskComp = document.getElementById("task-comp");
const deleteBtn = document.querySelectorAll(".delete-btn");
// Variable

const today = new Date();
const options = { weekday: "short", month: "short", day: "numeric" };
const date = today.toLocaleDateString("en-US", options);
dateDisplay.textContent = date;
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
filterAll();

// Eventlistener

addBtn.addEventListener("click", () => {
  addEvent(newTask.value);
});

newTask.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addEvent(newTask.value);
  }
});

clear.addEventListener("click", clearTask);

allBtn.addEventListener("click", filterAll);

activeBtn.addEventListener("click", filterActive);

completedBtn.addEventListener("click", filterCompleted);

// Functions

function filterAll() {
  listType = "all";
  const listItems = document.querySelectorAll("#task-all li");
  taskLeft.textContent = listItems.length;
  allBtn.classList.add("selected");
  completedBtn.classList.remove("selected");
  activeBtn.classList.remove("selected");
  completedBtn.classList.add("unselected");
  activeBtn.classList.add("unselected");
  rendertasks();
}

function filterCompleted() {
  listType = "comp";
  const listItems = document.querySelectorAll("#task-comp li");
  taskLeft.textContent = listItems.length;
  completedBtn.classList.add("selected");
  activeBtn.classList.remove("selected");
  allBtn.classList.remove("selected");
  activeBtn.classList.add("unselected");
  allBtn.classList.add("unselected");
  rendertasks();
}

function filterActive() {
  listType = "active";
  const listItems = document.querySelectorAll("#task-act li");
  taskLeft.textContent = listItems.length;
  activeBtn.classList.add("selected");
  completedBtn.classList.remove("selected");
  allBtn.classList.remove("selected");
  completedBtn.classList.add("unselected");
  allBtn.classList.add("unselected");
  rendertasks();
}

function addEvent(text) {
  if (text === "") {
    return;
  }
  const task = {
    id: Date.now(),
    text,
    completed: false,
  };
  taskLeft.textContent++;
  tasks.push(task);
  newTask.value = "";
  savetasks();
  rendertasks();
}

function savetasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function rendertasks() {
  taskAll.innerHTML = "";
  taskAct.innerHTML = "";
  taskComp.innerHTML = "";

  tasks.forEach((task) => {
    const liAll = document.createElement("li");
    const deleteBtnAll = document.createElement("button");
    const checkboxAll = document.createElement("input");
    const spanAll = document.createElement("span");

    checkboxAll.type = "checkbox";
    checkboxAll.checked = task.completed;
    deleteBtnAll.className = "delete-btn";
    deleteBtnAll.innerHTML = "&times;";
    spanAll.textContent = task.text;

    checkboxAll.addEventListener("change", (e) => {
      task.completed = e.target.checked;
      savetasks();
      rendertasks();
    });

    deleteBtnAll.addEventListener("click", () => {
      deleteTask(task.id);
    });

    liAll.appendChild(checkboxAll);
    liAll.appendChild(spanAll);
    liAll.appendChild(deleteBtnAll);

    // other

    const liOther = document.createElement("li");
    const checkboxOther = document.createElement("input");
    const spanOther = document.createElement("span");
    const deleteBtnOther = document.createElement("button");

    checkboxOther.type = "checkbox";
    checkboxOther.checked = task.completed;
    spanOther.textContent = task.text;
    deleteBtnOther.className = "delete-btn";
    deleteBtnOther.innerHTML = "&times;";

    checkboxOther.addEventListener("change", (e) => {
      task.completed = e.target.checked;
      savetasks();
      rendertasks();
    });

    deleteBtnOther.addEventListener("click", () => {
      deleteTask(task.id);
    });

    liOther.appendChild(checkboxOther);
    liOther.appendChild(spanOther);
    liOther.appendChild(deleteBtnOther);

    if (task.completed === true) {
      checkboxOther.classList.remove(
        "checkbox-selected",
        "checkbox-unselected"
      );
      checkboxOther.classList.add("checkbox-selected");
      taskComp.appendChild(liOther);

      checkboxAll.classList.remove("checkbox-selected", "checkbox-unselected");
      checkboxAll.classList.add("checkbox-selected");
      taskAll.appendChild(liAll);
    } else {
      checkboxOther.classList.remove(
        "checkbox-selected",
        "checkbox-unselected"
      );
      checkboxOther.classList.add("checkbox-unselected");
      taskAct.appendChild(liOther);

      checkboxAll.classList.remove("checkbox-selected", "checkbox-unselected");
      checkboxAll.classList.add("checkbox-unselected");
      taskAll.appendChild(liAll);
    }
  });
  checkType();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  savetasks();
  rendertasks();
}

function clearTask() {
  tasks = tasks.filter((task) => !task.completed);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  //   localStorage.removeItem("tasks");
  rendertasks();
  checkType();
}

function checkType() {
  startScreen.classList.remove("active");
  allScreen.classList.remove("active");
  activeScreen.classList.remove("active");
  completedScreen.classList.remove("active");

  if (listType === "all") {
    const listItems = document.querySelectorAll("#task-all li");
    taskLeft.textContent = listItems.length;
    if (+taskLeft.textContent === 0) {
      startScreen.classList.add("active");
    } else {
      allScreen.classList.add("active");
    }
  }
  if (listType === "active") {
    const listItems = document.querySelectorAll("#task-act li");
    taskLeft.textContent = listItems.length;
    if (+taskLeft.textContent === 0) {
      startScreen.classList.add("active");
    } else {
      activeScreen.classList.add("active");
    }
  }
  if (listType === "comp") {
    const listItems = document.querySelectorAll("#task-comp li");
    taskLeft.textContent = listItems.length;
    if (+taskLeft.textContent === 0) {
      startScreen.classList.add("active");
    } else {
      completedScreen.classList.add("active");
    }
  }
}

rendertasks();
