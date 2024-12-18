<script>
export default {
  props: ['modelValue'],
  methods: {
    setSelect(e) {
      const statusSelect = e.target.value
      this.$emit('update:modelValue', statusSelect)
      // console.log(this.modelValue) // Перевірка
    },
  },
}
</script>

<template>
  <div className="select">
    <label for="">Status</label>
    <select @change="setSelect" :value="modelValue" name="">
      <option value="all">All</option>
      <option value="active">active</option>
      <option value="completed">completed</option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.select {
  display: flex;
  gap: 10px;
  label {
    color: aliceblue;
    font-size: 20px;
  }
}
</style>
