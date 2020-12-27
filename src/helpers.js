import {MIN_WEIGHT, MAX_WEIGHT, TEETER_TOTTER_WIDTH, SHAPE_COUNT} from './constants'

function generateRandomObject() {
    const type = Math.floor(Math.random() * SHAPE_COUNT);
    const weight = Math.floor(Math.random() * MAX_WEIGHT) + MIN_WEIGHT;
    const position = Math.floor(Math.random() * TEETER_TOTTER_WIDTH / 2) + 1;
    const height = weight * 8;

    return {
        type,
        weight,
        position,
        height
    }
}

function calcSomeOfObjects(array) {
    return array.reduce((acc, item) => {
        return acc += item.weight * item.position
    }, 0)
}

export {
    generateRandomObject,
    calcSomeOfObjects
}