import { defineStore } from "pinia";
import { reactive } from "vue";
import useFetchMessages from "../api/useFetchMessages";

export const useMessagesStore = defineStore("messages", () => {
  const state = reactive({ messages: [] });

  const fetchMessages = async (offset) => {
    const { data, error } = await useFetchMessages(offset);
    if (data && !error) {
      console.log(data);
      state.messages = data;
    }
    return { data, error };
  };

  const insertMessage = (message) => {
    state.messages.unshift(message);
  };

  return { state, fetchMessages, insertMessage };
});
