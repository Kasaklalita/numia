<template>
  <div class="message-form">
    <input type="text" class="input" v-model="message" />
    <button class="submit" @click="onSubmit">Отправить</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useMessagesStore } from "../store/messages";

const messagesStore = useMessagesStore();
const toast = useToast();

const message = ref("");

const onSubmit = () => {
  message.value = message.value.trim();
  if (message.value.length === 0) {
    toast.error("Сообщение не должно быть пустым!");
  } else {
    messagesStore.insertMessage(message.value);
    toast.success("Сообщение успешно добавлено!");
  }
};
</script>

<style scoped>
.message-form {
  display: flex;
  justify-content: space-between;
}
.input {
  width: 100%;
  box-shadow: 0px 1px 8px 0px rgba(34, 60, 80, 0.2);
}
.submit {
  padding: 0.5rem;
  background: #f1f1f1;
}
</style>
