<template>
  <div class="kv-content__bottom">

    <!-- Назад -->
    <div class="kv-content__prev"  v-if="currentStep > 1 && (currentStep <= 6) ">
      <div class="kv-content__btn">
        <button
            type="button"
            class="kv-step-button kv-step-button_left"

            @click="prev">
          <svg class="kv-step-button__icon"><use href="#kv-icons_back"></use></svg>
          <span class="kv-step-button__text">{{ $lng('common.btnPrev') }}</span>
        </button>
      </div>
    </div>
    <!-- /Назад -->

    <!-- Вперед -->
    <div class="kv-content__next"  v-if="currentStep <= 6">
      <div class="kv-content__btn">
        <div  @click="checkForm">
          <button
              type="button"
              class="kv-step-button kv-step-button_right"
              :class="{'kv-step-button_success': allowNext}"
              :disabled="!allowNext"
              @click="next">
            <span class="kv-step-button__text">{{ $lng('common.btnNext') }}</span>
            <svg class="kv-step-button__icon"><use href="#kv-icons_next"></use></svg>
          </button>
        </div>
      </div>
    </div>
    <!-- /Вперед -->

    <!-- шаг 7 -->
    <template v-if="currentStep === 7">
      <!--
      <div class="kv-content__btn">
        <button class="kv-step-button kv-step-button_save" type="button">
          <span class="kv-step-button__text">{{ $lng('common.btnSaveOrder') }}</span>
        </button>
      </div>
      -->
      <div class="kv-content__btn kv-content__btn_lg" v-if="position === 'bottom'">
        <button class="kv-step-button kv-step-button_book" type="button" @click="sendOrder">
          <span class="kv-step-button__text">{{ $lng('common.btnOrderAndPay') }}</span>
        </button>
      </div>
    </template>
    <!-- /шаг 7 -->

    <!-- шаг 8 -->
    <template v-if="currentStep === 8">
      <div class="kv-content__btn kv-content__btn_lg">
        <button
            class="kv-step-button kv-step-button_book"
            :disabled="!allowNext"
            type="button"
            @click="makePayment"
        >
          <span class="kv-step-button__text">{{ $lng('common.btnCommitOrder') }}</span>
        </button>
      </div>
    </template>
    <!-- /шаг 8 -->

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
    },
    position: {
      type: String
    }
  },
  methods: {
    prev() {
      this.$emit('prevStep')
    },
    next() {
      this.$emit('nextStep')
    },
    sendOrder() {
      this.$emit('sendOrder')
    },
    makePayment() {
      this.$emit('makePayment')
    },
    checkForm() {
      this.$emit('checkForm')
    }
  }
}
</script>
