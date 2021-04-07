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
        this.zip = "125130";
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
        this.type = [];
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
