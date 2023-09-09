export function addNewVisual(visualizer, a, b, c){

    const newVisual = [a, b, c]
    visualizer.push(newVisual)
    visualizer.push(newVisual)
}


// Function swaps 2 elements on i'th and j'th index in recieved array, 
export function swapNumbers(array, i, j) {

    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
}