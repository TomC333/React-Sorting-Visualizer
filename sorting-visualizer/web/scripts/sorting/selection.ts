import { swapElements } from './helpers';
import { SortArgs, Sorter, SortReply } from './sorter';

export class Selection<T> implements Sorter<T> {
    sort(args: SortArgs<T>): SortReply<T> {
        let copyOfItems = [...args.items];

        let minIndex = 0;

        const findMinIndex = (start: number): number => {
            for (let i = start + 1; i < copyOfItems.length; i++) {
                if (args.compare(copyOfItems[i], copyOfItems[start]) < 0)
                    start = i;
            }

            return start;
        };

        for (let i = 0; i < copyOfItems.length - 1; i++) {
            minIndex = findMinIndex(i);
            swapElements(copyOfItems, i, minIndex);
        }

        return { items: copyOfItems, steps: [] };
    }
}
