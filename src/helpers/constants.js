// Символ отсутствующей цены
export const dashSymbol = '—';

// Срок визы
export class DurationDefault {
    constructor() {
        this.description = "";
        this.multiplicities = [];
        this.name = "";
        this.nameHTML = "";
        this.index = null;
    }
}
// Цена, кратность, срок обработки
export class PriceDefault {
    constructor() {
        this.price = {
            id: null,
            m: "",
            price: null
        };
        this.info = {
            dimension: "",
            duration: "",
            hours: 0,
            quantity: 0,
        };
    }
}
// Турист
export class Toursit {
    constructor() {
        this.gender = '';
        this.name = '';
        this.sname = '';
        this.nationality = {name: "Выберите", codeA3: null};
        this.residenceRegion = {name: "Выберите", code: null};
        this.discount = null;
        this.birthDate = '';
        this.residenceRegionsRequired = false;
        this.nationalityIsFocused = true;
        this.residenceRegionsFocused = true;
        this.state = 0;
        this.stateDescription = '';
    }
}

// Сервис, группа сервисов
export class ServicesDefault {
    constructor() {
        this.id = null;
        this.srvGrpId = "";
        this.type = "";
        this.name = "";
        this.description = "";
        this.selected = false;
    }
}

// Заказчик
export class CustomerDefault {
    constructor() {
        this.isCompany = false;
        this.addressingCountry = [];
        this.gender = "";
        this.sname = "";
        this.name = "";
        this.address = "";
        this.zip = "";
        this.city = "";
        this.tel = "";
        this.mobile = "";
        this.email = "";
        this.companyName = "";
    }
}

// Доставка
export class DeliveryDefault {
    constructor() {
        this.type = 1;
        this.isCompany = false;
        this.addressingCountry = [];
        this.gender = "";
        this.sname = "";
        this.name = "";
        this.address = "";
        this.zip = "";
        this.city = "";
        this.tel = "";
        this.mobile = "";
        this.email = "";
        this.companyName = "";
        this.branch = ""
    }
}
