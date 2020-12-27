export function calcSomeOfObjects(array) {
    return array.reduce((acc, item) => {
        return acc += item.weight * item.offset
    }, 0)
}
