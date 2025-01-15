import { swapElements } from './helpers';
import { AnimationStep, SortArgs, Sorter, SortReply } from './sorter';

export class Insertion<T> implements Sorter<T> {
    sort(args: SortArgs<T>): SortReply<T> {
        let copyOfItems = [...args.items];
        let steps: AnimationStep<T>[] = [];

        let j = 0;
        let key = 0;

        for (let i = 1; i < copyOfItems.length; i++) {
            steps.push({
                green: [copyOfItems[i]],
                red: [],
                swap: [],
            });

            if (copyOfItems[i] > copyOfItems[i - 1]) {
                continue;
            }

            key = i;
            j = i - 1;

            while (
                j >= 0 &&
                args.compare(copyOfItems[key], copyOfItems[j]) < 0
            ) {
                steps.push({
                    green: [copyOfItems[i]],
                    red: [copyOfItems[key], copyOfItems[j]],
                    swap: [copyOfItems[key], copyOfItems[j]],
                });

                swapElements(copyOfItems, key, j);

                key--;
                j--;
            }
        }

        return { items: copyOfItems, steps: steps };
    }
}
