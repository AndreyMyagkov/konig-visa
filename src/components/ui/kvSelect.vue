<template>
  <div class="kv-select">
    <div class="kv-select__badge">
      <svg class="kv-select__icon"><use href="img/icons/icons.svg#pin"></use></svg>
    </div>
    <select class="kv-select__input">
      <option value="0">Выберите</option>
      <option value="2">option 1</option>
      <option value="3">option 2</option>
      <option value="4">option 3</option>
      <option value="5">option 4</option>
      <option value="6">option 5</option>
      <option value="5">option 6</option>
      <option value="6">option 7</option>
      <option value="3">option 2</option>
      <option value="4">option 3</option>
      <option value="5">option 4</option>
      <option value="6">option 5</option>
      <option value="5">option 6</option>
      <option value="6">option 7</option>
    </select>
    <svg class="kv-selct__arrow">
      <use href="img/icons/icons.svg#arrow_down"></use>
    </svg>
  </div>
</template>

<script>
export default {
name: "kvSelect"
}
</script>

<style scoped>

</style>
