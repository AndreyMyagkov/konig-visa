<template>
  <div class="kv-content__header">
    <div class="kv-content__icon">
      <!-- TODO: пусть к иконке - встроить иконки инлайново -->
      <svg><use :href="`img/icons/icons.svg#${icon}`"></use></svg>
    </div>

    <div class="kv-content__title">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'StepHeader',
  props: {
    "icon": {
      "type": String,
      "default": 'default',
      "required": false
    },
    "text": {
      "type": String
    },
  }
}
</script>

<style scoped>

</style>
