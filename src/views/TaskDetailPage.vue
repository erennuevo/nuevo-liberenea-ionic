<script setup>
import { onErrorCaptured, ref } from "vue";
import { useRoute } from "vue-router";
import { Camera, CameraResultType, CameraSource, MediaTypeSelection } from '@capacitor/camera'
import { useTaskStore } from "../stores/taskStore.js";
import { IonPage, IonButtons, IonContent, IonHeader, IonBackButton, onIonViewWillEnter, IonTitle, IonImg } from '@ionic/vue';
import { cameraOutline } from "ionicons/icons";

const route = useRoute();
const taskStore = useTaskStore();
const { addPhotoToTask } = taskStore;

const task = ref(null)

onIonViewWillEnter(() => {
  task.value = taskStore.tasks.find((t) => t.id === Number(route.params.id));
});

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

    <ion-content>
      <div v-if="task">
        <h1>{{ task.name }}</h1>
        <ion-text>ID: {{ task.id }}</ion-text>
        <br>
        <ion-text>
          Status:
          {{ task.done ? "Done" : "Not Done" }}
        </ion-text>
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
ion-content div {
  padding: 30px;
}
</style>

