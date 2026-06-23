<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "../stores/taskStore.js";
import { IonPage, IonButtons, IonContent, IonHeader, IonBackButton, onIonViewWillEnter, IonTitle } from '@ionic/vue';

const route = useRoute();
const taskStore = useTaskStore();

const task = ref(null)

onIonViewWillEnter(() => {
  task.value = taskStore.tasks.find((t) => t.id === Number(route.params.id));
});

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
        <p>ID: {{ task.id }}</p>
        <p>
        Status:
        {{ task.done ? "Done" : "Not Done" }}
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-button {
  height: 40px;
  width: 40px; 
}
ion-content div {
  padding: 30px;
}
</style>

