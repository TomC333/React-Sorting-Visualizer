import { swapElements } from '../sorting/helpers';
import { Item, AnimationStep } from '../sorting/sorter';
import { Visualizer, VisualizerArgs } from './visualizer';

export class Bars<T> implements Visualizer<T> {
    private _items: Item<T>[] = [];

    private _parentElement!: HTMLDivElement;

    init(args: VisualizerArgs): void {
        this.addElements(args);
    }

    private addElements(args: VisualizerArgs): void {
        const heightDiff = args.maxHeight / args.numOfBars;
        this._parentElement = document.getElementById(
            args.parentID,
        ) as HTMLDivElement;

        for (let i = 0; i < args.numOfBars; i++) {
            const id = args.baseID + i;
            const height = args.maxHeight - i * heightDiff;

            const bar = this.createBarElement(
                args.baseID + i,
                args.classes,
                args.maxWidth,
                height,
            );

            /* Can't imagine other solution :D Bars can't be used with other types */
            this._items.push({ value: <T>height, id: id });

            this._parentElement.appendChild(bar);
        }
    }

    private createBarElement(
        id: string,
        classes: string[],
        width: number,
        height: number,
    ): HTMLDivElement {
        const div = document.createElement('div');

        div.id = id;
        div.classList.add(...classes);
        div.style.height = height + 'px';
        div.style.width = width + 'px';

        return div;
    }

    resize(maxHeight: number, maxWidth: number): void {
        console.log(maxHeight);
        console.log(maxWidth);
    }

    items(): Item<T>[] {
        return this._items;
    }

    randomize(): void {
        // shuffle items
        for (let i = this._items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            swapElements(this._items, i, j);
        }

        this._items
            .map((x) => document.getElementById(x.id) as HTMLDivElement)
            .forEach((x) => this._parentElement.appendChild(x));
    }

    sort(
        items: Item<T>[],
        steps: AnimationStep<T>[],
        delay: () => number,
    ): void {
        console.log(items);
        console.log(steps);
        console.log(delay());
    }

    end(): void {}
}
