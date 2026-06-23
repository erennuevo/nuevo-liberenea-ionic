<script setup>
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/taskStore.js";
import { IonPage, IonList, IonContent, 
         IonFabButton, IonIcon, IonHeader, IonCheckbox } from '@ionic/vue';
import { trashOutline } from 'ionicons/icons';

const taskStore = useTaskStore();
const { doneCount, doneTasks } = storeToRefs(taskStore);
const { removeTask } = taskStore;

const router = useRouter();

const goToDetail = (id) => {
  router.push(`/tasks/${id}`)
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Finished Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-chip style="margin: 18px">Done ({{ doneCount }})</ion-chip>
      <div v-if="doneCount === 0" class="ion-padding ion-text-center">
        <ion-text color="medium">
          <p>There are currently no tasks.</p>
        </ion-text>
      </div>

      <ion-list>
        <div v-for="task in doneTasks" :key="task.id" class="task-item">
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
.task-item {
  padding: 16px 16px;
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
</style>
