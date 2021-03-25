<template>
  <div class="kv-content__bottom">

    <div class="kv-content__prev"  v-if="currentStep > 1 && currentStep <= 6">
      <div class="kv-content__btn">
        <button
            type="button"
            class="kv-step-button kv-step-button_left"

            @click="prev">
          <svg class="kv-step-button__icon"><use href="img/icons/icons.svg#back"></use></svg>
          <span class="kv-step-button__text">Назад</span>
        </button>
      </div>
    </div>

    <div class="kv-content__next"  v-if="currentStep <= 6">
      <div class="kv-content__btn">
        <button
            type="button"
            class="kv-step-button kv-step-button_right"
            :class="{'kv-step-button_success': allowNext}"
            :disabled="!allowNext"
            @click="next">
          <span class="kv-step-button__text">Вперёд</span>
          <svg class="kv-step-button__icon"><use href="img/icons/icons.svg#next"></use></svg></button>
      </div>
    </div>

    <template v-if="currentStep === 7">
      <div class="kv-content__btn">
        <button class="kv-step-button kv-step-button_save" type="button">
          <span class="kv-step-button__text">Сохранить заявку</span>
        </button>
      </div>

      <div class="kv-content__btn kv-content__btn_lg">
        <button class="kv-step-button kv-step-button_book" type="button">
          <span class="kv-step-button__text">Zahlungspflichtig buchen</span>
        </button>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: "PrevNextButtons",
  props: {
    currentStep: {
      type: Number,
    },
    allowNext: {
      type: Boolean
    }
  },
  methods: {
      prev() {
          this.$emit('setStep', this.currentStep - 1)
      },
      next() {
        this.$emit('setStep', this.currentStep + 1)
      }
  }
}
</script>

<style scoped>

</style>
