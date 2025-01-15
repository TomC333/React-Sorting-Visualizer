import { Item, SortArgs, Sorter } from './sorting/sorter';
import { Visualizer } from './visualization/visualizer';

export class Buttons {
    private _shuffleButton!: HTMLDivElement;
    private _sortButton!: HTMLDivElement;
    private _endButton!: HTMLDivElement;

    private _shuffleAction!: () => void;
    private _sortAction!: () => void;
    private _endAction!: () => void;

    constructor(args: ButtonArgs) {
        this.selectElements();
        this.initActions(args);
        this.addInitialActions();
    }

    private selectElements(): void {
        this._shuffleButton = document.getElementById(
            'shuffleButton',
        ) as HTMLDivElement;

        this._sortButton = document.getElementById(
            'sortButton',
        ) as HTMLDivElement;

        this._endButton = document.getElementById(
            'endButton',
        ) as HTMLDivElement;
    }

    private initActions(args: ButtonArgs): void {bu
        this._shuffleAction = () => {
            args.visualizer().randomize();
        };

        this._sortAction = () => {
            this.removeActions();

            const items = args.visualizer().items();
            const sorter = args.sorter();
            const sortArgs: SortArgs<number> = {
                items: items,
                compare: args.compare,
                storeSteps: true,
                stepsFrequency: 1,
            };
            const sortReply = sorter.sort(sortArgs);

            this._endButton.classList.remove('disabled');
            this._endButton.addEventListener('click', this._endAction);

            args.visualizer().sort(
                sortReply.items,
                sortReply.steps,
                args.delay,
            );
        };

        this._endAction = () => {
            this.addActions();

            this._endButton.classList.add('disabled');
            this._endButton.removeEventListener('click', this._endAction);

            args.visualizer().end();
        };
    }

    private addInitialActions(): void {
        this.addActions();

        this._endButton.classList.add('disabled');
        this._endButton.removeEventListener('click', this._endAction);
    }

    private addActions(): void {
        this._shuffleButton.addEventListener('click', this._shuffleAction);
        this._sortButton.addEventListener('click', this._sortAction);
        this._endButton.addEventListener('click', this._endAction);

        this._sortButton.classList.remove('disabled');
        this._shuffleButton.classList.remove('disabled');
        this._endButton.classList.remove('disabled');
    }

    private removeActions(): void {
        this._shuffleButton.removeEventListener('click', this._shuffleAction);
        this._sortButton.removeEventListener('click', this._sortAction);
        this._endButton.removeEventListener('click', this._endAction);

        this._sortButton.classList.add('disabled');
        this._shuffleButton.classList.add('disabled');
        this._endButton.classList.add('disabled');
    }
}

export type ButtonArgs = {
    sorter: () => Sorter<number>;
    compare: (a: Item<number>, b: Item<number>) => number;
    visualizer: () => Visualizer<number>;
    delay: () => number;
};
