export const arrayRange = (start, stop, step) => {
    return Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );
}


export const getRandomArray = () => {
    const baseArray = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9];
    const modifiedArray = baseArray.map((value, index) => {
        return {
            value,
            id: index + 1,
            open: false,
        }
    })

    return modifiedArray.sort(() => Math.random() > 0.5 ? 1 : -1)
}


// [
//     {
//         id: 1
//     }
// ]