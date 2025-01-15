import { describe, expect, test } from '@jest/globals';
import { swapElements } from '../scripts/sorting/helpers';

describe('swapElements', () => {
    test('should swap elements at index 0 and index 1', () => {
        const arr = [1, 2, 3];
        swapElements(arr, 0, 1);
        expect(arr).toEqual([2, 1, 3]);
    });

    test('should swap elements with generic types', () => {
        const arr = ['a', 'b', 'c'];
        swapElements(arr, 0, 2);
        expect(arr).toEqual(['c', 'b', 'a']);
    });

    test('should not modify the array when i and j are the same', () => {
        const arr = [1, 2, 3];
        swapElements(arr, 1, 1);
        expect(arr).toEqual([1, 2, 3]);
    });

    test('should work with different data types', () => {
        const arr = [1, 'two', true];
        swapElements(arr, 0, 2);
        expect(arr).toEqual([true, 'two', 1]);
    });

    test('should work with empty arrays', () => {
        /* just make sure that it doesn't throw errors */
        swapElements([], 0, 1);
    });

    test('should handle out-of-bounds indices gracefully', () => {
        const arr = [10, 20];
        /* Swapping with an out-of-bounds index should not throw an error, but it may not do anything */
        expect(() => swapElements(arr, -1, 1)).not.toThrow();
        expect(() => swapElements(arr, 1, 3)).not.toThrow();
        expect(arr).toEqual([10, 20]);
    });
});
