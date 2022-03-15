<template lang="">
  <div class="facts-list">
    <el-button type="primary" loading v-if="loading">Loading</el-button>
    <el-alert
      v-else-if="error"
      :title="error"
      type="error"
      :closable="false"
      center
    />
    <SingleFact v-else :fact="fact" :editFact="editFct" />
  </div>
</template>

<script>
import SingleFact from "../components/SingleFact.vue";
import { getFact, editFact } from "../composables/facts";

export default {
  name: "Details",
  props: ["id"],
  components: { SingleFact },
  setup(props) {
    const { fact, error, loading, getFactFn } = getFact(props.id);

    getFactFn();

    const editFct = async (id, data) => {
      const {
        fact: updatedFact,
        error: updateError,
        loading: loadingUpdate,
        editFactFn,
      } = editFact(id, data);

      await editFactFn();

      if (!updateError.value) fact.value = updatedFact.value;

      return { error: updateError, loading: loadingUpdate, updatedFact };
    };

    return { fact, error, loading, editFct };
  },
};
</script>

<style>
.facts-list {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
