import { describe, expect, test } from '@jest/globals';
import { Insertion } from '../scripts/sorting/insertion';
import { Item, SortArgs, Sorter, SortReply } from '../scripts/sorting/sorter';

type TestSorterInfo<T> = {
    sorter: Sorter<T>;
    compare: (a: Item<T>, b: Item<T>) => number;
};

/* NOTE: Testing only with number types, that is the only one I need for this project ....
 * however test cases can be extended to other types, by simply writing compare functions
 * and adding specific generic sorter classes inside sortersInfo array
 */
describe('sort', () => {
    /* Simple functions to compare numbers */
    const compareNumbers = (a: Item<number>, b: Item<number>): number => {
        return a.value - b.value; // Standard ascending order comparison
    };

    const sortersInfo: TestSorterInfo<number>[] = [
        { sorter: new Insertion<number>(), compare: compareNumbers },
    ];

    /* Simple function to create items */
    const createItem = <T>(value: T): Item<T> => ({
        value,
        id: 'test',
    });

    test('should sort an unsorted array in ascending order', () => {
        const items = [3, 4, 1, 0, -1, 222, 128].map(createItem);
        const expected = [-1, 0, 1, 3, 4, 128, 222].map(createItem);

        sortersInfo.forEach((info) => {
            const sortArgs: SortArgs<number> = {
                items,
                compare: info.compare,
                storeSteps: false,
                stepsFrequency: 1,
            };

            const result: SortReply<number> = info.sorter.sort(sortArgs);

            expect(result.items).toEqual(expected);
        });
    });

    test('should return an empty array when given an empty array', () => {
        const items: Item<number>[] = [];
        const expected: Item<number>[] = [];

        sortersInfo.forEach((info) => {
            const sortArgs: SortArgs<number> = {
                items,
                compare: info.compare,
                storeSteps: false,
                stepsFrequency: 1,
            };

            const result: SortReply<number> = info.sorter.sort(sortArgs);

            expect(result.items).toEqual(expected);
        });
    });

    test('should return the same array for a single-element array', () => {
        const items = [5].map(createItem);
        const expected = [5].map(createItem);

        sortersInfo.forEach((info) => {
            const sortArgs: SortArgs<number> = {
                items,
                compare: info.compare,
                storeSteps: false,
                stepsFrequency: 1,
            };

            const result: SortReply<number> = info.sorter.sort(sortArgs);

            expect(result.items).toEqual(expected);
        });
    });

    test('should return the same array if it is already sorted', () => {
        const items = [1, 2, 3, 4, 5].map(createItem);
        const expected = [1, 2, 3, 4, 5].map(createItem);

        sortersInfo.forEach((info) => {
            const sortArgs: SortArgs<number> = {
                items,
                compare: info.compare,
                storeSteps: false,
                stepsFrequency: 1,
            };

            const result: SortReply<number> = info.sorter.sort(sortArgs);

            expect(result.items).toEqual(expected);
        });
    });

    test('should correctly sort an array sorted in descending order', () => {
        const items = [5, 4, 3, 2, 1].map(createItem);
        const expected = [1, 2, 3, 4, 5].map(createItem);

        sortersInfo.forEach((info) => {
            const sortArgs: SortArgs<number> = {
                items,
                compare: info.compare,
                storeSteps: false,
                stepsFrequency: 1,
            };

            const result: SortReply<number> = info.sorter.sort(sortArgs);

            expect(result.items).toEqual(expected);
        });
    });

    test('should handle arrays with duplicate values correctly', () => {
        const items = [5, 3, 8, 5, 1, 3].map(createItem);
        const expected = [1, 3, 3, 5, 5, 8].map(createItem);

        sortersInfo.forEach((info) => {
            const sortArgs: SortArgs<number> = {
                items,
                compare: info.compare,
                storeSteps: false,
                stepsFrequency: 1,
            };

            const result: SortReply<number> = info.sorter.sort(sortArgs);

            expect(result.items).toEqual(expected);
        });
    });

    test('should correctly sort arrays with negative numbers', () => {
        const items = [5, -3, 8, -2, 0].map(createItem);
        const expected = [-3, -2, 0, 5, 8].map(createItem);

        sortersInfo.forEach((info) => {
            const sortArgs: SortArgs<number> = {
                items,
                compare: info.compare,
                storeSteps: false,
                stepsFrequency: 1,
            };

            const result: SortReply<number> = info.sorter.sort(sortArgs);

            expect(result.items).toEqual(expected);
        });
    });

    test('should handle large numbers correctly', () => {
        const items = [999999, 1, 123456789, 987654321].map(createItem);
        const expected = [1, 999999, 123456789, 987654321].map(createItem);

        sortersInfo.forEach((info) => {
            const sortArgs: SortArgs<number> = {
                items,
                compare: info.compare,
                storeSteps: false,
                stepsFrequency: 1,
            };

            const result: SortReply<number> = info.sorter.sort(sortArgs);

            expect(result.items).toEqual(expected);
        });
    });

    test('should handle very small numbers', () => {
        const items = [0.0001, 0.002, 0.01, 0.00001].map(createItem);
        const expected = [0.00001, 0.0001, 0.002, 0.01].map(createItem);

        sortersInfo.forEach((info) => {
            const sortArgs: SortArgs<number> = {
                items,
                compare: info.compare,
                storeSteps: false,
                stepsFrequency: 1,
            };

            const result: SortReply<number> = info.sorter.sort(sortArgs);

            expect(result.items).toEqual(expected);
        });
    });

    test('should not mutate the original array', () => {
        const originalItems = [3, 4, 1, 0, -1, 222, 128].map(createItem);
        const itemsCopy = [...originalItems];

        sortersInfo.forEach((info) => {
            const sortArgs: SortArgs<number> = {
                items: originalItems,
                compare: info.compare,
                storeSteps: false,
                stepsFrequency: 1,
            };

            const result: SortReply<number> = info.sorter.sort(sortArgs);

            /*  Ensure the original array is not mutated */
            expect(originalItems).toEqual(itemsCopy);
            expect(result.items).not.toBe(originalItems);
        });
    });

    // test('should correctly handle the storeSteps flag and stepsFrequency', () => {
    //     const items = [3, 4, 1, 0, -1, 222, 128].map(createItem);
    //     const expected = [-1, 0, 1, 3, 4, 128, 222].map(createItem);

    //     sortersInfo.forEach((info) => {
    //         const sortArgs: SortArgs<number> = {
    //             items,
    //             compare: info.compare,
    //             storeSteps: true,
    //             stepsFrequency: 2,
    //         };

    //         const result: SortReply<number> = info.sorter.sort(sortArgs);

    //         expect(result.items).toEqual(expected);
    //         /* just make sure that while setting storeSteps to true
    //          * function doesn't returns empty array
    //          */
    //         expect(result.steps.length).toBeGreaterThan(0);
    //     });
    // });
});
