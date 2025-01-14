import { Item, AnimationStep } from '../sorting/sorter';
import { Visualizer, VisualizerArgs } from './visualizer';

export class Bars<T> implements Visualizer<T> {
    private _items: Item<T>[] = [];

    init(args: VisualizerArgs): void {
        this.addElements(args);
    }

    private addElements(args: VisualizerArgs): void {
        const heightDiff = args.maxHeight / args.numOfBars;
        const parentElement = document.getElementById(args.parentID)!;

        for (let i = 0; i < args.numOfBars; i++) {
            const id = args.baseID + i;
            const height = args.maxHeight - i * heightDiff;

            const bar = this.createBarElement(
                args.baseID + i,
                args.maxWidth,
                height,
            );

            /* Can't imagine other solution :D Bars can't be used with other types */
            this._items.push({ value: <T>height, id: id });

            parentElement.appendChild(bar);
        }
    }

    private createBarElement(
        id: string,
        width: number,
        height: number,
    ): HTMLDivElement {
        const div = document.createElement('div');

        div.id = id;
        div.style.height = height + 'px';
        div.style.width = width + 'px';

        return div;
    }

    resize(maxHeight: number): void {
        console.log(maxHeight);
    }

    items(): Item<T>[] {
        return this._items;
    }

    randomize(): void {}

    sort(items: Item<T>[], steps: AnimationStep<T>, delay: () => number): void {
        console.log(items);
        console.log(steps);
        console.log(delay());
    }
}
