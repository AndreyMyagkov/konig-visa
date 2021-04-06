<template>
  <div class="kv-content__body">
    <div class="kv-form">

      <!-- From row-->

      <div class="kv-row" v-for="(row, i) in postalServicesPrepared" :key="i">

        <div class="kv-form__item-wrap kv-from__col"  v-for="item in row" :key="item.id">
          <div class="kv-form__item kv-form__item_chb kv-form__item_light">
            <label class="kv-form-radio">
              <input type="radio" name="branch" :value="item.id" v-model="postalService" @change="postalChange">
              <span class="kv-form-radio__mark">
                <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
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

    </div>
  </div>
</template>

<script>
import * as arrayHelper from "@/helpers/array";

export default {
  name: "Step6",
  props: {
    postalServices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      postalService: null
    }
  },
  methods: {
    postalChange() {
      this.$emit('change', this.postalService)
    }
  },
  computed: {
    postalServicesPrepared() {
      return arrayHelper.arrayToSubArrays(this.postalServices, 2)
    }
  },
  mounted() {
    this.$emit('active');
  }
}
</script>

<style scoped>

</style>
