<template>
  <div class="kv-content__body kv-review">

    <!-- Review info-->
    <div class="kv-review-info kv-review__item">
      <div class="kv-edit kv-review-info__edit">
        <svg class="kv-edit__icon" @click="setStep({step:1, block: null})">
          <use href="img/icons/icons.svg#edit"></use>
        </svg>
      </div>

      <div class="kv-row">

        <div class="kv-review-info__col">
          <div class="kv-review-info__name">Страна</div>
          <div class="kv-review-info__value">{{data.toCountry.name}}</div>
        </div>

        <div class="kv-review-info__col">
          <div class="kv-review-info__name">Срок визы:</div>
          <div class="kv-review-info__value">{{data.duration.name}}</div>
        </div>

      </div>


      <div class="kv-row">
        <div class="kv-review-info__col">
          <div class="kv-review-info__name">Тип визы:</div>
          <div class="kv-review-info__value">{{data.serviceGroup.name}}</div>
        </div>
        <div class="kv-review-info__col">
          <div class="kv-review-info__name">Кратность:</div>
          <div class="kv-review-info__value">{{data.price.price.m}}-malige Einreise</div>
        </div>
      </div>


      <div class="kv-row">
        <div class="kv-review-info__col">
          <div class="kv-review-info__name">Подтип визы:</div>
          <div class="kv-review-info__value">{{data.service.name}}</div>
        </div>
        <div class="kv-review-info__col">
          <div class="kv-review-info__name">Срок обработки:</div>
          <div class="kv-review-info__value">{{data.price.info.quantity}} {{data.price.info.duration}}</div>
        </div>
      </div>

    </div>


    <div class="kv-review-members kv-review__item">

      <div class="kv-review-members__row kv-review-members__row_header">

        <div class="kv-review-members__item kv-review-members__col_1 kv-review-members__item_title">№
        </div>

        <div class="kv-review-members__item kv-review-members__col_2 kv-review-members__item_title">
          Имя, фамилия</div>

        <div class="kv-review-members__item kv-review-members__col_3 kv-review-members__item_title">
          Гражданство</div>

        <div class="kv-review-members__item kv-review-members__col_4 kv-review-members__item_title">
          Проживание</div>

        <div class="kv-review-members__item kv-review-members__col_5 kv-review-members__item_title">
          Дополнительно</div>

        <div class="kv-review-members__item kv-review-members__col_6 kv-review-members__item_title">
        </div>
      </div>

      <div class="kv-review-members__row" v-for="(item, index) in data.tourists" :key="index">
        <div class="kv-review-members__item kv-review-members__col_1">{{index+1}}</div>
        <div class="kv-review-members__item kv-review-members__col_2">{{item.gender}} {{item.name}} {{item.sname}}</div>
        <div class="kv-review-members__item kv-review-members__col_3">{{item.nationality.name}}</div>
        <div class="kv-review-members__item kv-review-members__col_4">{{item.residenceRegion.name}}</div>
        <div class="kv-review-members__item kv-review-members__col_5">{{getTouristDiscount(index)}}</div>
        <div class="kv-review-members__item kv-review-members__col_6 kv-review-members__item_edit">
          <div class="kv-edit" @click="setStep({step:3, block: '#kv-tourist-'+index})">
            <svg class="kv-edit__icon">
              <use href="img/icons/icons.svg#edit"></use>
            </svg>
          </div>
        </div>
      </div>

    </div>




    <!-- Сервис пакет-->
    <div class="kv-review-card kv-review__item" v-if="data.servicePackage.id !== null || (data.suppServices !== null && data.suppServices.length)">

      <div class="kv-review-card__header">
        <svg class="kv-review-card__icon">
          <use href="img/icons/icons.svg#step_4"></use>
        </svg>
        <div class="kv-review-card__title">Сервис пакет: {{data.servicePackage.name}}</div>
        <div class="kv-review-card__edit">
          <div class="kv-edit"  @click="setStep({step:4, block: null})">
            <svg class="kv-edit__icon">
              <use href="img/icons/icons.svg#edit"></use>
            </svg>
          </div>
        </div>
      </div>

      <div class="kv-review-card__body">
        <div class="kv-review-card__text" v-html="data.servicePackage.description"></div>

        <div class="kv-review-card__list" v-if="data.suppServices !== null && data.suppServices.length">
          <div class="kv-review-card__list-title">Дополнительные услуги:</div>
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
          <use href="img/icons/icons.svg#step_6"></use>
        </svg>
        <div class="kv-review-card__title">Способ доставки:</div>
        <div class="kv-review-card__edit">
          <div class="kv-edit">
            <svg class="kv-edit__icon" @click="setStep({step:6, block: null})">
              <use href="img/icons/icons.svg#edit"></use>
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
            <use href="img/icons/icons.svg#user"></use>
          </svg>
          <div class="kv-review-total__counter">
            <span class="kv-review-total__cross">+</span> {{ data.calculate.calculation.participants.length }}
          </div>
        </div>
        <div class="kv-review-total__title">Preis Total:</div>
        <div class="kv-review-total__price kv-price">
          {{totalAmount()}}
          <span class="kv-price__currency">€</span>
        </div>
      </div>
      <!-- Cart-->
      <div class="kv-review-total__more kv-cart kv-review-total__plug">
        Подробнее
        <svg class="kv-review-total__arrow">
          <use href="img/icons/icons.svg#arrow_down"></use>
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

          </div>
        </div>
      </div>
    </div>


    <div class="kv-row kv-review__row kv-review__item kv-review__row_gap">


      <!-- Информация о клиенте -->
      <div class="kv-review__col">
        <div class="kv-review-card kv-review-card_light">
          <div class="kv-review-card__header">
            <svg class="kv-review-card__icon">
              <use href="img/icons/icons.svg#step_5"></use>
            </svg>
            <div class="kv-review-card__title">Информация о клиенте</div>
            <div class="kv-review-card__edit">
              <div class="kv-edit">
                <svg class="kv-edit__icon"  @click="setStep({step:5, block: '#kv-customer'})">
                  <use href="img/icons/icons.svg#edit"></use>
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
      <div class="kv-review__col" v-if="data.delivery.type == 2">
        <div class="kv-review-card kv-review-card_light">
          <div class="kv-review-card__header">
            <svg class="kv-review-card__icon">
              <use href="img/icons/icons.svg#delivery"></use>
            </svg>
            <div class="kv-review-card__title">Адрес доставки</div>
            <div class="kv-review-card__edit">
              <div class="kv-edit">
                <svg class="kv-edit__icon" @click="setStep({step: 5, block: '#kv-delivery'})">
                  <use href="img/icons/icons.svg#edit"></use>
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
      <div class="kv-review__col" v-if="data.delivery.type == 3">
        <div class="kv-review-card kv-review-card_light">
          <div class="kv-review-card__header">
            <svg class="kv-review-card__icon">
              <use href="img/icons/icons.svg#delivery"></use>
            </svg>
            <div class="kv-review-card__title">Адрес доставки</div>
            <div class="kv-review-card__edit">
              <div class="kv-edit">
                <svg class="kv-edit__icon" @click="setStep({step: 5, block: '#kv-delivery'})">
                  <use href="img/icons/icons.svg#edit"></use>
                </svg>
              </div>
            </div>
          </div>


          <div class="kv-review-card__body">
            <div class="kv-review-card__text">Самовывоз из</div>
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
      <div class="kv-review-terms__title">Allgemeine Geschäftsbedingungen</div>
      <div class="kv-review-terms__links">
        <div class="kv-review-terms__links-inner">
          <a class="kv-review-terms__link" href="#"> Zahlungsbedingungen</a>
          <span class="kv-review-terms__sep">•</span>
          <a class="kv-review-terms__link" href="#"> Stornobedingungen</a>
        </div>
      </div>
      <div class="kv-review-terms__text">Mit dem erfolgreichen Abschluss Ihrer Buchung kommt ein Vertrag
        mit dem Anbieter zustande. Die Bestätigung und Rechnung zu Ihrer Buchung werden Ihnen dann von
        HomeToGo und/oder dem Anbieter zugesandt. Durch Klicken auf "Zahlungspflichtig buchen'
        akzeptieren Sie die AGB des Anbieters und die AGB der HomeToGo GmbH. Weitere Informationen zur
        Verarbeitung Ihrer Daten finden Sie in unserer Datenschutzerklärung.
      </div>
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
      if (discountCode === null || this.data.discounts === null) {
        console.log(1)
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
  }
}
</script>

<style scoped>
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

.kv-customer__tel {
  margin-right: 2em;
}

</style>
