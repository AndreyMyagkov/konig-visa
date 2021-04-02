/**
 * Разбивает массив array на массив подмассивов длинной size
 * @param {Array} array - входной массив
 * @param {Number} size - длинна подмассива
 * @return {Array}
 */
export function arrayToSubArrays(array = [], size = 1){
    if (array === null) {
        return []
    }
    const subarray = [];
    for (let i = 0; i < Math.ceil(array.length / size); i++){
        subarray[i] = array.slice((i * size), (i * size) + size);
    }
    return subarray
}
