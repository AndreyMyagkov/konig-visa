<template>
  <div class="kv-header__item kv-breadcrumps">
    <div class="kv-breadcrumps__inner">
      <div class="kv-breadcrumps__item" v-for="(item, i) in crumbs" :key="i">
        <span>{{item}}</span>&nbsp;
      </div>
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
