<template>
  <div v-if="!isError" class="messages-container">
    <MessageCard
      v-for="message in messagesStore.state.messages"
      :key="message"
      :message="message"
    />
  </div>
  <p v-else>Ошибка загрузки сообщений</p>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import MessageCard from "./MessageCard.vue";
import { useMessagesStore } from "../store/messages";

const messagesStore = useMessagesStore();
const toast = useToast();

const isError = ref(false);

onMounted(async () => {
  const { data, error } = await messagesStore.fetchMessages();
  if (data && !error) {
    toast.success("Сообщения успешно загружены!");
  } else {
    toast.error("Что-то пошло не так :(");
    isError.value = false;
  }
});
</script>

<style scoped>
.messages-container {
  max-width: 750px;
  max-height: 750px;
  overflow-y: scroll;
  padding: 2rem;
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;
  background: #f1f1f1;
}
</style>
