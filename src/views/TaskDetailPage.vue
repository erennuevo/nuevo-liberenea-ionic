<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Camera } from '@capacitor/camera'
import { useTaskStore } from "../stores/taskStore.js";
import { IonPage, IonButtons, IonContent, IonHeader, IonBackButton, IonIcon, IonModal,
         IonChip, IonText, IonToolbar,
         IonTitle, IonImg, IonFab, IonFabButton, IonDatetime, IonDatetimeButton } from '@ionic/vue';
import { cameraOutline } from "ionicons/icons";

const route = useRoute();
const taskStore = useTaskStore();
const { addPhotoToTask, setDueDate } = taskStore;

const task = computed(() =>
  taskStore.tasks.find((t) => t.id === Number(route.params.id))
);

function handleUpdate(event, taskId) {
  const selectedDate = event.detail.value;
  taskStore.setDueDate(taskId, selectedDate);
}

async function capturePhoto() {
  try {
    const photo = await Camera.takePhoto({
      includeMetadata: true,
      quality: 90
    });
    addPhotoToTask(task.value.id, photo.webPath);
  } catch (e) {
    const error = e;
    console.error(error)
  }
}

</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Details</ion-title>
        <ion-buttons slot="start">
        <ion-back-button default-href="/tabs/tasks"></ion-back-button>
      </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="task" class="container">
        <h1>{{ task.name }}</h1>

        <ion-list lines="none">
          <ion-item>
            <ion-text style="font-size: small; color: grey;">Status</ion-text>
            <ion-chip :color="task.done ? 'success' : 'danger'" style="margin: 5px 20px">
              {{ task.done ? "Done" : "Not Done" }}
            </ion-chip>
          </ion-item>

          <ion-item>
            <ion-text style="font-size: small; color: grey;">Due Date</ion-text>
            
            <ion-datetime-button datetime="datetime" style="margin: 5px;"></ion-datetime-button> 
            
            <ion-modal :keep-contents-mounted="true"> 
              <ion-datetime 
                id="datetime" 
                presentation="date"
                :value="task.dueDate"
                @ionChange="handleUpdate($event, task.id)">
              </ion-datetime> 
            </ion-modal>
          </ion-item>
        </ion-list>

        <ion-fab slot="fixed" vertical="bottom" horizontal="end">
          <ion-fab-button color="secondary">
            <ion-icon :icon="cameraOutline" 
              @click="capturePhoto">
            </ion-icon>
          </ion-fab-button>
        </ion-fab>

        <ion-img v-if="task.photo" :src="task.photo"></ion-img>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-button {
  height: 40px;
  width: 40px; 
  object-fit: cover;
}

ion-img {
  margin: 15px
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly; 
}

ion-select {
  /* Reduce the height */
  --min-height: 32px; 
  /* Reduce internal padding */
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-top: 0;
  --padding-bottom: 0;
  
  /* Shrink the font size to match smaller stature */
  font-size: 0.85rem;
}
</style>
