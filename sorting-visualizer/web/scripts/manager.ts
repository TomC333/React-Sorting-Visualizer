import { Bars } from './visualization/bars';
import { Visualizer, VisualizerArgs } from './visualization/visualizer';

export class Manager {
    private _bars!: Visualizer<number>;

    constructor() {
        this.initVisualizers();
    }

    /* Function initializes visualizers
     * For future new visualizers can be added
     */
    private initVisualizers() {
        const args: VisualizerArgs = {
            numOfBars: 30,
            maxHeight: 100,
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

    private initBarsVisualizer(args: VisualizerArgs) {
        this._bars = new Bars<number>();

        this._bars.init(args);
    }
}
