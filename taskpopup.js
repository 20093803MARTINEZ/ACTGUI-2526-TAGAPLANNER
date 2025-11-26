document.addEventListener("DOMContentLoaded", () => {

    const popupOverlay = document.querySelector(".popup-overlay");
    const closeBtn = document.querySelector(".close-btn");
    const plusBtn = document.querySelector(".plus-sign");
    const undoBtn = document.querySelector(".undo-btn");
    const markCompleteBtn = document.querySelector(".mark-complete");
    const deleteBtn = document.querySelector(".delete");
    const taskList = document.querySelector(".task-list");
  
    const addTaskModal = document.querySelector(".add-task-modal");
    const closeTaskModalBtn = document.querySelector("#close-task-modal");
    const saveTaskBtn = document.querySelector("#save-task");
    const taskNameInput = document.querySelector("#task-name");
    const taskTimeInput = document.querySelector("#task-time");
  
    let lastDeleted = null; // For undo feature
  
    // -----------------------------
    // CLOSE POPUP
    // -----------------------------
    closeBtn.addEventListener("click", () => {
      popupOverlay.style.display = "none";
    });
  
    // -----------------------------
    // OPEN POPUP
    // -----------------------------
    plusBtn.addEventListener("click", () => {
      addTaskModal.style.display = "flex";  // Open the Add Task modal
    });
  
    // -----------------------------
    // CLOSE ADD TASK MODAL
    // -----------------------------
    closeTaskModalBtn.addEventListener("click", () => {
      addTaskModal.style.display = "none";  // Close the modal
      taskNameInput.value = '';  // Clear input fields
      taskTimeInput.value = '';
    });
  
    // -----------------------------
    // SAVE NEW TASK
    // -----------------------------
    saveTaskBtn.addEventListener("click", () => {
      const taskName = taskNameInput.value.trim();
      const taskTime = taskTimeInput.value.trim();
  
      if (!taskName || !taskTime) {
        alert("Please fill in both task name and time.");
        return;
      }
  
      // Create new task element
      const newTask = document.createElement("div");
      newTask.classList.add("task");
      newTask.innerHTML = `
        <strong>${taskName}</strong>
        <p>${taskTime}</p>
        <button class="task-delete-btn">DELETE</button>
      `;
  
      // Add event listener for deleting this new task
      const taskDeleteBtn = newTask.querySelector(".task-delete-btn");
      taskDeleteBtn.addEventListener("click", () => {
        taskList.removeChild(newTask);
        lastDeleted = newTask; // Save for undo
      });
  
      // Append the new task to the list
      taskList.appendChild(newTask);
  
      // Close the modal and clear inputs
      addTaskModal.style.display = "none";
      taskNameInput.value = '';
      taskTimeInput.value = '';
    });
  
    // -----------------------------
    // DELETE SELECTED TASK
    // -----------------------------
    deleteBtn.addEventListener("click", () => {
      const selected = document.querySelector(".task.selected");
      if (!selected) return alert("Select a task first.");
  
      lastDeleted = selected;
      selected.remove();
    });
  
    // -----------------------------
    // MARK SELECTED TASK AS COMPLETE
    // -----------------------------
    markCompleteBtn.addEventListener("click", () => {
      const selected = document.querySelector(".task.selected");
      if (!selected) return alert("Select a task first.");
  
      selected.classList.toggle("completed");
    });
  
    // -----------------------------
    // UNDO LAST DELETE
    // -----------------------------
    undoBtn.addEventListener("click", () => {
      if (lastDeleted) {
        taskList.appendChild(lastDeleted);
        lastDeleted = null;
      }
    });
  
    // -----------------------------
    // CLICK TO SELECT TASK
    // -----------------------------
    document.querySelectorAll(".task").forEach(task => {
      task.addEventListener("click", () => {
        document.querySelectorAll(".task").forEach(t => t.classList.remove("selected"));
        task.classList.add("selected");
      });
    });
  
  });
  