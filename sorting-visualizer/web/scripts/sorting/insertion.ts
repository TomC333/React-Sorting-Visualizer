import { swapNumbers } from './helpers';
import { SortArgs, Sorter, SortReply } from './sorter';

export class Insertion<T> implements Sorter<T> {
    sort(args: SortArgs<T>): SortReply<T> {
        let copyOfItems = [...args.items];
        let j = 0;
        let key = 0;

        // Just insertion sort xD
        for (let i = 1; i < copyOfItems.length; i++) {
            key = i;
            j = i - 1;

            while (
                j >= 0 &&
                args.compare(copyOfItems[key], copyOfItems[j]) < 0
            ) {
                swapNumbers(copyOfItems, key, j);

                key--;
                j--;
            }
        }

        return { items: copyOfItems, steps: [] };
    }
}
