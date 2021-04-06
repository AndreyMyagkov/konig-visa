export const dashSymbol = '—';

export class DurationDefault {
    constructor() {
        this.description = "";
        this.multiplicities = [];
        this.name = "";
        this.nameHTML = "";
        this.index = null;
    }
}

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
