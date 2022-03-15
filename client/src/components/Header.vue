<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
    id="nav"
  >
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item index="/facts">Facts</el-menu-item>
  </el-menu>
</template>

<script>
import { computed, ref } from "vue";
import router from "../router";
import { useRoute } from "vue-router";

export default {
  setup() {
    const activeIndex = computed(() => useRoute().path);

    const handleSelect = (path) => {
      router.push(path);
    };

    return {
      activeIndex,
      handleSelect,
    };
  },
};
</script>
