export default function createArray(n: number) {
    let array: number[] = [];
    for (let i = 0; i < n; i++) {
        array.push(i);
    }
    return array;
}