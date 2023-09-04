export const insertionSort = (array) => {
    
    const visualizer = []

    let j = 0
    let key = 0

    for(let i = 1; i < array.length; i++){
        
        if(array[i] > array[i - 1]) {
            
            addNewVisual(visualizer, -1, -1, i)
            continue  
        }

        key = i
        j = i - 1
        
        while(j >= 0 && array[key] < array[j]){
            
            swapNumbers(array, key, j)
            addNewVisual(visualizer, key, j, i)

            key--
            j-- 
        }
    }

    return {
        visualizer: visualizer,
        sorted: array
    }

}

function addNewVisual(visualizer, a, b, c){

    const newVisual = [a, b, c]
    visualizer.push(newVisual)
    visualizer.push(newVisual)
}

function swapNumbers(array, i, j) {

    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
}