import {lng} from "./lng.js"
export default {
    install (Vue, config) {
        Vue.prototype.$lngCurrent = config;
        Vue.prototype.$lng = function (key) {
            return iterate(lng[Vue.prototype.$lngCurrent],key )
        }

    }
}

function iterate(obj, key) {
    if (!key.length) {return ""}

    if (!Array.isArray(key)) {
        key = key.split(".");
    }

    if (key.length > 1) {
        const firstKey= key[0];
        key.shift();
        return iterate(obj[firstKey], key)
    } else {
        // eslint-disable-next-line no-prototype-builtins
        if (obj && obj.hasOwnProperty(key)) {
            return obj[key]
        } else {
            return ""
        }
    }
}
