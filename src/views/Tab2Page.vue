<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/taskStore.js";
import { IonPage, IonItem, IonList, IonButton, IonContent, 
         IonFabButton, IonIcon, IonHeader, IonInput, IonCheckbox, IonFab } from '@ionic/vue';
import { add, trashOutline } from 'ionicons/icons';

const taskStore = useTaskStore();
const { doneCount, doneTasks } = storeToRefs(taskStore);

const route = useRoute();

const router = useRouter();

const goToDetail = (id) => {
  router.push(`/tasks/${id}`)
}
</script>

<template>
  <ion-page>
    <ion-header>
      <h1>📝 Finished Tasks</h1>
      <p>
        Done: {{ doneCount }}
      </p>
    </ion-header>

    <ion-content>
      <ion-item v-if="doneTasks.length === 0">
        There are currently no finished tasks.
      </ion-item>

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
h1 {
  color: #1b2a4a;
  padding: 16px;
  margin: 0;
}

.error-banner {
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 16px;
  color: #92400e;
  font-size: 14px;
}

.empty-state {
  color: #718096;
  font-style: italic;
  padding: 16px 0;
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

ion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
}

ion-header p {
  font-size: 12px;
}
</style>
