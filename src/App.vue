<template>
  <div id="kv-app" class="kv-app" notranslate>

    <!-- HEADER -->
    <div class="kv-header">

      <!-- Bread Crumbs -->
      <BreadCrumbs :crumbs="crumbs"/>
      <!-- /Bread Crumbs -->

      <!-- Info bar -->
      <div class="kv-header__item kv-step-values">
        <div class="kv-step-values__inner">
          <div class="kv-step-values__row">
            <div class="kv-step-values__item" v-if="countrySelected.name">
              <span>{{countrySelected.name}}</span>
            </div>


            <div class="kv-step-values__item" v-if="serviceNameSelected">
              <span>{{serviceNameSelected}}</span>
              <!--<span>30 дней | 2-х кратная</span>-->
            </div>

          </div>

          <!-- cart -->
          <!--
          <div class="kv-step-values__aside">

            <div class="kv-participants"> <svg class="kv-participants__icon">
              <use href="img/icons/icons.svg#user"></use>
            </svg>

              <div class="kv-participants__multiply"> <svg>
                <use href="img/icons/icons.svg#multiply"></use>
              </svg> </div>

              <div class="kv-participants__counter">2</div>
            </div>

            <div class="kv-cart drop">

              <div class="kv-cart__head"> <svg class="kv-cart__icon">
                <use href="img/icons/icons.svg#cart"></use>
              </svg>

                <div class="kv-cart__price" data-kv-cart-price="€"> 420</div> <svg
                    class="kv-cart__arrow drop__angle">
                  <use href="img/icons/icons.svg#arrow_down"></use>
                </svg>
              </div>

              <div class="kv-cart__body drop__body">

                <div class="kv-cart-table">

                  <div class="kv-cart-table__row">

                    <div class="kv-cart-table__item">1</div>

                    <div class="kv-cart-table__item kv-cart-table__item_col">herr Иванов Иван</div>

                    <div class="kv-cart-table__item kv-cart-table__item_price"
                         data-kv-cart-price="€">100</div>
                  </div>

                  <div class="kv-cart-table__row">

                    <div class="kv-cart-table__item">1</div>

                    <div class="kv-cart-table__item kv-cart-table__item_col">herr Иванов Иван</div>

                    <div class="kv-cart-table__item kv-cart-table__item_price"
                         data-kv-cart-price="€">100</div>
                  </div>

                  <div class="kv-cart-table__row">

                    <div class="kv-cart-table__item">1</div>

                    <div class="kv-cart-table__item kv-cart-table__item_col">herr Иванов Иван</div>

                    <div class="kv-cart-table__item kv-cart-table__item_price"
                         data-kv-cart-price="€">100</div>
                  </div>

                  <div class="kv-cart-table__row">

                    <div class="kv-cart-table__item">1</div>

                    <div class="kv-cart-table__item kv-cart-table__item_col">herr Иванов Иван</div>

                    <div class="kv-cart-table__item kv-cart-table__item_price"
                         data-kv-cart-price="€">100</div>
                  </div>

                  <div class="kv-cart-table__row">

                    <div class="kv-cart-table__item">1</div>

                    <div class="kv-cart-table__item kv-cart-table__item_col">herr Иванов Иван</div>

                    <div class="kv-cart-table__item kv-cart-table__item_price"
                         data-kv-cart-price="€">100</div>
                  </div>

                  <div class="kv-cart-table__row">

                    <div class="kv-cart-table__item">1</div>

                    <div class="kv-cart-table__item kv-cart-table__item_col">herr Иванов Иван</div>

                    <div class="kv-cart-table__item kv-cart-table__item_price"
                         data-kv-cart-price="€">100</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          -->
          <!-- /cart -->

        </div>
      </div>
      <!-- /Info bar -->

      <!-- ProgressBar -->
      <ProgressBar :now="currentStep" :all="steps.length"/>
      <!-- ProgressBar -->

    </div>
    <!-- /HEADER -->


    <!-- MAIN -->
    <div class="kv-content">
      <!-- Step Header -->
      <StepHeader :icon="stepInfo.icon" :text="stepInfo.header"/>
      <!-- /Step Header -->


      <div class="kv-content__body">
        <!-- Step 1 -->
          <div class="kv-buch"  v-if="currentStep === 1">

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
                      <select class="kv-select__input" v-model="selectedCountryId" @change="countryChange">
                        <option value="0" selected>Не выбрано</option>
                        <option :value="item.codeA3" v-for="item in countries" :key="item.codeA3">{{item.name}}</option>
                      </select>
                      <svg class="kv-selct__arrow">
                        <use href="img/icons/icons.svg#arrow_down"></use>
                      </svg>
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
                  <VisaTypes :data="serviceGroups" :selected="[selectedServiceGroup, selectedService]" @change="selectVisaType"></VisaTypes>
                </div>
              </div>
              <!-- /Groups -->

              <!-- Services -->
              <div class="kv-buch__col">
                <div class="kv-buch__col-inner"  v-if="serviceGroupsSelected.length">
                  <div class="kv-buch__title">Выберите подтип визы:</div>
                  <VisaTypes :data="serviceGroupsSelected"  :selected="[selectedService]" @change="selectVisaType"></VisaTypes>
                  <!--
                  <div class="kv-buch__list kv-buch__list_scroll">

                    <div class="kv-buch__list-item" v-for="item in serviceGroupsSelected" :key="item.serviceId" @click="selectService(item.serviceId)">
                      <label class="kv-buch-chb">
                        <input type="radio" checked name="visa-type" aria-label="checkbox">
                        <span class="kv-buch-chb__caption">
                          <span class="kv-buch-chb__title">
                            {{item.name}}
                            <svg class="kv-buch-chb__icon"><use href="img/icons/icons.svg#play"></use></svg>
                          </span>
                          <span class="kv-buch-chb__badge"  :title="item.description">
                            <svg class="kv-buch-chb__info"  v-if="item.description"><use href="img/icons/icons.svg#info"></use></svg>
                            <span v-html="item.description" style="display: none"></span>
                          </span>
                        </span>
                      </label>
                    </div>

                  </div>
                  -->
                </div>
              </div>
              <!-- /Services -->

            </div>
          </div>
        <!-- /Step 1 -->


        <!-- STEP 2 -->
        <div  class="kv-content__body" v-if="currentStep === 2">

          <div class="kv-calc-block">
            <!-- Staying-->
            <div class="kv-staying">

              <!-- text -->
              <div class="kv-staying__text">
                <span class="kv-staying__text_bold">СРОК ПРЕБЫВАНИЯ</span> is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                a type specimen book.
              </div>
              <!-- /text -->

              <!-- Staying list -->
              <div class="kv-staying__list">

                <div class="kv-staying__item">
                  <label class="kv-staying-chb">
                    <input type="radio" checked name="kv-staying"                                                                                      aria-label="checkbox" required>
                    <span class="kv-staying-chb__caption">bis zu <span>10</span>* Tage</span>
                  </label>
                </div>

                <div class="kv-staying__item"> <label class="kv-staying-chb"> <input type="radio" name="kv-staying"
                                                                                     aria-label="checkbox" required>

                  <span class="kv-staying-chb__caption">bis zu <span>20</span>* Tage</span> </label>
                </div>

                <div class="kv-staying__item"> <label class="kv-staying-chb"> <input type="radio" name="kv-staying"
                                                                                     aria-label="checkbox" required>

                  <span class="kv-staying-chb__caption">bis zu <span>30</span>* Tage</span> </label>
                </div>

                <div class="kv-staying__item"> <label class="kv-staying-chb"> <input type="radio" name="kv-staying"
                                                                                     aria-label="checkbox" required>

                  <span class="kv-staying-chb__caption">bis zu <span>40</span>* Tage</span> </label>
                </div>

                <div class="kv-staying__item"> <label class="kv-staying-chb"> <input type="radio" name="kv-staying"
                                                                                     aria-label="checkbox" required>

                  <span class="kv-staying-chb__caption">bis zu <span>50</span>* Tage</span> </label>
                </div>

                <div class="kv-staying__item"> <label class="kv-staying-chb"> <input type="radio" name="kv-staying"
                                                                                     aria-label="checkbox" required>

                  <span class="kv-staying-chb__caption">bis zu <span>60</span>* Tage</span> </label>
                </div>
              </div>
              <!-- /Staying list -->

            </div>
            <!-- /Staying-->

            <!-- Processing-->
            <div class="kv-processing">
              <div class="kv-processing__caption">

                <div class="kv-processing__btn">

                  <div class="kv-btn-info"> <svg>
                    <use href="img/icons/icons.svg#ask"></use>
                  </svg>Инфо-кнопка </div>
                </div>

                <div class="kv-processing__text">

                  <span class="kv-processing__text_bold">СРОК ОБРАБОТКИ</span> is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book.
                </div>

                <div class="kv-processing__text">Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
                  the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                  specimen book.</div>
              </div>


              <!-- selects -->
              <div class="kv-processing__row">

                <div class="kv-processing__item">

                  <div class="kv-processing__label">Гражданство:</div>

                  <div class="kv-processing__select kv-select">

                    <div class="kv-select__badge">
                      <svg class="kv-select__icon"><use href="img/icons/icons.svg#home"></use></svg>
                    </div>
                    <select class="kv-select__input">
                      <option value="0" label="Выберите"></option>
                      <option :value="item.codeA3" v-for="item in nationalities" :key="item.codeA3">{{item.name}}</option>
                    </select>
                    <svg class="kv-selct__arrow"><use href="img/icons/icons.svg#arrow_down"></use></svg>
                  </div>
                </div>

                <div class="kv-processing__item">

                  <div class="kv-processing__label">Место жительства:</div>

                  <div class="kv-processing__select kv-select">

                    <div class="kv-select__badge"> <svg class="kv-select__icon">
                      <use href="img/icons/icons.svg#pin"></use>
                    </svg> </div> <select class="kv-select__input" name="form[]" id="select" required>
                    <option value="" selected="selected" label="Россия"></option>
                    <option value="2">option 1</option>
                    <option value="3">option 2</option>
                    <option value="4">option 3</option>
                    <option value="5">option 4</option>
                    <option value="6">option 5</option>
                    <option value="5">option 6</option>
                    <option value="6">option 7</option>
                    <option value="3">option 2</option>
                    <option value="4">option 3</option>
                    <option value="5">option 4</option>
                    <option value="6">option 5</option>
                    <option value="5">option 6</option>
                    <option value="6">option 7</option>
                  </select> <svg class="kv-selct__arrow">
                    <use href="img/icons/icons.svg#arrow_down"></use>
                  </svg>
                  </div>
                </div>
              </div>
              <!-- /selects -->

            </div>
            <!-- /Processing-->

            <!-- Processing days-->
            <div class="kv-processing-days">

              <!-- Processing day-->
              <div class="kv-processing-days__item">
                <label class="kv-processing-day"> <input type="radio" disabled
                                                         name="kv-processing-day" aria-label="checkbox" required>

                  <div class="kv-processing-day__header">

                    <div class="kv-processing-day__title">Bearbeitungszeit</div>

                    <div class="kv-processing-day__nuber">15</div>

                    <div class="kv-processing-day__subtitle">Werktage</div>
                  </div>

                  <div class="kv-processing-day__body">

                    <div class="kv-processing-day__text">Lorem Ipsum is simply dummy text of the
                      printing and typesetting industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an unknown printer took a galley of type
                      and scrambled it to make a type specimen book.</div>

                    <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                       name="kv-processing-day-chb" aria-label="checkbox" required>

                      <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">1-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">135 <span>€</span></span></span></span>
                    </label> </div>
                  </div>
                </label>
              </div>
              <!-- /Processing day-->

              <!-- Processing day-->
              <div class="kv-processing-days__item">
                <label class="kv-processing-day"> <input type="radio"
                                                         name="kv-processing-day" aria-label="checkbox" required>

                  <div class="kv-processing-day__header">

                    <div class="kv-processing-day__title">Bearbeitungszeit</div>

                    <div class="kv-processing-day__nuber">15</div>

                    <div class="kv-processing-day__subtitle">Werktage</div>
                  </div>

                  <div class="kv-processing-day__body">

                    <div class="kv-processing-day__text">Lorem Ipsum is simply dummy text of the
                      printing and typesetting industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an unknown printer took a galley of type
                      and scrambled it to make a type specimen book.</div>

                    <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                       name="kv-processing-day-chb" aria-label="checkbox" required>

                      <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">1-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">135 <span>€</span></span></span></span>
                    </label> </div>

                    <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                       name="kv-processing-day-chb" aria-label="checkbox" required>

                      <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">2-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">145 <span>€</span></span></span></span>
                    </label> </div>

                    <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                       name="kv-processing-day-chb" aria-label="checkbox" required>

                      <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">x-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">155 <span>€</span></span></span></span>
                    </label> </div>

                    <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                       name="kv-processing-day-chb" aria-label="checkbox" required>

                      <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">y-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">165 <span>€</span></span></span></span>
                    </label> </div>
                  </div>
                </label> </div>
              <!-- Processing day-->

              <div class="kv-processing-days__item"> <label class="kv-processing-day"> <input type="radio"
                                                                                              name="kv-processing-day" aria-label="checkbox" required>

                <div class="kv-processing-day__header">

                  <div class="kv-processing-day__title">Bearbeitungszeit</div>

                  <div class="kv-processing-day__nuber">15</div>

                  <div class="kv-processing-day__subtitle">Werktage</div>
                </div>

                <div class="kv-processing-day__body">

                  <div class="kv-processing-day__text">Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the industry's standard
                    dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.</div>

                  <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                     name="kv-processing-day-chb" aria-label="checkbox" required>

                    <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">1-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">135 <span>€</span></span></span></span>
                  </label> </div>

                  <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                     name="kv-processing-day-chb" aria-label="checkbox" required>

                    <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">2-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">145 <span>€</span></span></span></span>
                  </label> </div>

                  <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                     name="kv-processing-day-chb" aria-label="checkbox" required>

                    <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">x-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">155 <span>€</span></span></span></span>
                  </label> </div>

                  <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                     name="kv-processing-day-chb" aria-label="checkbox" required>

                    <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">y-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">165 <span>€</span></span></span></span>
                  </label> </div>
                </div>
              </label> </div> <!-- Processing day-->

              <div class="kv-processing-days__item"> <label class="kv-processing-day"> <input type="radio"
                                                                                              name="kv-processing-day" aria-label="checkbox" required>

                <div class="kv-processing-day__header">

                  <div class="kv-processing-day__title">Bearbeitungszeit</div>

                  <div class="kv-processing-day__nuber">15</div>

                  <div class="kv-processing-day__subtitle">Werktage</div>
                </div>

                <div class="kv-processing-day__body">

                  <div class="kv-processing-day__text">Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the industry's standard
                    dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.</div>

                  <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                     name="kv-processing-day-chb" aria-label="checkbox" required>

                    <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">1-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">135 <span>€</span></span></span></span>
                  </label> </div>

                  <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                     name="kv-processing-day-chb" aria-label="checkbox" required>

                    <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">2-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">145 <span>€</span></span></span></span>
                  </label> </div>

                  <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                     name="kv-processing-day-chb" aria-label="checkbox" required>

                    <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">x-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">155 <span>€</span></span></span></span>
                  </label> </div>

                  <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                     name="kv-processing-day-chb" aria-label="checkbox" required>

                    <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">y-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">165 <span>€</span></span></span></span>
                  </label> </div>
                </div>
              </label> </div> <!-- Processing day-->

              <div class="kv-processing-days__item"> <label class="kv-processing-day"> <input type="radio"
                                                                                              name="kv-processing-day" aria-label="checkbox" required>

                <div class="kv-processing-day__header">

                  <div class="kv-processing-day__title">Bearbeitungszeit</div>

                  <div class="kv-processing-day__nuber">15</div>

                  <div class="kv-processing-day__subtitle">Werktage</div>
                </div>

                <div class="kv-processing-day__body">

                  <div class="kv-processing-day__text">Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the industry's standard
                    dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.</div>

                  <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                     name="kv-processing-day-chb" aria-label="checkbox" required>

                    <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">1-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">135 <span>€</span></span></span></span>
                  </label> </div>

                  <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                     name="kv-processing-day-chb" aria-label="checkbox" required>

                    <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">2-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">145 <span>€</span></span></span></span>
                  </label> </div>

                  <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                     name="kv-processing-day-chb" aria-label="checkbox" required>

                    <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">x-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">155 <span>€</span></span></span></span>
                  </label> </div>

                  <div class="kv-processing-day__item"> <label class="kv-processing-day-chb"> <input type="radio"
                                                                                                     name="kv-processing-day-chb" aria-label="checkbox" required>

                    <span class="kv-processing-day-chb__inner"><span class="kv-processing-day-chb__box"> <svg>
                                        <use href="img/icons/icons.svg#radio"></use>
                                    </svg></span>

                                <span class="kv-processing-day-chb__caption"><span
                                    class="kv-processing-day-chb__text">y-malige Einreise</span>

                                    <span class="kv-processing-day-chb__title">165 <span>€</span></span></span></span>
                  </label> </div>
                </div>
              </label>
              </div>
            </div>
            <!-- /Processing days-->

            <!-- Calc bloc info-->
            <div class="kv-calc-block__info">

              <div class="kv-calc-info">

                <div class="kv-calc-info__icon">
                  <svg>
                    <use href="img/icons/icons.svg#surface"></use>
                  </svg>
                </div>

                <div class="kv-calc-info__text">В стоимость входит:
                  <span class="kv-calc-info__text_bold"> консульский сбор, сервисный сбор, сбор за приглашение</span>
                </div>

              </div>
            </div>
            <!-- /Calc bloc info-->
          </div>


        </div>
        <!-- /STEP 2 -->

        <!-- STEP 3 -->
        <div  class="kv-content__body" v-if="currentStep === 3">
          ШАГ {{currentStep}}
        </div>
        <!-- /STEP 3 -->

        <!-- STEP 4 -->
        <div  class="kv-content__body" v-if="currentStep === 4">
          ШАГ {{currentStep}}
        </div>
        <!-- /STEP 4 -->

        <!-- STEP 5 -->
        <div  class="kv-content__body" v-if="currentStep === 5">
          ШАГ {{currentStep}}
        </div>
        <!-- /STEP 5 -->

        <!-- STEP 6 -->
        <div  class="kv-content__body" v-if="currentStep === 6">
          ШАГ {{currentStep}}
        </div>
        <!-- /STEP 6 -->

        <!-- STEP 7 -->
        <div  class="kv-content__body" v-if="currentStep === 7">
          ШАГ {{currentStep}}
        </div>
        <!-- /STEP 7 -->


        <div class="kv-buch__bottom" style="margin-top: 30px;display: flex;justify-content: center;">

          <div class="kv-content__prev" v-if="currentStep > 1">
            <button
                type="button"
                class="kv-step-button"
                :disabled="false"
                @click="currentStep = currentStep - 1"
                >
                <svg>
                  <use href="img/icons/icons.svg#back"></use>
                </svg>
                <span>Назад</span>
            </button>
          </div>

          <div class="kv-content__next" v-if="currentStep < 7">
            <button
                type="button"
                class="kv-step-button"
                :disabled="!allowNext"
                @click="currentStep = currentStep + 1"
                >
                <span>Вперёд</span>
                <svg><use href="img/icons/icons.svg#next"></use></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
    <!-- /MAIN -->




    <loading :active="isLoading"
             :can-cancel="false"
             :is-full-page="true">

    </loading>
  </div>
