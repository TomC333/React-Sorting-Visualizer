import { ButtonArgs, Buttons } from './buttons';
import { Bubble } from './sorting/bubble';
import { Insertion } from './sorting/insertion';
import { Merge } from './sorting/merge';
import { Selection } from './sorting/selection';
import { Item, Sorter } from './sorting/sorter';
import { Bars } from './visualization/bars';
import { Visualizer, VisualizerArgs } from './visualization/visualizer';

export class Manager {
    private _bars!: Visualizer<number>;

    private MAX_DELAY = 100;

    constructor() {
        this.initVisualizers();
        this.initButtons();
    }

    /* Function initializes visualizers */
    private initVisualizers(): void {
        const numberOfBars: number = 50;

        const args: VisualizerArgs = {
            numOfBars: numberOfBars,
            maxHeight: window.innerHeight * 0.5,
            maxWidth: (window.innerWidth * 0.2) / numberOfBars,
            parentID: '',
            baseID: '',
            classes: [],
        };

        args.parentID = 'barsVisualizer';
        args.baseID = 'bar';
        args.classes = ['bar-container'];

        this.initBarsVisualizer(args);
    }

    private initBarsVisualizer(args: VisualizerArgs): void {
        this._bars = new Bars<number>();

        this._bars.init(args);

        window.addEventListener('resize', () => {
            const numberOfBars: number = 50;

            this._bars.resize(
                window.innerHeight * 0.5,
                (window.innerWidth * 0.2) / numberOfBars,
            );
        });
    }

    private initButtons(): void {
        const args: ButtonArgs = {
            sorter: this.sorter.bind(this),
            compare: this.compare.bind(this),
            visualizer: this.visualizer.bind(this),
            delay: this.delay.bind(this),
        };

        new Buttons(args);
    }

    private sorter(): Sorter<number> {
        const select = document.querySelector(
            '#algorithmSelect select',
        ) as HTMLSelectElement;

        switch (select.value) {
            case 'insertion':
                return new Insertion<number>();
            case 'selection':
                return new Selection<number>();
            case 'merge':
                return new Merge<number>();
            case 'bubble':
                return new Bubble<number>();
            default:
                return new Insertion<number>();
        }
    }

    private compare(a: Item<number>, b: Item<number>): number {
        return a.value - b.value;
    }

    private visualizer(): Visualizer<number> {
        return this._bars;
    }

    private delay(): number {
        const slide = document.getElementById(
            'sortingSpeedSlider',
        ) as HTMLInputElement;
        const value = +slide.value;

        return this.MAX_DELAY - value;
    }
}
