<template>
  <!-- <div class="facts-list">
    <SingleFact :fact="fact" v-for="fact in facts" :key="fact._id" />
  </div> -->
  <el-table :data="facts" stripe style="width: 100%">
    <el-table-column label="Status">
      <el-table-column prop="status.verified" label="Verified" width="80" />
    </el-table-column>
    <el-table-column label="Details">
      <el-table-column prop="_id" label="ID" width="200" />
      <el-table-column prop="type" label="Type" width="70" />
      <el-table-column label="Text">
        <template #default="scope">
          <div class="fact-text">
            {{ `${scope.row.text.substring(0, 30)} ...` }}
            <el-button
              size="small"
              type="text"
              @click="goToDetails(scope.row._id)"
              >more</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="user" label="User" />
      <el-table-column label="Operations" width="150">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row._id, scope.row)"
            >Edit</el-button
          >
          <el-popconfirm
            title="Are you sure to delete this?"
            confirm-button-text="YES"
            cancel-button-text="NO"
            @confirm="handleDelete(scope.$index, scope.row._id)"
          >
            <template #reference>
              <el-button
                size="small"
                type="danger"
                :disabled="disabledBtn[scope.$index]"
                :loading="loadingDelete[scope.$index]"
                >Delete</el-button
              ></template
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
import SingleFact from "./SingleFact.vue";
import router from "@/router";
import { computed, ref } from "vue";
import { ElNotification } from "element-plus";
import { deleteFact } from "../composables/facts";

export default {
  props: ["facts", "removeFact"],
  components: { SingleFact },
  setup(props) {
    const loadingDelete = computed(() =>
      Array.from({ length: props.facts.length }, () => false)
    );

    const disabledBtn = computed(() =>
      Array.from({ length: props.facts.length }, () => false)
    );

    const goToDetails = (id) => {
      router.push({ name: "Details", params: { id } });
    };

    const handleEdit = (id, edit) => {
      router.push({ name: "Details", params: { id } });
    };

    const handleDelete = async (index, id) => {
      const { message, error, loading, deleteFactFn } = deleteFact(id);

      await deleteFactFn();

      disabledBtn.value[index] = loading.value;
      loadingDelete.value[index] = loading.value;

      if (error.value) {
        ElNotification({
          title: "Could not delete",
          message: error.value,
          type: "error",
        });
      } else if (message.value) {
        props.removeFact(id);
        ElNotification({
          title: "Fact deleted",
          message: message.value.message,
          type: "success",
        });
      }
    };

    return {
      goToDetails,
      loadingDelete,
      handleEdit,
      handleDelete,
      disabledBtn,
    };
  },
};
</script>

<style scoped>
.fact-text {
  cursor: pointer;
}
</style>
