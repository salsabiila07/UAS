const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTask = document.getElementById("totalTask");
const completedTask = document.getElementById("completedTask");
const notification = document.getElementById("notification");

function updateStats() {
  const allTasks = document.querySelectorAll("li");
  const doneTasks = document.querySelectorAll("li.completed");
  totalTask.textContent = allTasks.length;
  completedTask.textContent = doneTasks.length;
}

function showNotification(msg) {
  notification.textContent = msg;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 1500);
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    showNotification("⚠️ Tugas tidak boleh kosong!");
    return;
  }

  const li = document.createElement("li");

  const left = document.createElement("div");
  left.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = text;

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    updateStats();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.innerHTML = "🗑";
  deleteBtn.onclick = () => {
    li.remove();
    updateStats();
    showNotification("Tugas dihapus 🗑");
  };

  left.appendChild(checkbox);
  left.appendChild(span);

  li.appendChild(left);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
  taskInput.value = "";
  updateStats();
  showNotification("Tugas ditambahkan ✅");
}

// Event listeners
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});
