<template>
  <div class="facts-list">
    <SingleFact :fact="fact" v-for="fact in facts" :key="fact._id" />
  </div>
</template>

<script>
import SingleFact from "./SingleFact.vue";

export default {
  props: ["facts"],
  components: { SingleFact },
  setup(props) {},
};
</script>
