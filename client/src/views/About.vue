<template>
  <div class="about">
    <!-- Display the data with a structured table, element-ui is ready for use -->
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else><FactsList :facts="facts" /></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import FactsList from "@/components/FactsList.vue";

export default {
  name: "facts",
  components: { FactsList },
  setup() {
    const facts = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const getFacts = async () => {
      // Get data from backend
      try {
        loading.value = true;
        const result = await axios.get("api/fromSource");
        facts.value = result.data;
        loading.value = false;
      } catch (err) {
        loading.value = false;
        error.value =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
      }
    };
    onMounted(() => {
      getFacts();
    });

    return {
      facts,
      loading,
      error,
    };
  },
};
</script>
