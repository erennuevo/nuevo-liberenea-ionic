import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref([]);
  const nextId = ref(1);

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
  }

  function toggleTask(id) {
    const task = tasks.value.find((task) => task.id === id);
    task.done = !task.done;
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
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
  }
});
