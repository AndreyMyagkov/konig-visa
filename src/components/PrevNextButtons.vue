<template>
  <div class="kv-content__bottom">

    <!-- Назад -->
    <div class="kv-content__prev"  v-if="currentStep > 1 && (currentStep <= 6 || currentStep === 8) ">
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
    <!-- /Назад -->

    <!-- Вперед -->
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
    <!-- /Вперед -->

    <!-- шаг 7 -->
    <template v-if="currentStep === 7">
      <div class="kv-content__btn">
        <button class="kv-step-button kv-step-button_save" type="button" @click="prev">
          <span class="kv-step-button__text">Сохранить заявку</span>
        </button>
      </div>

      <div class="kv-content__btn kv-content__btn_lg">
        <button class="kv-step-button kv-step-button_book" type="button" @click="next">
          <span class="kv-step-button__text">Zahlungspflichtig buchen</span>
        </button>
      </div>
    </template>
    <!-- /шаг 7 -->

    <!-- шаг 7 -->
    <template v-if="currentStep === 8">
      <div class="kv-content__btn kv-content__btn_lg">
        <button class="kv-step-button kv-step-button_book" type="button">
          <span class="kv-step-button__text">Подать заявку на визу</span>
        </button>
      </div>
    </template>
    <!-- /шаг 7 -->

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
          this.$emit('setStep', {step: this.currentStep - 1, block: null})
      },
      next() {
        this.$emit('setStep', {step: this.currentStep + 1, block: null})
      }
  }
}
</script>

<style scoped>

</style>
