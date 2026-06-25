<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useTaskStore } from "./stores/taskStore.js";
import { onMounted } from "vue";

const taskStore = useTaskStore();
const { loadTasks } = taskStore;

onMounted(() => taskStore.loadTasks())
</script>
