<template>
  <div class="kv-content__header">
    <div class="kv-content__icon">
      <svg><use :href="`#kv-icons_${icon}`"></use></svg>
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
