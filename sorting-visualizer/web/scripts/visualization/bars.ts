import { swapElements } from '../sorting/helpers';
import { Item, AnimationStep } from '../sorting/sorter';
import { addAnimation, clearAnimation, swapHTMLElements } from './helpers';
import { Visualizer, VisualizerArgs } from './visualizer';

export class Bars<T> implements Visualizer<T> {
    private _items: Item<T>[] = [];

    private _parentElement!: HTMLDivElement;

    private _initialMaxHeight!: number;
    private _initalMaxWidth!: number;

    private _lastAnimationStep: AnimationStep<T> = {
        green: [],
        red: [],
        swap: [],
    };
    private _animationRunning: boolean = false;

    private _delay!: () => number;

    init(args: VisualizerArgs): void {
        this.addElements(args);

        this._initialMaxHeight = args.maxHeight;
        this._initalMaxWidth = args.maxWidth;
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

            this._parentElement.prepend(bar);
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
        const heightScale = maxHeight / this._initialMaxHeight;
        const widthScale = maxWidth / this._initalMaxWidth;

        this._items
            .map((x) => [
                x.value,
                document.getElementById(x.id) as HTMLDivElement,
            ])
            .forEach(([value, element]) => {
                (<HTMLDivElement>element).style.height =
                    <number>value * heightScale + 'px';

                (<HTMLDivElement>element).style.width =
                    <number>value * widthScale + 'px';
            });
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

        this.syncElementsOrder();
    }

    async sort(
        items: Item<T>[],
        steps: AnimationStep<T>[],
        delay: () => number,
    ): Promise<void> {
        this._items = items;
        this._delay = delay;
        this._animationRunning = true;

        console.log(steps);

        for (let i = 0; i < steps.length; i++) {
            clearAnimation(this._lastAnimationStep);

            this._lastAnimationStep = steps[i];
            addAnimation(this._lastAnimationStep);
            swapHTMLElements(this._parentElement, this._lastAnimationStep);

            const sleepTime = this._delay();

            if (sleepTime == -1) {
                this.syncElementsOrder();
                clearAnimation(this._lastAnimationStep);
                this._animationRunning = false;

                return;
            }

            await this.sleep(this._delay());
        }

        this._animationRunning = false;
        clearAnimation(this._lastAnimationStep);
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    end(): void {
        if (this._animationRunning) {
            this._delay = this.fakeDelay;
            return;
        }

        this.syncElementsOrder();
    }

    private fakeDelay(): number {
        return -1;
    }

    private syncElementsOrder(): void {
        this._items
            .map((x) => document.getElementById(x.id) as HTMLDivElement)
            .forEach((x) => this._parentElement.appendChild(x));
    }
}
