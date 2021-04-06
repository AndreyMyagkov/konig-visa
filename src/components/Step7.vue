<template>
  <div class="kv-content__body kv-review">

    <!-- Review info-->
    <div class="kv-review-info kv-review__item">
      <div class="kv-edit kv-review-info__edit">
        <svg class="kv-edit__icon">
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
          <div class="kv-review-info__value">{{data.type}}</div>
        </div>
        <div class="kv-review-info__col">
          <div class="kv-review-info__name">Кратность:</div>
          <div class="kv-review-info__value">{{data.price.m}}-malige Einreise</div>
        </div>
      </div>


      <div class="kv-row">
        <div class="kv-review-info__col">
          <div class="kv-review-info__name">Подтип визы:</div>
          <div class="kv-review-info__value">{{data.subType}}</div>
        </div>
        <div class="kv-review-info__col">
          <div class="kv-review-info__name">Срок обработки:</div>
          <div class="kv-review-info__value">todo</div>
        </div>
      </div>

    </div>


    <!-- Review members-->
    <div class="kv-review-members kv-review__item">
      <div class="kv-review-members__header">
        <div class="kv-review-members__title">№</div>
        <div class="kv-review-members__title">Фамилия, имя Фамилия</div>
        <div class="kv-review-members__title">Гражданство</div>
        <div class="kv-review-members__title">Проживание</div>
        <div class="kv-review-members__title">Дополнительно</div>
        <div class="kv-review-members__title"></div>
      </div>

        <div  class="kv-review-members__header" v-for="(item, index) in data.tourists" :key="index">

          <div class="kv-review-members__item">{{index+1}}</div>
          <div class="kv-review-members__item">{{item.gender}} {{item.sname}} {{item.name}}</div>
          <div class="kv-review-members__item">{{item.nationality.name}}</div>
          <div class="kv-review-members__item">{{item.residenceRegion.name}}</div>
          <div class="kv-review-members__item">{{item.discount}} {{item.birthDate}}</div>
          <div class="kv-review-members__item kv-review-members__item_edit">
            <div class="kv-edit">
              <svg class="kv-edit__icon">
                <use href="img/icons/icons.svg#edit"></use>
              </svg>
            </div>
          </div>

        </div>


    </div>


    <!-- Reveiw services-->
    <div class="kv-review-card kv-review__item">
      <div class="kv-review-card__header">
        <svg class="kv-review-card__icon">
          <use href="img/icons/icons.svg#step_4"></use>
        </svg>
        <div class="kv-review-card__title">Сервис пакет: Standart</div>
        <div class="kv-review-card__edit">
          <div class="kv-edit">
            <svg class="kv-edit__icon">
              <use href="img/icons/icons.svg#edit"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="kv-review-card__body">
        <div class="kv-review-card__text">Описание тарифа Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
          an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </div>
        <div class="kv-review-card__list">
          <div class="kv-review-card__list-title">Дополнительные услуги:</div>
          <div class="kv-review-card__list-item">Ausfüllen von Online-Visumantrag</div>
          <div class="kv-review-card__list-item">Nachweis über die Rückkehrwilligkeit für
            Geschäftsreisende
          </div>
          <div class="kv-review-card__list-item">Ausfüllen von Online-Visumantrag</div>
          <div class="kv-review-card__list-item">Nachweis über die Rückkehrwilligkeit für
            Geschäftsreisende
          </div>
        </div>
      </div>
    </div>



    <!-- Reveiw delivery-->
    <div class="kv-review-card kv-review__item">
      <div class="kv-review-card__header">
        <svg class="kv-review-card__icon">
          <use href="img/icons/icons.svg#step_6"></use>
        </svg>
        <div class="kv-review-card__title">Способ доставки:</div>
        <div class="kv-review-card__edit">
          <div class="kv-edit">
            <svg class="kv-edit__icon">
              <use href="img/icons/icons.svg#edit"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="kv-review-card__body">
        <div class="kv-review-card__text">E-Mail Versand (nur für E-Visum, ETA oder ESTA)</div>
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
            <span class="kv-review-total__cross">+</span> 4
          </div>
        </div>
        <div class="kv-review-total__title">Preis Total:</div>
        <div class="kv-review-total__price kv-price">420</div>
      </div>
      <!-- Cart-->
      <div class="kv-review-total__more kv-cart kv-review-total__plug">
        Подробнее
        <svg
            class="kv-review-total__arrow">
          <use href="img/icons/icons.svg#arrow_down"></use>
        </svg>
        <div class="kv-cart__body drop__body">
          <!-- Cart table-->
          <div class="kv-cart-table">
            <div class="kv-cart-table__row">
              <div class="kv-cart-table__item">1</div>
              <div class="kv-cart-table__item kv-cart-table__item_col">herr Иванов Иван</div>
              <div class="kv-cart-table__item kv-cart-table__item_price" data-kv-cart-price="€">
                100
              </div>
            </div>
            <div class="kv-cart-table__row">
              <div class="kv-cart-table__item">1</div>
              <div class="kv-cart-table__item kv-cart-table__item_col">herr Иванов Иван</div>
              <div class="kv-cart-table__item kv-cart-table__item_price" data-kv-cart-price="€">
                100
              </div>
            </div>
            <div class="kv-cart-table__row">
              <div class="kv-cart-table__item">1</div>
              <div class="kv-cart-table__item kv-cart-table__item_col">herr Иванов Иван</div>
              <div class="kv-cart-table__item kv-cart-table__item_price" data-kv-cart-price="€">
                100
              </div>
            </div>
            <div class="kv-cart-table__row">
              <div class="kv-cart-table__item">1</div>
              <div class="kv-cart-table__item kv-cart-table__item_col">herr Иванов Иван</div>
              <div class="kv-cart-table__item kv-cart-table__item_price" data-kv-cart-price="€">
                100
              </div>
            </div>
            <div class="kv-cart-table__row">
              <div class="kv-cart-table__item">1</div>
              <div class="kv-cart-table__item kv-cart-table__item_col">herr Иванов Иван</div>
              <div class="kv-cart-table__item kv-cart-table__item_price" data-kv-cart-price="€">
                100
              </div>
            </div>
            <div class="kv-cart-table__row">
              <div class="kv-cart-table__item">1</div>
              <div class="kv-cart-table__item kv-cart-table__item_col">herr Иванов Иван</div>
              <div class="kv-cart-table__item kv-cart-table__item_price" data-kv-cart-price="€">
                100
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Reveiw card-->
    <div class="kv-row kv-review__row kv-review__item">
      <div class="kv-review__col">
        <div class="kv-review-card kv-review-card_light">
          <div class="kv-review-card__header">
            <svg class="kv-review-card__icon">
              <use href="img/icons/icons.svg#step_5"></use>
            </svg>
            <div class="kv-review-card__title">Информация о Клиенте</div>
            <div class="kv-review-card__edit">
              <div class="kv-edit">
                <svg class="kv-edit__icon">
                  <use href="img/icons/icons.svg#edit"></use>
                </svg>
              </div>
            </div>
          </div>
          <div class="kv-review-card__body">
            <div class="kv-review-card__text">{{data.customer.gender}} {{data.customer.sname}} {{data.customer.name}}</div>
            <div class="kv-review-card__text">Название фирмы</div>
            <div class="kv-review-card__text">Staropetrovsky proezd 10 B</div>
            <div class="kv-review-card__text">125130, Moscow, Russia</div>
            <div class="kv-row">
              <div class="kv-review-card__text">+1 (234) 567 89 00</div>
              <div class="kv-review-card__text">+3 (123) 321 25 15</div>
            </div>
            <div class="kv-review-card__text">email@ema.il</div>
          </div>
        </div>
      </div>
      <div class="kv-review__col">
        <div class="kv-review-card kv-review-card_light">
          <div class="kv-review-card__header">
            <svg class="kv-review-card__icon">
              <use href="img/icons/icons.svg#delivery"></use>
            </svg>
            <div class="kv-review-card__title">Адрес доставки</div>
            <div class="kv-review-card__edit">
              <div class="kv-edit">
                <svg class="kv-edit__icon">
                  <use href="img/icons/icons.svg#edit"></use>
                </svg>
              </div>
            </div>
          </div>
          <div class="kv-review-card__body">
            <div class="kv-review-card__text">Herr Ivanov Ivan</div>
            <div class="kv-review-card__text">Название фирмы</div>
            <div class="kv-review-card__text">Staropetrovsky proezd 10 B</div>
            <div class="kv-review-card__text">125130, Moscow, Russia</div>
            <div class="kv-row">
              <div class="kv-review-card__text">+1 (234) 567 89 00</div>
              <div class="kv-review-card__text">+3 (123) 321 25 15</div>
            </div>
            <div class="kv-review-card__text">email@ema.il</div>
          </div>
        </div>
      </div>
    </div>
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
export default {
  name: "Step7",
  props: {
    data: {
      type: Object,
      required: true
    }

  }
}
</script>

<style scoped>

</style>
