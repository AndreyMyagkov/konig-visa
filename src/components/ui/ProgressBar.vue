<template>
  <div class="kv-header__item kv-progress">
    <div class="kv-progress__inner">
      <div class="kv-progress__step">{{$lng('common.step')}} №{{now}}</div>
      <div class="kv-progress__pipe">
        <div class="kv-progress__strip" :style="`--kv-progress: ${percentage}%`"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    now: {
      type: Number,
      required: true
    },
    all: {
      type: Number,
      required: true
    }
  },
  computed: {
    /**
     * Возращает текущий шаг в процентах
     * @return {number}
     */
    percentage() {
      return Math.ceil(this.now * 100 / this.all)
    },
  }
};
</script>

<style scoped>
</style>
