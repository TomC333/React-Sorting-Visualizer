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

    constructor() {
        this.initVisualizers();
        this.initButtons();
    }

    /* Function initializes visualizers */
    private initVisualizers(): void {
        const args: VisualizerArgs = {
            numOfBars: 50,
            maxHeight: window.innerHeight * 0.5,
            maxWidth: 5,
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
        const select = document.getElementById(
            'algorithmSelect',
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
        return 0;
    }
}
