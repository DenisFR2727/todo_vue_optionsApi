<script>
export default {
  name: 'AppSlots',
}
</script>
<template>
  <div>
    <h1>
      <slot />
    </h1>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: greenyellow;
  font-size: 30px;
}
</style>
