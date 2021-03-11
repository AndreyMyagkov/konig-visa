<template>
  <div>
    <div v-for="(item, i) in crumbs" :key="i">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  props: {
    crumbs: Array
  }
}
</script>


<style scoped lang="scss">

</style>