</template>

<script>
import BreadCrumbs from './components/BreadCrumbs.vue';
import ProgressBar from './components/ui/ProgressBar.vue';
import StepHeader from './components/ui/StepHeader';
import kvSelect from './components/ui/kvSelect';
import VisaTypes from "@/components/ui/VisaTypes";
import Loading from 'vue-loading-overlay';

// TODO: стили изолировать
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'App',
  components: {
    BreadCrumbs,
    ProgressBar,
    StepHeader,
    VisaTypes,
    kvSelect,
    Loading
  },
  data() {
    return {
      steps: [
        {
          crumb: 'Buchungsauftrag',
          header: 'Buchungsauftrag',
          icon: 'step_1'
        },
        {
          crumb: 'Aufenthaltsdauer',
          header: 'Расчет примерной стоимости для одного человека',
          icon: 'icon 2'
        },
        {
          crumb: 'Заполнение данных о туристах',
          header: 'Заполнение данных',
          icon: 'icon 3'
        },
        {
          crumb: 'Заполнение данных о клиентах',
          header: 'Информация о заказчике',
          icon: 'icon 4'
        },
        {
          crumb: 'Способ отправки',
          header: 'Способ отправки',
          icon: 'icon 5'
        },
        {
          crumb: 'Проверка данных',
          header: 'Проверка данных',
          icon: 'icon 6'
        },
        {
          crumb: 'Способ оплаты',
          header: 'Способ оплаты',
          icon: 'icon 7'
        }
      ],
      currentStep: 1,
      isLoading: false,

      countries: [],
      services: [],
      serviceGroups: [],
      nationalities: [],

      //TODO: Препарированные. Сверху убрать?
      serviceGroupsPrepared: [],

      selectedCountryId: 0,
      selectedServiceGroup: null,
      selectedService: null,

      CONFIG: {
        clientId: '',
        API_URL: 'https://apisrv.ideo-software.com/Ideo/KoenigVN/Web/api/OrderPortal/'
      }
    }
  },
  methods: {
    /**
     * Инициирует виджет, проверяет входные данные
     */
    initiateWidgete() {

      if (__KV_CONFIG && __KV_CONFIG.clientId) {
        this.CONFIG.clientId = __KV_CONFIG.clientId;
      } else {
        return false
      }

      // Подавить замену цифр на телефоны https://gist.github.com/yuezk/15c5bb1370e30d0a2a60
      const head = document.head;
      const meta = document.createElement('meta');
      meta.name = 'format-detection';
      meta.content = 'telephone=no';
      head.appendChild(meta);

      // Подключить внешний файл CSS
      if (__KV_CONFIG && __KV_CONFIG.css) {
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = __KV_CONFIG.css;
        head.appendChild(link);
      }

      return true
    },


    /**
     * Загружает справочник стран
     */
    async loadCountries() {
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSCountries?clientId=${this.CONFIG.clientId}`);
        let countries = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }
        this.countries = countries.countries;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },


    /**
     * Загружает справочник гражданств
     */
    async loadNationalities() {
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSNationalities?clientId=${this.CONFIG.clientId}`);
        let nationalities = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }
        this.nationalities = nationalities.nationalities;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },

    /**
     *  Смена страны: загрузка справочника достуных типов виз
     */
    async countryChange() {
      console.log('Изменилась страна ' + this.selectedCountryId);
      if (!this.selectedCountryId) {
        console.log('Страна не выбрана'); // TODO: что делаем?
        return
      }

      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSServices?clientId=${this.CONFIG.clientId}&countryA3=${this.selectedCountryId}`);
        let services = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(services.Message);
        }



        console.log('сервисы:');
        const srv = this.servicesPrepare(services.services)
        console.log(srv);

        console.log('группы:');
        const grp = this.servicesPrepare(services.serviceGroups)
        console.log(grp);

        console.log('группы + сервисы:');
        const grpServ = this.servicesGroupsPrepare(grp, srv);
        console.log(grpServ)

        this.services = srv;
        this.serviceGroups = grpServ;

        this.selectedServiceGroup = null;
        this.selectedService = null;

        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }

    },
  //  ПО выбору смотреть тип. Выбирать группу или сервис и открывать шаг
    /**
     * Возращает сервисы игруппы, приведенные к единому типу: {id, srvGrpId, type,  name, description}
     */
    servicesPrepare(data) {
      return data.map(item => {
        return {
          id: item.serviceId || item.id,
          srvGrpId: item.srvGrpId ? item.srvGrpId : null,
          type: (item.srvGrpId === undefined) ? 'group' : 'item',
          name: item.name,
          description: item.description,
          selected: false
        }
      })
    },

    /**
     * Возращает группы сервисов, плюс сервисы без группы
     */
    servicesGroupsPrepare(groups, services) {
      services = services.filter(item => item.srvGrpId === null)
      return [...groups, ...services]
    },

    /**
     * Выбор типа виз (группы или типа)
     */
    selectVisaType(item) {
      if (item.type === 'group') {
        console.log('Выбрана группа ' + item.id);
        this.selectedServiceGroup = item.id;
        this.selectedService = null;
      } else {
        console.log('Выбрана тип' + item.id);
        this.selectedService = item.id;
        this.selectedServiceGroup = item.srvGrpId;
      }

      this.serviceGroups.forEach(_ => {
        _.selected = false;
        if (item.id === _.id) {
          _.selected = true;
        }
      })

      this.services.forEach(_ => {
        _.selected = false;
        if (item.id === _.id) {
          _.selected = true;
        }
      })

    },

    /**
     * Выбор группы виз
     * TODO: DEL
     */
    selectServiceGroup(id) {
      this.selectedServiceGroup = id;
      console.log('Выбрана группа '+ id)
    },

    /**
     * Выбор типа виз
     * TODO: DEL
     */
    selectService(id) {
      this.selectedService = id;
      console.log('Выбран тип виз '+ id)
    }

  },
  computed: {

    /**
     * Возращает информацию по текущему шагу
     * @return {{crumb: string, icon: string, header: string}}
     */
    stepInfo() {
      return this.steps[this.currentStep - 1]
    },



    /**
     *  Функцию возращает цепочку по текущему шагу
     *
     */
    crumbs() {
      return this.steps.slice(0, this.currentStep).map(el => el.crumb )
    },

    /**
     * Можно ли преейти на следующий шаг из текущего
     */
    allowNext() {
      // FIXME: to debug true
      return true
      if (this.currentStep === 1) {
        if (this.selectedCountryId && this.selectedService) {
          return true
        }
      }

      // TODO: проверка
      if (this.currentStep === 2) {
        return true
      }
      // TODO: проверка
      if (this.currentStep === 3) {
        return true
      }

      // TODO: проверка
      if (this.currentStep === 4) {
        return true
      }

      // TODO: проверка
      if (this.currentStep === 5) {
        return true
      }
      // TODO: проверка
      if (this.currentStep === 6) {
        return true
      }
      // TODO: проверка
      if (this.currentStep === 7) {
        return true
      }
      return false
    },

    /**
     * Возращает информация по выбранной стране
     * @return {}
     */
    countrySelected() {
      //console.log(this.countries.filter(item => item.codeA3 == this.selectedCountryId))
      const country = this.countries.find(item => item.codeA3 == this.selectedCountryId)
      return country || {name: ''}
    },

    /**
     * Возращает название выбранного типа визы
     * @return {String}
     */
    serviceNameSelected() {
      const service = this.services.find(item => item.id == this.selectedService)
      return service ? service.name : ''
    },


    /**
     * Возращает подтипы виз по выбранному типу виз
     * @return {[]}
     */
    serviceGroupsSelected() {
      return this.services.filter(item => item.srvGrpId  && item.srvGrpId === this.selectedServiceGroup)
    }


  },
  mounted() {
    // 1. Инициировать виджет
    if (!this.initiateWidgete()) {
      return false
    }

    // 2. Загружаем справочники стран
    this.loadCountries()

    // Загрузка списка гражданств
    // TODO: вынос в mount шага 2, кеш
    this.loadNationalities()

  }
}
</script>

<style lang="scss">
#kv-app {
  --primary: #02a7f0;
}

.vld-overlay {
  bottom: 0 !important;
  left: 0 !important;;
  position: absolute !important;;
  right: 0 !important;;
  top: 0 !important;;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
}
</style>
