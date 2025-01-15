import { swapElements } from './helpers';
import { AnimationStep, SortArgs, Sorter, SortReply } from './sorter';

export class Bubble<T> implements Sorter<T> {
    sort(args: SortArgs<T>): SortReply<T> {
        let copyOfItems = [...args.items];
        let steps: AnimationStep<T>[] = [];

        let isSwapped = false;

        for (let i = 0; i < copyOfItems.length; i++) {
            for (let j = 0; j < copyOfItems.length - i - 1; j++) {
                steps.push({
                    green: [],
                    red: [copyOfItems[j], copyOfItems[j + 1]],
                    swap: [],
                });

                if (args.compare(copyOfItems[j], copyOfItems[j + 1]) > 0) {
                    steps.push({
                        green: [],
                        red: [copyOfItems[j], copyOfItems[j + 1]],
                        swap: [copyOfItems[j], copyOfItems[j + 1]],
                    });

                    swapElements(copyOfItems, j, j + 1);
                    isSwapped = true;
                }
            }

            if (!isSwapped) break;
        }

        return { items: copyOfItems, steps: steps };
    }
}
