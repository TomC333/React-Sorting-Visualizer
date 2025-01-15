import { swapElements } from './helpers';
import { AnimationStep, SortArgs, Sorter, SortReply } from './sorter';

export class Selection<T> implements Sorter<T> {
    sort(args: SortArgs<T>): SortReply<T> {
        let copyOfItems = [...args.items];
        let steps: AnimationStep<T>[] = [];

        let minIndex = 0;

        const findMinIndex = (start: number): number => {
            const initialStart = start;

            for (let i = start + 1; i < copyOfItems.length; i++) {
                if (args.compare(copyOfItems[i], copyOfItems[start]) < 0) {
                    steps.push({
                        green: [copyOfItems[initialStart]],
                        red: [copyOfItems[i], copyOfItems[start]],
                        swap: [],
                    });

                    start = i;
                }

                steps.push({
                    green: [copyOfItems[initialStart], copyOfItems[start]],
                    red: [copyOfItems[i]],
                    swap: [],
                });
            }

            return start;
        };

        for (let i = 0; i < copyOfItems.length - 1; i++) {
            minIndex = findMinIndex(i);
            swapElements(copyOfItems, i, minIndex);

            steps.push({
                green: [copyOfItems[i]],
                red: [copyOfItems[i], copyOfItems[minIndex]],
                swap: [copyOfItems[i], copyOfItems[minIndex]],
            });
        }

        return { items: copyOfItems, steps: steps };
    }
}
