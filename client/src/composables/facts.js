import { ref } from "vue";
import axios from "axios";

export const getFacts = () => {
  const facts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const getFactsFn = async () => {
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

  return {
    facts,
    error,
    loading,
    getFactsFn,
  };
};

export const getFact = (id) => {
  const fact = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const getFactFn = async () => {
    // Get data from backend
    try {
      loading.value = true;
      const result = await axios.get(`api/fromSource/${id}`);
      fact.value = result.data;
      loading.value = false;
    } catch (err) {
      loading.value = false;
      error.value =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
    }
  };

  return {
    fact,
    error,
    loading,
    getFactFn,
  };
};

export const deleteFact = (id) => {
  const message = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const deleteFactFn = async () => {
    try {
      loading.value = true;
      const result = await axios.delete(`api/fromSource/${id}/`);
      message.value = result.data;
      loading.value = false;
    } catch (err) {
      loading.value = false;
      error.value =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
    }
  };

  return {
    message,
    error,
    loading,
    deleteFactFn,
  };
};

export const editFact = (id, data) => {
  const fact = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const editFactFn = async () => {
    // Send data to backend
    try {
      loading.value = true;
      const result = await axios.patch(`api/fromSource/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fact.value = result.data;
      loading.value = false;
    } catch (err) {
      loading.value = false;
      error.value =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
    }
  };

  return {
    fact,
    error,
    loading,
    editFactFn,
  };
};
