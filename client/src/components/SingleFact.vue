<template>
  <el-card class="fact" shadow="hover">
    <template #header>
      <div class="fact-header">
        <span class="fact-header__title">{{ fact.type }}</span>
        <el-button class="button" type="text" @click="back">Back</el-button>
      </div>
    </template>

    <el-form label-position="top" label-width="200px">
      <el-form-item label="ID" p>
        <el-input v-model="fact._id" disabled />
      </el-form-item>

      <el-form-item>
        <el-col :span="11">
          <el-form-item label="Source">
            <el-input v-model="fact.source" disabled />
          </el-form-item>
        </el-col>

        <el-col :span="11">
          <el-form-item label="User ID">
            <el-input v-model="fact.user" disabled />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="Text">
        <el-input
          v-model="text"
          placeholder="Please input text"
          ref="input"
          :clearable="editing"
          :disabled="!editing"
        />
      </el-form-item>

      <el-form-item label="Type">
        <el-input
          v-model="type"
          placeholder="Please input type"
          :clearable="editing"
          :disabled="!editing"
        />
      </el-form-item>
    </el-form>

    <div class="btn">
      <el-button v-if="!editing" @click="focusInput">Edit</el-button>
      <el-button
        v-else
        @click="handleEdit()"
        :disabled="disabledBtnEdit"
        :loading="loadingEdit"
      >
        Submit </el-button
      ><el-popconfirm
        title="Are you sure to delete this?"
        confirm-button-text="YES"
        cancel-button-text="NO"
        @confirm="handleDelete"
      >
        <template #reference>
          <el-button
            size="large"
            type="danger"
            :disabled="disabledBtnDelete"
            :loading="loadingDelete"
            >Delete</el-button
          ></template
        ></el-popconfirm
      >
    </div>
  </el-card>
</template>

<script>
import { ref } from "vue";
import { goBack, goTo } from "../composables/router";
import { deleteFact } from "../composables/facts";
import { ElNotification } from "element-plus";

export default {
  props: ["fact", "editFact"],
  setup(props) {
    const input = ref(null);
    const editing = ref(false);
    const text = ref(props.fact.text);
    const type = ref(props.fact.type);
    const disabledBtnDelete = ref(false);
    const loadingDelete = ref(false);
    const loadingEdit = ref(false);
    const disabledBtnEdit = ref(false);

    const back = () => goBack();

    const focusInput = () => {
      editing.value = true;
      input.value.focus();
    };

    const handleEdit = async () => {
      const { error, loading, updatedFact } = await props.editFact(
        props.fact._id,
        {
          text: text.value,
          type: type.value,
        }
      );

      disabledBtnDelete.value = loading.value;
      loadingDelete.value = loading.value;

      if (error.value) {
        ElNotification({
          title: "Could not delete",
          message: error.value,
          type: "error",
        });
      } else if (updatedFact.value) {
        ElNotification({
          title: "Success",
          message: "Fact updated successfully",
          type: "success",
        });
      }
    };

    const handleDelete = async () => {
      const { message, error, loading, deleteFactFn } = deleteFact(
        props.fact._id
      );

      await deleteFactFn();

      disabledBtnDelete.value = loading.value;
      loadingDelete.value = loading.value;

      if (error.value) {
        ElNotification({
          title: "Could not delete",
          message: error.value,
          type: "error",
        });
      } else if (message.value) {
        ElNotification({
          title: "Fact deleted",
          message: message.value.message,
          type: "success",
        });
        goTo("/facts");
      }
    };

    return {
      back,
      text,
      type,
      input,
      editing,
      focusInput,
      handleEdit,
      loadingEdit,
      handleDelete,
      loadingDelete,
      disabledBtnDelete,
      disabledBtnEdit,
    };
  },
};
</script>

<style>
.fact {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 50rem;
}

.el-card__header {
  width: 100%;
}

.fact-header {
  display: flex;
  justify-content: space-between;
}

.fact-header__title {
  font-size: 2rem;
  font-weight: bold;
}

.el-card__body {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-content: center;
  justify-content: center;
}

.el-form {
  align-self: center;
  width: 100%;
  margin-bottom: 2rem;
}

.el-form-item {
  margin-bottom: 8px;
}

.el-form-item__content {
  justify-content: space-between;
}

.el-input__inner {
  min-height: 3rem;
  height: auto;
  word-wrap: break-word;
}
</style>
