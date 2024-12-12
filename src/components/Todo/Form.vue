<script>
export default {
  props: {
    addNewTask: {
      type: Function,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateTitle(event) {
      this.$emit('update:title', event.target.value)
    },
  },
}
</script>

<template>
  <form @submit.prevent="addNewTask" :prevent="onChange">
    <input :value="title" @input="updateTitle" type="text" name="title" />
    <button>Add a new task</button>
  </form>
</template>

<style lang="scss" scoped>
form {
  display: flex;
  gap: 20px;
  input {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    font-size: 18px;
  }
  button {
    padding: 10px;
    width: 200px;
    background-color: rgb(49, 217, 220);
    border: none;
    cursor: pointer;
    user-select: none;
    text-transform: uppercase;
    color: aliceblue;
    font-weight: 700;
  }
}
</style>
