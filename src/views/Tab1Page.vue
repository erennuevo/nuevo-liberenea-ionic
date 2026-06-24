<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/taskStore.js";
import { IonPage, IonItem, IonList, IonContent, IonChip, IonText,
         IonFabButton, IonIcon, IonHeader, IonInput, IonCheckbox,
         IonToolbar, IonTitle, IonAvatar } from '@ionic/vue';
import { add, trashOutline } from 'ionicons/icons';

const router = useRouter();
const taskStore = useTaskStore();
const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore);
const { addTask, toggleTask, removeTask } = taskStore;

const newTaskName = ref("");
const filter = ref('all');

const goToDetail = (id) => {
  router.push(`/tabs/tasks/${id}`)
}

function handleAdd() {
  taskStore.addTask(newTaskName.value);
  newTaskName.value = "";
}

const filteredTasks = computed(() => {
  if (filter.value === 'done') return tasks.value.filter(t => t.done);
  if (filter.value === 'pending') return tasks.value.filter(t => !t.done);
  return tasks.value;
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div style="margin: 18px;">
        <ion-chip color="success" @click="filter = 'done'">
          Done ({{ doneCount }})
        </ion-chip>
        <ion-chip color="warning" @click="filter = 'pending'">
          Pending ({{ pendingCount }})
        </ion-chip>
        <ion-chip color="primary" @click="filter = 'all'">
          Total ({{ totalCount }})
        </ion-chip>
      </div>

      <ion-item>
        <ion-input
          v-model="newTaskName"
          label="Task"
          label-placement="floating"
          placeholder="New task..."
          @keyup.enter="handleAdd"
        />
        <ion-fab-button>
          <ion-icon :icon="add" @click="handleAdd"></ion-icon>
        </ion-fab-button>
      </ion-item>

      <div v-if="tasks.length === 0" class="ion-padding ion-text-center">
        <ion-text color="medium">
          <p>There are currently no tasks.</p>
        </ion-text>
      </div>

      <ion-list>
        <div v-for="task in filteredTasks" :key="task.id" class="task-item">
          
          <ion-avatar v-if="task.photo">
            <img :src="task.photo">
          </ion-avatar>
          <ion-checkbox
            v-model="task.done"
            @change="toggleTask(task.id)"
            label-placement="start"
          />
          <p :class="{ done: task.done }" 
          @click="goToDetail(task.id)">
            {{ task.name }}
          </p>
          <ion-fab-button color="danger">
            <ion-icon :icon="trashOutline" 
              @click="removeTask(task.id)">
            </ion-icon>
          </ion-fab-button>
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
h1 {
  color: #1b2a4a;
  padding: 16px;
  margin: 0;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  margin: 20px;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 12px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  justify-content: space-between;
}

.task-item:hover {
  border-color: #73c8ed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.task-item .done {
  text-decoration: line-through;
  color: #9ca3af;
}

ion-fab-button {
  flex-shrink: 0;
  width: 35px;
  height: 35px;
}

ion-item {
  --padding-end: 15px;
  overflow: visible;
  align-items: center;
}

ion-avatar {
  --border-radius: 4px;
}
</style>

