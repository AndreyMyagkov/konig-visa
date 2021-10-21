<template>
  <div class="kv-content__body kv-review">

    <!-- Review info-->
    <div class="kv-review-info kv-review__item">
      <div class="kv-edit kv-review-info__edit">
        <svg class="kv-edit__icon" @click="setStep({step:1, block: null})">
          <use href="#kv-icons_edit"></use>
        </svg>
      </div>

      <div class="kv-row">

        <div class="kv-review-info__col">
          <div class="kv-review-info__name">{{ $lng('step7.country') }}</div>
          <div class="kv-review-info__value">{{data.toCountry.name}}</div>
        </div>

        <div class="kv-review-info__col">
          <div class="kv-review-info__name">{{ $lng('step7.duration') }}</div>
          <div class="kv-review-info__value">{{data.duration.name}}</div>
        </div>

      </div>


      <div class="kv-row">
        <div class="kv-review-info__col">
          <div class="kv-review-info__name">{{ $lng('step7.serviceGrp') }}</div>
          <div class="kv-review-info__value">{{data.serviceGroup.name}}</div>
        </div>
        <div class="kv-review-info__col">
          <div class="kv-review-info__name">{{ $lng('step7.multiplicity') }}</div>
          <div class="kv-review-info__value">{{data.price.price.m}}-malige Einreise</div>
        </div>
      </div>


      <div class="kv-row">
        <div class="kv-review-info__col">
          <div class="kv-review-info__name">{{ $lng('step7.service') }}</div>
          <div class="kv-review-info__value">{{data.service.name}}</div>
        </div>
        <div class="kv-review-info__col">
          <div class="kv-review-info__name">{{ $lng('step7.processingDuration') }}</div>
          <div class="kv-review-info__value">{{data.price.info.quantity}} {{ $lng(`step2.dimension.${data.price.info.dimension}`) }}</div>
        </div>
      </div>

    </div>


    <div class="kv-overflow-x-auto kv-block-mb">
      <table class="kv-review-members kv-review__item">
        <thead class="kv-review-members__row_header">
        <tr>
          <th class="kv-review-members__item_title">№</th>
          <th class="kv-review-members__item_title">{{ $lng('step7.nameSurname') }}</th>
          <th class="kv-review-members__item_title">{{ $lng('step7.nationality') }}</th>
          <th class="kv-review-members__item_title" v-if="isShowResidenceRegion">{{ $lng('step7.location') }}</th>
          <th class="kv-review-members__item_title" v-if="isShowDiscount">{{ $lng('step7.additionally') }}</th>
          <th class="kv-review-members__item_title"> </th>
        </tr>
        </thead>
        <tbody>
        <tr class="kv-review-members__row" v-for="(item, index) in data.tourists" :key="index">
          <td class="kv-review-members__item">{{index+1}}</td>
          <td class="kv-review-members__item">{{item.gender}} {{item.name}} {{item.sname}}</td>
          <td class="kv-review-members__item">{{item.nationality.name}}</td>
          <td class="kv-review-members__item" v-if="isShowResidenceRegion">{{item.residenceRegion.name}}</td>
          <td class="kv-review-members__item" v-if="isShowDiscount">{{getTouristDiscount(index)}}</td>
          <td class="kv-review-members__item">
            <div class="kv-edit" @click="setStep({step:3, block: '#kv-tourist-'+index})">
              <svg class="kv-edit__icon">
                <use href="#kv-icons_edit"></use>
              </svg>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>



    <!-- Сервис пакет-->
    <div class="kv-review-card kv-review__item" v-if="data.servicePackage.id !== null || (data.suppServices !== null && data.suppServices.length)">

      <div class="kv-review-card__header">
        <svg class="kv-review-card__icon">
          <use href="#kv-icons_step_4"></use>
        </svg>
        <div class="kv-review-card__title">{{ $lng('step7.servicePackage') }} {{data.servicePackage.name}}</div>
        <div class="kv-review-card__edit">
          <div class="kv-edit"  @click="setStep({step:4, block: null})">
            <svg class="kv-edit__icon">
              <use href="#kv-icons_edit"></use>
            </svg>
          </div>
        </div>
      </div>

      <div class="kv-review-card__body">
        <div class="kv-review-card__text" v-html="data.servicePackage.description"></div>

        <div class="kv-review-card__list" v-if="data.suppServices !== null && data.suppServices.length">
          <div class="kv-review-card__list-title">{{ $lng('step7.suppServices') }}</div>
          <div class="kv-review-card__list-item" v-for="item in data.suppServices" :key="item.id">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
    <!-- /Сервис пакет-->


    <!-- Reveiw delivery-->
    <div class="kv-review-card kv-review__item" v-if="data.postalService.id !== null">
      <div class="kv-review-card__header">
        <svg class="kv-review-card__icon">
          <use href="#kv-icons_step_6"></use>
        </svg>
        <div class="kv-review-card__title">{{ $lng('step7.delivery') }}</div>
        <div class="kv-review-card__edit">
          <div class="kv-edit">
            <svg class="kv-edit__icon" @click="setStep({step:6, block: null})">
              <use href="#kv-icons_edit"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="kv-review-card__body">
        <div class="kv-review-card__text">{{data.postalService.name}}</div>
      </div>
    </div>


    <!-- Reveiw total-->
    <div class="kv-review-total kv-review__item">
      <div class="kv-review-total__plug"></div>
      <div class="kv-review-total__container">
        <div class="kv-review-total__user">
          <svg class="kv-review-total__icon">
            <use href="#kv-icons_user"></use>
          </svg>
          <div class="kv-review-total__counter">
            <span class="kv-review-total__cross">+</span> {{ data.calculate.calculation.participants.length }}
          </div>
        </div>
        <div class="kv-review-total__title">{{ $lng('step7.amount') }}</div>
        <div class="kv-review-total__price kv-price">
          {{totalAmount()}}
          <span class="kv-price__currency">€</span>
        </div>
      </div>
      <!-- Cart-->
      <div class="kv-review-total__more kv-cart kv-review-total__plug">
        {{ $lng('step7.more') }}
        <svg class="kv-review-total__arrow">
          <use href="#kv-icons_arrow_down"></use>
        </svg>
        <div class="kv-cart__body drop__body">
          <!-- Cart table-->
          <div class="kv-cart-table">

            <div class="kv-cart-table__row" v-for="(item, i) in data.calculate.calculation.participants" :key="i">
              <div class="kv-cart-table__item">{{item.nr}}</div>
              <div class="kv-cart-table__item kv-cart-table__item_col">{{ data.tourists[i].gender }} {{data.tourists[i].name}} {{data.tourists[i].sname}}</div>
              <div class="kv-price kv-cart-table__item">
                <template  v-if="item.price !== null">{{ formatter.priceFormat(item.price) }}</template>
                <template v-else><span v-html="constants.dashSymbol"></span> </template>
                <span class="kv-price__currency">€</span>
              </div>
            </div>

            <!-- Пакеты -->
            <div class="kv-cart-table__row" v-if="data.calculate.calculation.servicePackage !== null && data.calculate.calculation.servicePackage.participants.length">
              <div class="kv-cart-table__item kv-cart-table__item_col">
                {{ data.calculate.calculation.servicePackage.name }}
                <!--<svg><use href="#kv-icons_multiply"></use></svg> -->
                х
                {{ data.calculate.calculation.servicePackage.participants.length }}
              </div>
              <div class="kv-price kv-cart-table__item">
                <template>{{ formatter.priceFormat(data.calculate.calculation.servicePackage.price *  data.calculate.calculation.servicePackage.participants.length) }}</template>
                <span class="kv-price__currency">€</span>
              </div>
            </div>

            <!-- Услуги -->
            <template v-if="data.calculate.calculation.suppServices !== null">
              <div class="kv-cart-table__row" v-for="suppServices in data.calculate.calculation.suppServices.filter(_ => !_.isIncluded)" :key="suppServices.id">
                <div class="kv-cart-table__item kv-cart-table__item_col">
                  {{ suppServices.name }}
                  <!-- <svg><use href="#kv-icons_multiply"></use></svg> -->
                  x
                  {{ suppServices.participants.length }}
                </div>
                <div class="kv-price kv-cart-table__item">
                  <template>{{ formatter.priceFormat(suppServices.price * suppServices.participants.length) }}</template>
                  <span class="kv-price__currency">€</span>
                </div>
              </div>
            </template>

            <!-- Почта -->
            <div class="kv-cart-table__row" v-if="data.calculate.calculation.postalService !== null">
              <div class="kv-cart-table__item kv-cart-table__item_col">{{ data.calculate.calculation.postalService.name }}</div>
              <div class="kv-price kv-cart-table__item">
                <template>{{ formatter.priceFormat(data.calculate.calculation.postalService.price) }}</template>
                <span class="kv-price__currency">€</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


    <div class="kv-row kv-review__row kv-review__item">


      <!-- Информация о клиенте -->
      <div class="kv-review__col">
        <div class="kv-review-card kv-review-card_light">
          <div class="kv-review-card__header">
            <svg class="kv-review-card__icon">
              <use href="#kv-icons_step_5"></use>
            </svg>
            <div class="kv-review-card__title">{{ $lng('step7.clientInfo') }}</div>
            <div class="kv-review-card__edit">
              <div class="kv-edit">
                <svg class="kv-edit__icon"  @click="setStep({step:5, block: '#kv-customer'})">
                  <use href="#kv-icons_edit"></use>
                </svg>
              </div>
            </div>
          </div>
          <div class="kv-review-card__body">
            <div class="kv-review-card__text">{{data.customer.gender}} {{data.customer.name}} {{data.customer.sname}}</div>
            <div class="kv-review-card__text">{{data.customer.companyName}}</div>
            <div class="kv-review-card__text">{{data.customer.address}}</div>
            <div class="kv-review-card__text">{{data.customer.zip}}, {{data.customer.city}}, {{data.customer.addressingCountry.name}}</div>
            <div class="kv-row">
              <div class="kv-review-card__text kv-customer__tel" v-if="data.customer.tel.length">{{data.customer.tel}}</div>
              <div class="kv-review-card__text">{{data.customer.mobile}}</div>
            </div>
            <div class="kv-review-card__text">{{data.customer.email}}</div>
          </div>
        </div>
      </div>

      <!-- Адрес доставки -->
      <div class="kv-review__col" v-if="data.delivery.type == 2 && data.calculate.deliveryMedia !== 'digital'">
        <div class="kv-review-card kv-review-card_light">
          <div class="kv-review-card__header">
            <svg class="kv-review-card__icon">
              <use href="#kv-icons_delivery"></use>
            </svg>
            <div class="kv-review-card__title">{{ $lng('step7.address') }}</div>
            <div class="kv-review-card__edit">
              <div class="kv-edit">
                <svg class="kv-edit__icon" @click="setStep({step: 5, block: '#kv-delivery'})">
                  <use href="#kv-icons_edit"></use>
                </svg>
              </div>
            </div>
          </div>


          <div class="kv-review-card__body" >
            <div class="kv-review-card__text">{{data.delivery.gender}} {{data.delivery.name}} {{data.delivery.sname}}</div>
            <div class="kv-review-card__text" v-if="data.delivery.isCompany">{{data.delivery.companyName}}</div>
            <div class="kv-review-card__text">{{data.delivery.address}}</div>
            <div class="kv-review-card__text">{{data.delivery.zip}}, {{data.delivery.city}}, {{data.delivery.addressingCountry.name}}</div>
            <div class="kv-row">
              <div class="kv-review-card__text kv-customer__tel"  v-if="data.delivery.tel.length">{{data.delivery.tel}}</div>
              <div class="kv-review-card__text">{{data.delivery.mobile}}</div>
            </div>
            <div class="kv-review-card__text">{{data.delivery.email}}</div>
          </div>

        </div>
      </div>

      <!-- Самовывоз из -->
      <div class="kv-review__col" v-if="data.delivery.type == 3 && data.calculate.deliveryMedia !== 'digital'">
        <div class="kv-review-card kv-review-card_light">
          <div class="kv-review-card__header">
            <svg class="kv-review-card__icon">
              <use href="#kv-icons_delivery"></use>
            </svg>
            <div class="kv-review-card__title">{{ $lng('step7.address') }}</div>
            <div class="kv-review-card__edit">
              <div class="kv-edit">
                <svg class="kv-edit__icon" @click="setStep({step: 5, block: '#kv-delivery'})">
                  <use href="#kv-icons_edit"></use>
                </svg>
              </div>
            </div>
          </div>


          <div class="kv-review-card__body">
            <div class="kv-review-card__text">{{ $lng('step7.pickUp') }}</div>
            <div class="kv-review-card__text">{{data.delivery.branch.name}}</div>
            <div class="kv-review-card__text">{{data.delivery.branch.address}}</div>
            <div class="kv-review-card__text">{{data.delivery.branch.workingTime}}</div>


          </div>

        </div>
      </div>


    </div>
    <!-- /Информация о клиенте -->



    <!-- Reveiw card-->
    <div class="kv-review-terms kv-review__item">
      <div class="kv-review-terms__title">{{ $lng('step7.termsAndConditions') }}</div>
      <div class="kv-review-terms__links">
        <div class="kv-review-terms__links-inner">
          <a class="kv-review-terms__link" href="#">{{ $lng('step7.paymentTerms') }}</a>
          <span class="kv-review-terms__sep">•</span>
          <a class="kv-review-terms__link" href="#">{{ $lng('step7.cancellationPolicy') }}</a>
        </div>
      </div>
      <div class="kv-review-terms__text kv-user-text" v-html="$lng('step7.termsText')"></div>
    </div>
  </div>
