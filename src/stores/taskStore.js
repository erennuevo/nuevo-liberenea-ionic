import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences"

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref([]);
  const nextId = ref(1);
  const STORAGE_KEY = 'taskflow_tasks'

  const totalCount = computed(() => tasks.value.length);
  const doneCount = computed(
    () => tasks.value.filter((task) => task.done === true).length,
  );
  const pendingCount = computed(
    () => tasks.value.filter((task) => task.done === false).length,
  );
  const doneTasks = computed(
    () => tasks.value.filter((task) => task.done === true),
  );

  function addTask(newTask) {
    tasks.value.push({
      id: nextId.value++,
      name: newTask,
      done: false,
      priority: "low",
    });
    saveTasks();
  }

  function toggleTask(id) {
    const task = tasks.value.find((task) => task.id === id);
    task.done = !task.done;
    saveTasks();
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
    saveTasks();
  }

  function setDueDate(taskId, date) {
    const task = tasks.value.find(t => t.id === taskId)
    if (task) {
      task.dueDate = date
    }
    saveTasks();
  }
  
  function addPhotoToTask(taskId, photoPath) {
    const task = tasks.value.find(t => t.id === taskId)
    if (task) {
      task.photo = photoPath
    }
    saveTasks();
  }

  async function saveTasks() {
    const taskJson = JSON.stringify(tasks.value)
    await Preferences.set({
      key: STORAGE_KEY,
      value: taskJson,
    })
    console.log("saved tasks")
  }

  async function loadTasks() {
    try {
      const { value } = await Preferences.get({
        key: STORAGE_KEY,
      });

      if (value) {
        tasks.value = JSON.parse(value);

        if (tasks.value.length > 0) {
          const latest = tasks.value[tasks.value.length - 1]
          nextId.value = latest.id + 1;
        }
      }
    } catch (error) {
      console.error("Error loading tasks:", error)
    }
  }

  return {
    tasks,
    totalCount,
    doneCount,
    pendingCount,
    doneTasks,
    addTask,
    toggleTask,
    removeTask,
    setDueDate,
    addPhotoToTask,
    saveTasks,
    loadTasks
  }
});
