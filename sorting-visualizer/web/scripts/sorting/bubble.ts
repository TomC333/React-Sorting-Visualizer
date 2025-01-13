import { swapNumbers } from './helpers';
import { SortArgs, Sorter, SortReply } from './sorter';

export class Bubble<T> implements Sorter<T> {
    sort(args: SortArgs<T>): SortReply<T> {
        let copyOfItems = [...args.items];

        let isSwapped = false;

        for (let i = 0; i < copyOfItems.length; i++) {
            for (let j = 0; j < copyOfItems.length - i - 1; j++) {
                if (args.compare(copyOfItems[j], copyOfItems[j + 1]) > 0) {
                    swapNumbers(copyOfItems, j, j + 1);
                    isSwapped = true;
                }
            }

            if (!isSwapped) break;
        }

        return { items: copyOfItems, steps: [] };
    }
}