</template>

<script>
import * as constants from "@/helpers/constants";
import * as formatter from "@/helpers/format";

export default {
  name: "Step7",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      constants,
      formatter
    }
  },
  methods: {
    totalAmount() {
      let amount = this.data.calculate.amount;
      if (amount !== null) {
        return this.formatter.priceFormat(amount)
      } else {
        return this.constants.dashSymbol
      }
    },
    setStep(step) {
      this.$emit('setStep', step)
    },
    getTouristDiscount(index) {
      const discountCode = this.data.tourists[index].discount;
      if (discountCode === null || discountCode === "null" || this.data.discounts === null) {
        return "";
      }
      const discountName = this.data.discounts.find(_ => _.code === discountCode).name;
      let touristBirthDate = "";
      if (discountCode === "c") {
        touristBirthDate = this.data.tourists[index].birthDate;
      console.log(touristBirthDate)
        touristBirthDate = touristBirthDate.replace(/(\d{4})-(\d{2})-(\d{2})/g, "$3.$2.$1")
      }

      return `${discountName} ${touristBirthDate}`
    }
  },
  computed: {
    isShowResidenceRegion() {
      return this.data.servedResidenceRegions !== null
      //return this.data.tourists.some(item => item.residenceRegion.code !== null)
    },
    isShowDiscount() {
      return this.data.discounts !== null
      //return this.data.tourists.some(item => item.discount !== null)
    }
  }
}
</script>

<style scoped>
/*
.kv-app .kv-review-card {
  height: 100%;
}

.kv-app .kv-review__row_gap {
  padding: 0;
  gap: 20px;
}

.kv-app .kv-review__row_gap .kv-review__col {
  padding: 0;
}
*/

/*
FIXME: del 28 апр
.kv-customer__tel {
  margin-right: 2em;
}
*/
</style>
