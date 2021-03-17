<template>
  <div class="kv-buch__list" :class="{
    'kv-buch__list_scroll': data.length > 4
  }">
    <div class="kv-buch__list-item" v-for="item in data" :key="item.id" @click="change(item)">
      <label class="kv-buch-chb"
             :class="{
                'kv-buch-chb_marked': item.type === 'item'
             }">
        <input type="radio"  :name="`visa-type-${item.id}`" aria-label="checkbox" :checked="selected.indexOf(item.id) !== -1">
        <span class="kv-buch-chb__caption">
          <span class="kv-buch-chb__title">
            {{item.name}}
            <svg class="kv-buch-chb__icon"><use href="img/icons/icons.svg#next"></use></svg>
          </span>
          <span class="kv-buch-chb__badge" :title="item.description">
            <svg class="kv-buch-chb__info" v-if="item.description"><use href="img/icons/icons.svg#info"></use></svg>
            <!-- TODO: info окно -->
            <span v-html="item.description" style="display: none"></span>
          </span>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "VisaTypes",
  props: {
    data: {
      type: Array,
    },
    selected: {
      type: Array
    }
  },
  methods: {
    /**
     * Выбор элемента
     */
    change(item) {
      this.$emit('change', item)
    }
  }
}
</script>

<style scoped>

</style>
