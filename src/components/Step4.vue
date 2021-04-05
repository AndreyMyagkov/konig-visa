<template>
  <div class="kv-content__body">
    <div class="kv-content__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
      printer took a galley of type and scrambled it to make a type specimen book.
    </div>
    <div class="kv-class-tabs">
      <div class="kv-class-tabs_right">
        <div class="kv-class-tabs__list">
          <!-- Class tab-->
          <div class="kv-class-tabs__item">
            <div class="kv-class-tab kv-class-tab_active">
              <div class="kv-class-tab__card kv-class-tab__card_show">
                <div class="kv-info-card">
                  <svg class="kv-info-card__close">
                    <use href="img/icons/icons.svg#cross"></use>
                  </svg>
                  <div class="kv-info-card__title">Standard</div>
                  <div class="kv-info-card__text">Wählen Sie diese Option, wenn wir für Sie
                    den Visumantrag ausfüllen sollen. Senden Sie uns hierfür bitte lediglich
                    das Formular &quot;Antrag Service&quot;, welches Sie in unserem
                    Download- bereich/Russland finden.
                  </div>
                </div>
              </div>
              <svg class="kv-class-tab__info">
                <use href="img/icons/icons.svg#info"></use>
              </svg>
              <div class="kv-class-tab__rate">
                <svg class="kv-class-tab__star">
                  <use href="img/icons/icons.svg#star"></use>
                </svg>
              </div>
              <div class="kv-class-tab__title">Standard</div>
            </div>
          </div>
          <!-- Class tab-->
          <div class="kv-class-tabs__item">
            <div class="kv-class-tab">
              <div class="kv-class-tab__card">
                <div class="kv-info-card">
                  <svg class="kv-info-card__close">
                    <use href="img/icons/icons.svg#cross"></use>
                  </svg>
                  <div class="kv-info-card__title">Comfort</div>
                  <div class="kv-info-card__text">Wählen Sie diese Option, wenn wir für Sie
                    den Visumantrag ausfüllen sollen. Senden Sie uns hierfür bitte lediglich
                    das Formular &quot;Antrag Service&quot;, welches Sie in unserem
                    Download- bereich/Russland finden.
                  </div>
                </div>
              </div>
              <svg class="kv-class-tab__info">
                <use href="img/icons/icons.svg#info"></use>
              </svg>
              <div class="kv-class-tab__rate">
                <svg class="kv-class-tab__star">
                  <use href="img/icons/icons.svg#star"></use>
                </svg>
                <svg class="kv-class-tab__star">
                  <use href="img/icons/icons.svg#star"></use>
                </svg>
              </div>
              <div class="kv-class-tab__title">Comfort</div>
            </div>
          </div>
          <!-- Class tab-->
          <div class="kv-class-tabs__item">
            <div class="kv-class-tab">
              <svg class="kv-class-tab__info">
                <use href="img/icons/icons.svg#info"></use>
              </svg>
              <div class="kv-class-tab__card">
                <div class="kv-info-card">
                  <svg class="kv-info-card__close">
                    <use href="img/icons/icons.svg#cross"></use>
                  </svg>
                  <div class="kv-info-card__title">Premium</div>
                  <div class="kv-info-card__text">Wählen Sie diese Option, wenn wir für Sie
                    den Visumantrag ausfüllen sollen. Senden Sie uns hierfür bitte lediglich
                    das Formular &quot;Antrag Service&quot;, welches Sie in unserem
                    Download- bereich/Russland finden.
                  </div>
                </div>
              </div>
              <div class="kv-class-tab__rate">
                <svg class="kv-class-tab__star">
                  <use href="img/icons/icons.svg#star"></use>
                </svg>
                <svg class="kv-class-tab__star">
                  <use href="img/icons/icons.svg#star"></use>
                </svg>
                <svg class="kv-class-tab__star">
                  <use href="img/icons/icons.svg#star"></use>
                </svg>
              </div>
              <div class="kv-class-tab__title">Premium</div>
            </div>
          </div>
        </div>
        <div class="kv-tabs-tail kv-tabs-tail_center kv-class-tabs__tail">
          <!-- Tabs tail-->
          <div class="kv-tabs-tail__inner"
               style="--kv-tabs-tail-width: calc(33% + 7px); --kv-tabs-tail-offset: 50%">
            <div class="kv-tabs-tail__line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="kv-services">
      <!-- Services item-->
      <div class="kv-services__item">
        <div class="kv-service kv-services__item-inner">
          <div class="kv-service__main">
            <div class="kv-service__title">Ausfüllen von Online-Visumantrag</div>
            <div class="kv-service__text">Wählen Sie diese Option, wenn wir für Sie den Visumantrag
              ausfüllen sollen. Senden Sie uns hierfür bitte lediglich das Formular "Antrag
              Service", welches Sie in unserem Download- bereich/Russland finden.
            </div>
          </div>
          <div class="kv-service__aside">
            <div class="kv-price kv-service__price">15</div>
            <div class="kv-service__caption">pro Person</div>
          </div>
        </div>
        <!-- Class-->
        <div class="kv-class">
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_add kv-class__item_active">
            <div class="kv-class__caption">включено</div>
            <svg class="kv-class__check">
              <use href="img/icons/icons.svg#check"></use>
            </svg>
          </div>
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_add">
            <div class="kv-class__caption">включено</div>
            <svg class="kv-class__check">
              <use href="img/icons/icons.svg#check"></use>
            </svg>
          </div>
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_checked">
            <label
                class="kv-switcher kv-class__switcher">
              <input class="kv-switcher__input"
                     type="checkbox" checked name="switcher" aria-label="switcher" required>
              <span class="kv-switcher__inner">
                      <div class="kv-switcher__caption kv-class__caption" data-kv_on="добавлено" data-kv_off="добавить"></div>
                      <div class="kv-switcher__box">
                         <svg class="kv-switcher__icon">
                            <use href="img/icons/icons.svg#check"></use>
                         </svg>
                         <div class="kv-switcher__mark"></div>
                      </div>
                   </span>
            </label>
          </div>
        </div>
      </div>
      <!-- Services item-->
      <div class="kv-services__item">
        <div class="kv-service kv-services__item-inner">
          <div class="kv-service__main">
            <div class="kv-service__title">Nachweis über die Rückkehrwilligkeit für
              Geschäftsreisende
            </div>
            <div class="kv-service__text">Wählen Sie diese Option, wenn wir für Sie den Visumantrag
              ausfüllen sollen. Senden Sie uns hierfür bitte lediglich das Formular "Antrag
              Service", welches Sie in unserem Download- bereich/Russland finden.
            </div>
          </div>
          <div class="kv-service__aside">
            <div class="kv-price kv-service__price">25</div>
            <div class="kv-service__caption">pro Person</div>
          </div>
        </div>
        <!-- Class-->
        <div class="kv-class">
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_add kv-class__item_active">
            <div class="kv-class__caption">включено</div>
            <svg class="kv-class__check">
              <use href="img/icons/icons.svg#check"></use>
            </svg>
          </div>
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_add">
            <div class="kv-class__caption">включено</div>
            <svg class="kv-class__check">
              <use href="img/icons/icons.svg#check"></use>
            </svg>
          </div>
          <!-- Class item-->
          <div class="kv-class__item">
            <label class="kv-switcher kv-class__switcher">
              <input
                  class="kv-switcher__input" type="checkbox" checked name="switcher"
                  aria-label="switcher" required>
              <span class="kv-switcher__inner">
                      <div class="kv-switcher__caption kv-class__caption" data-kv_on="добавлено" data-kv_off="добавить"></div>
                      <div class="kv-switcher__box">
                         <svg class="kv-switcher__icon">
                            <use href="img/icons/icons.svg#check"></use>
                         </svg>
                         <div class="kv-switcher__mark"></div>
                      </div>
                   </span>
            </label>
          </div>
        </div>
      </div>
      <!-- Services item-->
      <div class="kv-services__item">
        <div class="kv-service kv-services__item-inner">
          <div class="kv-service__main">
            <div class="kv-service__title">Nachweis über die Rückkehrwilligkeit für Touristen</div>
            <div class="kv-service__text">Wählen Sie diese Option, wenn wir für Sie als
              akkreditierte Visaagentur die Rückkehrwilligkeit ausstellen sollen. Sie müssen somit
              keine Lohnabrechnungen oder anderweitige private Dokumente dem Konsulat vorlegen.
            </div>
          </div>
          <div class="kv-service__aside">
            <div class="kv-price kv-service__price">15</div>
            <div class="kv-service__caption">pro Person</div>
          </div>
        </div>
        <!-- Class-->
        <div class="kv-class kv-class__active">
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_add kv-class__item_active">
            <div class="kv-class__caption">включено</div>
            <svg class="kv-class__check">
              <use href="img/icons/icons.svg#check"></use>
            </svg>
          </div>
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_add">
            <div class="kv-class__caption">включено</div>
            <svg class="kv-class__check">
              <use href="img/icons/icons.svg#check"></use>
            </svg>
          </div>
          <!-- Class item-->
          <div class="kv-class__item">
            <label class="kv-switcher kv-class__switcher">
              <input
                  class="kv-switcher__input" type="checkbox" checked name="switcher"
                  aria-label="switcher" required>
              <span class="kv-switcher__inner">
                      <div class="kv-switcher__caption kv-class__caption" data-kv_on="добавлено" data-kv_off="добавить"></div>
                      <div class="kv-switcher__box">
                         <svg class="kv-switcher__icon">
                            <use href="img/icons/icons.svg#check"></use>
                         </svg>
                         <div class="kv-switcher__mark"></div>
                      </div>
                   </span>
            </label>
          </div>
        </div>
      </div>
      <!-- Services item-->
      <div class="kv-services__item">
        <div class="kv-service kv-services__item-inner">
          <div class="kv-service__main">
            <div class="kv-service__title">Registrierung für Russland Business</div>
            <div class="kv-service__text">Wenn Sie sich länger als 7 Tage geschäftlich in Russland
              aufhalten, müssen Sie sich innerhalb von 3 Werktagen registrieren. Gerne übernehmen
              wir die Registrierung für Sie. Senden Sie uns dazu nach der Einreise folgende
              Unterlagen per Mail zu: Kopie Migrationskarte, Kopie Visum, Kopie Reisepass mit
              Einreisestempel.
            </div>
          </div>
          <div class="kv-service__aside">
            <div class="kv-price kv-service__price">75</div>
            <div class="kv-service__caption">pro Person</div>
          </div>
        </div>
        <!-- Class-->
        <div class="kv-class kv-class__active">
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_add kv-class__item_active">
            <div class="kv-class__caption">включено</div>
            <svg class="kv-class__check">
              <use href="img/icons/icons.svg#check"></use>
            </svg>
          </div>
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_add">
            <div class="kv-class__caption">включено</div>
            <svg class="kv-class__check">
              <use href="img/icons/icons.svg#check"></use>
            </svg>
          </div>
          <!-- Class item-->
          <div class="kv-class__item">
            <label class="kv-switcher kv-class__switcher">
              <input
                  class="kv-switcher__input" type="checkbox" checked name="switcher"
                  aria-label="switcher" required>
              <span class="kv-switcher__inner">
                      <div class="kv-switcher__caption kv-class__caption" data-kv_on="добавлено" data-kv_off="добавить"></div>
                      <div class="kv-switcher__box">
                         <svg class="kv-switcher__icon">
                            <use href="img/icons/icons.svg#check"></use>
                         </svg>
                         <div class="kv-switcher__mark"></div>
                      </div>
                   </span>
            </label>
          </div>
        </div>
      </div>
      <!-- Services item-->
      <div class="kv-services__item">
        <div class="kv-service kv-services__item-inner">
          <div class="kv-service__main">
            <div class="kv-service__title">Registrierung für Russland Tourist</div>
            <div class="kv-service__text">Wenn Sie sich länger als 7 Tage in Russland aufhalten,
              müssen Sie sich innerhalb von 3 Werktagen registrieren. Gerne übernehmen wir die
              Registrierung für Sie. Senden Sie uns dazu nach der Einreise folgende Unterlagen per
              Mail zu: Kopie Migrationskarte, Kopie Visum, Kopie Reisepass mit Einreisestempel.
            </div>
          </div>
          <div class="kv-service__aside">
            <div class="kv-price kv-service__price">65</div>
            <div class="kv-service__caption">pro Person</div>
          </div>
        </div>
        <!-- Class-->
        <div class="kv-class">
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_add kv-class__item_active">
            <div class="kv-class__caption">включено</div>
            <svg class="kv-class__check">
              <use href="img/icons/icons.svg#check"></use>
            </svg>
          </div>
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_add">
            <div class="kv-class__caption">включено</div>
            <svg class="kv-class__check">
              <use href="img/icons/icons.svg#check"></use>
            </svg>
          </div>
          <!-- Class item-->
          <div class="kv-class__item">
            <label class="kv-switcher kv-class__switcher">
              <input
                  class="kv-switcher__input" type="checkbox" checked name="switcher"
                  aria-label="switcher" required>
              <span class="kv-switcher__inner">
                      <div class="kv-switcher__caption kv-class__caption" data-kv_on="добавлено" data-kv_off="добавить"></div>
                      <div class="kv-switcher__box">
                         <svg class="kv-switcher__icon">
                            <use href="img/icons/icons.svg#check"></use>
                         </svg>
                         <div class="kv-switcher__mark"></div>
                      </div>
                   </span>
            </label>
          </div>
        </div>
      </div>
      <!-- Services item-->
      <div class="kv-services__item">
        <div class="kv-service kv-services__item-inner">
          <div class="kv-service__main">
            <div class="kv-service__title">Visum-Comfort-Service</div>
            <div class="kv-service__text">Zeitsparender Visum-Comfort-Service mit folgenden
              Leistungen im Premiumpaket: Bearbeitung Visumantrag inkl. Ausfüllservice aller
              Unterlagen und Klärung konsularischer Fragen, Rückkehrwilligkeit und
              Versicherungs-police (Prämie+Selbstbeteiligung),Notfall-service bei Passverlust.
              Senden Sie uns nur Ihren Reisepass, Passfoto und das Formular
              "Visum-Comfort-Service", welches Sie in unserem "Download" Bereich erhalten.
            </div>
          </div>
          <div class="kv-service__aside">
            <div class="kv-price kv-service__price">15</div>
            <div class="kv-service__caption">pro Person</div>
          </div>
        </div>
        <!-- Class-->
        <div class="kv-class">
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_add kv-class__item_active">
            <div class="kv-class__caption">включено</div>
            <svg class="kv-class__check">
              <use href="img/icons/icons.svg#check"></use>
            </svg>
          </div>
          <!-- Class item-->
          <div class="kv-class__item kv-class__item_add">
            <div class="kv-class__caption">включено</div>
            <svg class="kv-class__check">
              <use href="img/icons/icons.svg#check"></use>
            </svg>
          </div>
          <!-- Class item-->
          <div class="kv-class__item">
            <label class="kv-switcher kv-class__switcher">
              <input
                  class="kv-switcher__input" type="checkbox" checked name="switcher"
                  aria-label="switcher" required>
              <span class="kv-switcher__inner">
                      <div class="kv-switcher__caption kv-class__caption" data-kv_on="добавлено" data-kv_off="добавить"></div>
                      <div class="kv-switcher__box">
                         <svg class="kv-switcher__icon">
                            <use href="img/icons/icons.svg#check"></use>
                         </svg>
                         <div class="kv-switcher__mark"></div>
                      </div>
                   </span>
            </label>
          </div>
        </div>
      </div>
      <div class="kv-services__footer">
        <div class="kv-services__prices">
          <!-- Class footer-->
          <div class="kv-services-price kv-services-price_active kv-services__price">
            <div class="kv-price kv-price_second kv-services-price__price">30</div>
            <div class="kv-services-price__person">pro Person</div>
            <div class="kv-services-price__btn">Выбрать</div>
          </div>
          <!-- Class footer-->
          <div class="kv-services-price kv-services__price">
            <div class="kv-price kv-price_second kv-services-price__price">+ 40,00</div>
            <div class="kv-services-price__person">pro Person</div>
            <div class="kv-services-price__btn">Выбрать</div>
          </div>
          <!-- Class footer-->
          <div class="kv-services-price kv-services__price">
            <div class="kv-price kv-price_second kv-services-price__price">+ 265,00</div>
            <div class="kv-services-price__person">pro Person</div>
            <div class="kv-services-price__btn">Выбрать</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step4"
}
</script>

<style scoped>

</style>
