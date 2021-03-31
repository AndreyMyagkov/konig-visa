<template>
  <div class="kv-buch" >
    <div class="kv-buch__row">

      <!-- Country -->
      <div class="kv-buch__col">

        <div class="kv-buch__col-inner">
          <div class="kv-buch__title">Выберите страну назначения:</div>
          <div class="kv-buch__list">

            <!-- select -->
            <div class="kv-select">
              <div class="kv-select__badge">
                <svg class="kv-select__icon"><use href="img/icons/icons.svg#pin"></use></svg>
              </div>
              <div class="kv-select__input">
                <v-select
                    :options="countries"
                    label="name"
                    placeholder="Выберите"
                    v-model="selectedCountry"
                    :clearable="false"
                    @option:selected="countryChange"
                />
              </div>
            </div>
            <!-- /select -->

          </div>
        </div>
      </div>
      <!-- /Country -->

      <!-- Groups -->
      <div class="kv-buch__col">
        <div class="kv-buch__col-inner" v-if="serviceGroups.length">
          <div class="kv-buch__title">Выберите группу:</div>
          <VisaTypes
              :data="serviceGroups"
              :selected="[selectedServiceGroup, selectedService]"
              @change="selectVisaType"
              @showModal="showModal"
          >
          </VisaTypes>
        </div>
      </div>
      <!-- /Groups -->

      <!-- Services -->
      <div class="kv-buch__col">
        <div class="kv-buch__col-inner"  v-if="serviceGroupsSelected.length">
          <div class="kv-buch__title">Выберите подтип визы:</div>
          <VisaTypes
              :data="serviceGroupsSelected"
              :selected="[selectedService]"
              @change="selectVisaType"
              @showModal="showModal"
          >
          </VisaTypes>

        </div>
      </div>
      <!-- /Services -->

    </div>
  </div>
</template>

<script>
import VisaTypes from "@/components/ui/VisaTypes";
import vSelect from "vue-select";

export default {
  name: "Step1",
  components: {
    VisaTypes,
    vSelect
  },
  props: {
    countries: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedCountry: []
    }
  },
  methods: {
    countryChange() {
      this.$emit('countryChange', this.selectedCountry)
    }
  }
}
</script>

<style scoped>

</style>
