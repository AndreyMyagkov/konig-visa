<template>
  <div class="kv-content__body">

    <!-- for desktop 2 columns-->
    <form class="kv-form kv-step6-postal_desktop">
      <div class="kv-row" v-for="(row, i) in postalServicesPrepared" :key="i">

        <div class="kv-form__item-wrap kv-form__col_half"  v-for="item in row" :key="item.id">
          <div class="kv-form__item kv-form__item_chb kv-form__item_light kv_height-100"
            :class="{
              'kv-form__item_error': error
            }"
          >
            <label class="kv-form-radio">
              <input type="radio" name="branch" :value="item.id" v-model="postalService" @change="postalChange(item)">
              <span class="kv-form-radio__mark">
                <svg><use href="#kv-icons_form_radio"></use></svg>
              </span>
              <span>
                <div class="kv-form-radio__title">{{item.name}}</div>
                <div class="kv-form-radio__text" v-html="item.description"></div>
            </span>
            </label>
            <div class="kv-form__badge">
              <div class="kv-price">
                {{item.price}}
                <span class="kv-price__currency">€</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </form>

    <!-- for mobile-->
    <form class="kv-form kv-step6-postal_mobile">
      <div class="kv-row kv-form__item-wrap" v-for="(item, i) in postalServices" :key="`mobile-${i}`">

          <div class="kv-form__item kv-form__item_chb kv-form__item_light kv_height-100">
            <label class="kv-form-radio">
              <input type="radio" name="branch" :value="item.id" v-model="postalServiceMobile" @change="postalChange(item)">
              <span class="kv-form-radio__mark">
                <svg><use href="#kv-icons_form_radio"></use></svg>
              </span>
              <span>
                <div class="kv-form-radio__title">{{item.name}}</div>
                <div class="kv-form-radio__text" v-html="item.description"></div>
            </span>
            </label>
            <div class="kv-form__badge">
              <div class="kv-price">
                {{item.price}}
                <span class="kv-price__currency">€</span>
              </div>
            </div>
          </div>

      </div>
    </form>

  </div>
</template>

<script>
//import * as arrayHelper from "@/helpers/array";
import {arrayToCols} from "@/helpers/array";

export default {
  name: "Step6",
  props: {
    postalServices: {
      type: Array,
      required: true
    },
    selectedPostalService: {
    },

  },
  data() {
    return {
      //postalService: null,
      //postalServiceMobile: null
      error: false
    }
  },
  methods: {
    postalChange(item) {
      this.error = false;
      this.$emit('change', item);
    },
    checkForm(){
      if (this.selectedPostalService === null) {
        this.error = true;
        this.$emit('showModal', this.$lng('common.checkFormPopup'), this.$lng('common.error'));
      }
    },
  },
  computed: {
    postalServicesPrepared() {
      return arrayToCols(this.postalServices, 2)
    },
    postalService: {
      get () {
        return this.selectedPostalService
      },
      set() {

      }

    },
    postalServiceMobile: {
      get () {
        return this.selectedPostalService
      },
      set() {

      }

    },
  },
  mounted() {
    this.$emit('active');
   // this.postalService = this.selectedPostalService;
   // this.postalServiceMobile = this.selectedPostalService;
  }
}
</script>

<style scoped>

</style>
