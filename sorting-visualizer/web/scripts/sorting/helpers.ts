/* If i or j will be out of bound, functin doesn't modifies received array */
export function swapElements<T>(array: T[], i: number, j: number): void {
    if (array.length < 2 || i < 0 || j >= array.length) {
        return;
    }

    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}
