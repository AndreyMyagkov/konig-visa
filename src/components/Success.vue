<template>
  <div>
    <div class="kv-alert">
      ЗАКАЗ УСПЕШНО ОФОРМЛЕН!<br>
      Номер заказа: {{order}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Success",
  props: {
    order: {}
  }
}
</script>

<style scoped>

</style>
