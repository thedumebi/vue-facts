<template>
  <div class="about">
    <!-- Display the data with a structured table, element-ui is ready for use -->
    <el-button type="primary" loading v-if="loading">Loading</el-button>
    <el-alert
      v-else-if="error"
      :title="error"
      type="error"
      :closable="false"
      center
    />
    <FactsList v-else :facts="facts" :removeFact="removeFact" />
  </div>
</template>

<script>
import { getFacts } from "../composables/facts";
import FactsList from "@/components/FactsList.vue";

export default {
  name: "facts",
  components: { FactsList },
  setup() {
    const { facts, error, loading, getFactsFn } = getFacts();

    getFactsFn();

    const removeFact = (id) => {
      facts.value = facts.value.filter((fact) => fact._id !== id);
    };

    return {
      facts,
      loading,
      error,
      removeFact,
    };
  },
};
</script>
