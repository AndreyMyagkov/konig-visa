<template>
  <div>
    {{icon}} {{text}}
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
