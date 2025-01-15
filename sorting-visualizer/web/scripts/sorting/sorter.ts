export interface Sorter<T> {
    sort: (args: SortArgs<T>) => SortReply<T>;
}

export type SortArgs<T> = {
    /* Unsorted items
     * NOTE: sort function should not modify this array
     */
    items: Item<T>[];

    /* Compare function should return number according to rules bellow
     *
     * If a > b return any number > 0
     * If a = b return 0
     * If a < b return any number < 0
     */
    compare: (a: Item<T>, b: Item<T>) => number;

    /* If set to true, the sort function will return an array of AnimationStep objects for each iteration,
     * allowing for step-by-step visualization of the sorting process.
     */
    storeSteps: boolean;

    /* If set to a positive integer N, stores animation steps only at every N'th iteration of the sorting process.
     * NOTE:  Argument is useful while storeStep is set to true
     * NOTE: Frequencies less than 1 will be clamped to 1
     */
    stepsFrequency: number;
};

export type SortReply<T> = {
    /* Sorted items */
    items: Item<T>[];

    /* Animation steps */
    steps: AnimationStep<T>[];
};

export type AnimationStep<T> = {
    green: Item<T>[];
    red: Item<T>[];
    /* This arrays length should be 0 or 2, 2 in case if some elements switched place */
    swap: Item<T>[];
};

export type Item<T> = {
    /* Item value */
    value: T;

    /* The ID of elements corresponding HTML element */
    id: string;
};
