<template>
  <router-link :to="{ name: 'Details', params: { id: fact._id } }" class="fact">
    <div class="fact-data">
      <p class="fact-data__snippet">{{ snippet }}</p>

      <span>{{ fact.type }}</span>
    </div>
  </router-link>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["fact"],
  setup(props) {
    const snippet = computed(() => {
      return `${props.fact.text.substring(0, 30)} ...`;
    });

    return { snippet };
  },
};
</script>

<style scoped>
.fact {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 1rem;
  background-color: #ccc;
  margin-bottom: 1rem;
  width: 50%;
  border-radius: 20px;
  text-decoration: none;
  cursor: pointer;
  color: #282828;
}

.fact:hover {
    background-color: #282828;
    color: #ccc;
}
</style>
