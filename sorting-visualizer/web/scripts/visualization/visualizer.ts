import { AnimationStep, Item } from '../sorting/sorter';

export interface Visualizer<T> {
    /* Init function should fill parent div with elements */
    init: (args: VisualizerArgs) => void;

    /* Resize function should scale elements height */
    resize: (maxHeight: number, maxWidth: number) => void;

    /* Items function should return items stored inside class */
    items: () => Item<T>[];

    /* Randomize function should shuffle items stored inside class
     * && change view accordingly
     */
    randomize: () => void;

    /* Sort function should update items && create sorting animation */
    sort: (
        items: Item<T>[],
        steps: AnimationStep<T>[],
        delay: () => number,
    ) => void;

    /* If sorting animation is still in progress function should end it immediately */
    end: () => void;
}

export type VisualizerArgs = {
    /* Number of bars to show on display */
    numOfBars: number;

    /* Maximum dimmensions for visualizer elements */
    maxHeight: number;
    maxWidth: number;

    /* Parent div id */
    parentID: string;

    /* Base id of each visualizer item */
    baseID: string;

    /* Class list for each element */
    classes: string[];
};
