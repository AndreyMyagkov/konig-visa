<template>
  <div class="kv-buch">

    <div class="kv-buch__row">

      <!-- Country -->
      <div class="kv-buch__col">

        <div class="kv-buch__col-inner">
          <div class="kv-buch__title">{{$lng('step1.countryLabel')}}</div>
          <div class="kv-buch__list">

            <!-- select -->
            <div class="kv-select">
              <div class="kv-select__badge">
                <svg class="kv-select__icon"><use href="#kv-icons_pin"></use></svg>
              </div>
              <div class="kv-select__input">
                <v-select
                    :options="countries"
                    label="name"
                    :placeholder="$lng('step1.countryPlaceholder')"
                    v-model="selectedCountry"
                    :clearable="false"
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
          <div class="kv-buch__title">{{$lng('step1.serviceGrpLabel')}}</div>
          <VisaTypes
              :data="serviceGroups"
              :selected="setup.serviceGroups"
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
          <div class="kv-buch__title">{{$lng('step1.serviceLabel')}}</div>
          <VisaTypes
              :data="serviceGroupsSelected"
              :selected="setup.service"
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
    },
    serviceGroups: {
      type: Array,
      required: true
    },
    serviceGroupsSelected: {
      type: Array,
      required: true
    },
    setup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    selectVisaType(data) {
      this.$emit('update:service', data)
    },
    selectCountry(data) {
      this.$emit('update:country', data);
    },
    showModal(content, title){
      this.$emit('showModal', content, title);
    }
  },
  computed: {
    selectedCountry: {
      get () {
        return this.countries.find(item => item.codeA3 === this.setup.country.codeA3)
      },
      set (value) {
        this.selectCountry(value)
      },
    },
  },
  mounted() {
    this.$emit('active')
  }
}
</script>

