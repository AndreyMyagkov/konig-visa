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
        <div  > <!--@click="checkForm"-->
          <button
              type="button"
              class="kv-step-button kv-step-button_right"
              :class="{
                'kv-step-button_success': allowNext,
                'kv-step-button_disabled': !allowNext
              }"
              :disabledd="!allowNext"
              @click="next"
              >
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

      <div class="kv-st7-footer"  v-if="position === 'bottom'">
        <div class="kv-st7-footer__row">

          <div class="kv-st7-footer__col">
            <div class="kv-st7-footer__header">
              <svg class=" kv-icon__completed"><use href="#kv-icons_completed"></use></svg>
              <span>Sichere Datenübertragung</span></div>
            <div class="kv-st7-footer__text">Sicher und verschlüsselte Übertragung Ihrer Zahlungsdaten</div>
          </div>


          <div class="kv-st7-footer__col">
            <div class="kv-st7-footer__header">
              <svg class=" kv-icon__completed"><use href="#kv-icons_completed"></use></svg>
              <span>Wir sind für Sie da </span></div>
            <div class="kv-st7-footer__text">Erstklassiger Kundendienst, auf den Sie zählen können</div>
          </div>

          <div class="kv-st7-footer__col">
            <div class="kv-st7-footer__header">
              <svg class=" kv-icon__completed"><use href="#kv-icons_completed"></use></svg>
              <span>Immer der günstigste Preis</span></div>
            <div class="kv-st7-footer__text">Bei uns erhalten Sie immer den besten Deal</div>
          </div>

        </div>
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
      if (!this.allowNext) {
        this.$emit('checkForm')
      } else {
        this.$emit('nextStep')
      }
    },
    sendOrder() {
      this.$emit('sendOrder')
    },
    makePayment() {
      this.$emit('makePayment')
    }
  }
}
</script>
