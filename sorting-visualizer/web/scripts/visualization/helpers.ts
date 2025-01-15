import { AnimationStep } from '../sorting/sorter';

export function addAnimation<T>(step: AnimationStep<T>): void {
    step.green.forEach((x) => {
        document.getElementById(x.id)?.classList.add('green');
    });

    step.red.forEach((x) => {
        document.getElementById(x.id)?.classList.add('red');
    });
}

export function clearAnimation<T>(step: AnimationStep<T>): void {
    step.green.forEach((x) => {
        document.getElementById(x.id)?.classList.remove('green');
    });

    step.red.forEach((x) => {
        document.getElementById(x.id)?.classList.remove('red');
    });
}

export function swapHTMLElements<T>(
    container: HTMLDivElement,
    step: AnimationStep<T>,
): void {
    if (step.swap.length != 2) {
        return;
    }

    const div1 = document.getElementById(step.swap[0].id)!;
    const div2 = document.getElementById(step.swap[1].id)!;

    if (step.isSet) {
        const nThElement =
            container.querySelectorAll('div')[<number>step.swap[0].value];
        container.insertBefore(div2, nThElement);
        return;
    }

    const nextSibling1 = div1.nextElementSibling;
    const nextSibling2 = div2.nextElementSibling;

    container.insertBefore(div1, nextSibling2);
    container.insertBefore(div2, nextSibling1);
}
