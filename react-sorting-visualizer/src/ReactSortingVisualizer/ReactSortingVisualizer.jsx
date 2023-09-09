import React from 'react'
import './ReactSortingVisualizer.css'
import { insertionSort } from './SortingAlgorithms/InsertionSort'
import { selectionSort } from './SortingAlgorithms/selectionSort'
import { bubbleSort } from './SortingAlgorithms/bubbleSort'
import { mergeSort } from './SortingAlgorithms/mergeSort'

// Min and Max values for random generator
const MIN_NUMBER = 1
const MAX_NUMBER = 930

// Min and Max values for range input label
const MIN_COUNT = 10
const MAX_COUNT = 100

// Scaling value for bars, should be less than one 
const SCALING_FACTOR = 0.7

// Color values for bars
const ACTIVE_COLOR = 'red'
const PASIVE_COLOR = 'cyan'
const ADDITIONAL_COLOR = 'green'

// Delay time
const DELAY = 20

class ReactSortingVisualizer extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            count: MAX_COUNT,
            maxBarHeight: 100,
            numbers: this.generateRandomNumbers(MAX_COUNT)
        }

        this.isSorting = false
        this.scaling = 0
    }

    componentDidMount(){
        
        // Calculating possible maximum height for bars immediatelly after a component is mounted 
        const height = window.innerHeight
        const maxHeight = height * SCALING_FACTOR
        this.setState({ maxBarHeight: maxHeight })
    }

    render() {

        const { count, maxBarHeight, numbers } = this.state
        const scaling = maxBarHeight / Math.max(...numbers)
        this.scaling = scaling

        return (
           <div className='react-sotring-visualizer-cotainer'>

                <div className='sorting-options-cotainer'>
                    
                    <input type='range' min={MIN_COUNT} max={MAX_COUNT} value={count} onChange={this.handleCountChange}></input>

                    <button onClick={this.selectionSortHandler}>Selection Sort</button>
                    <button onClick={this.insertionSortHandler}>Insertion Sort</button>
                    <button onClick={this.bubbleSortHandler}>Bubble Sort</button>
                    <button onClick={this.mergeSortHandler}>Merge Sort</button>

                </div>

                <div className='random-numbers'>
                    { numbers.map((number, index) =>
                        <p key={index} className='bar' style={{ height: `${number * scaling}px`}}></p>
                    )}
                </div>

            </div> 
        );
    }

    // Function changes color of bars
    changeBarColors = (currentVisual, bars, color1, color2, color3) => {
        if(currentVisual[2] === -3) return
        if(currentVisual[0] !== -1 && currentVisual[0] !== -2) bars[currentVisual[0]].style.backgroundColor = color1
        if(currentVisual[1] !== -1 && currentVisual[1] !== -2) bars[currentVisual[1]].style.backgroundColor = color2
        if(currentVisual[2] !== -1 && currentVisual[2] !== -2) bars[currentVisual[2]].style.backgroundColor = color3  
    }

    // Function swaps heights of bars
    swapBarHeights = (currentVisual, bars) => {

        const tmp = bars[currentVisual[0]].style.height
        bars[currentVisual[0]].style.height = bars[currentVisual[1]].style.height
        bars[currentVisual[1]].style.height = tmp
    }

    // Function assigns new value to bars
    assignNewHeight = (currentVisual, bars) => {
        bars[currentVisual[0]].style.height = (currentVisual[1] * this.scaling) + "px" 
    }

    // Function contains specific logic for insertion sort
    insertionCostumLogic = (visualizer, currentVisual, bars, i) => {

        // Determine color of third bar
        let thirdColor = PASIVE_COLOR
        if(i !== visualizer.length - 1 && visualizer[i][2] === visualizer[i + 1][2]) thirdColor = ADDITIONAL_COLOR
        this.changeBarColors(currentVisual, bars, PASIVE_COLOR, PASIVE_COLOR, thirdColor)

        // Swap heights when it's necessary
        if(currentVisual[0] !== -1) this.swapBarHeights(currentVisual, bars)
    }

    // Function contains specific logic for selection sort
    selectionCostumLogic = (visualizer, currentVisual, bars, i) => {

        // 'Turn off' previous green bar
        if(currentVisual[2] >= 0) currentVisual[2]--;
        this.changeBarColors(currentVisual, bars, PASIVE_COLOR, PASIVE_COLOR, PASIVE_COLOR)

        // Swap heights if it's necesarry on current step 
        if(currentVisual[2] === -2) this.swapBarHeights(currentVisual, bars)

        // 'Turn off' last green bar on last step
        if(i === visualizer.length - 1) {
            currentVisual[2] ++
            this.changeBarColors(currentVisual, bars, PASIVE_COLOR, PASIVE_COLOR, PASIVE_COLOR)
        }
    }

    // Function contains specific logic for bubbble sort
    bubbleCostumLogic = (visualizer, currentVisual, bars, i) => {

        this.changeBarColors(currentVisual, bars, PASIVE_COLOR, PASIVE_COLOR, PASIVE_COLOR)
        if(currentVisual[2] === -2) this.swapBarHeights(currentVisual, bars)
    }

    // Function contains specific logic for merge sort
    mergeCustomLogic = (visualizer, currentVisual, bars, i) => {
    
        this.changeBarColors(currentVisual, bars, PASIVE_COLOR, PASIVE_COLOR, PASIVE_COLOR)
        if(currentVisual[2] === -3) this.assignNewHeight(currentVisual, bars)
    }

    sortingAnimationLogic = (visualizer, costumLogic) => {

        // Iterate visualizer array
        for(let i = 0; i < visualizer.length; i++){

            const bars = document.getElementsByClassName('bar')
            const currentVisual = visualizer[i]

            // I don't know why but that code works only that way, when i removed duplicates from visualizer and used 2 setTimeout there was no more red bars xD
            if(i % 2 === 0) setTimeout(() => {this.changeBarColors(currentVisual, bars, ACTIVE_COLOR, ACTIVE_COLOR, ADDITIONAL_COLOR)}, i * DELAY)
                
            else{
                setTimeout(() => {
                    costumLogic(visualizer, currentVisual, bars, i)
                    if(i === visualizer.length - 1) this.isSorting = false   
                }, i * DELAY);
                                 
            }
        }
    }

    // Simple helper function, just for decomposition :)
    sortingFunctionsHandler = (sortingFunction, animationCostumLogic) => {

        if(this.isSorting) return

        this.isSorting = true;
        const { numbers } = this.state
        const visualizer = sortingFunction(numbers)

        this.sortingAnimationLogic(visualizer, animationCostumLogic)
    }

    mergeSortHandler = () => {
        this.sortingFunctionsHandler(mergeSort, this.mergeCustomLogic)
    }

    // Function handles bubble sort button
    bubbleSortHandler = () => {
        this.sortingFunctionsHandler(bubbleSort, this.bubbleCostumLogic)
    }

    // Function handles insertion sort button
    insertionSortHandler = () => {
        this.sortingFunctionsHandler(insertionSort, this.insertionCostumLogic)
    }

    // Function handles selection sort button
    selectionSortHandler = () => {
        this.sortingFunctionsHandler(selectionSort, this.selectionCostumLogic)
    }

    // Tester
    checkArrays = (array, sorted) => {

        const correct = [...array].sort((a, b) => a - b)
        if(correct.length !== sorted.length) {
            console.log('False')
            return
        }

        for(let i =  0; i < correct.length; i++){
            if(correct[i] !== sorted[i]){
                console.log('False')
                return
            }
        }

        console.log('True')
    }


    // Function handles slidebar
    handleCountChange = (event) => {
        
        if(this.isSorting) return

        // Getting value from range input label
        const newCount = parseInt(event.target.value, 10)

        // Generate new random array and update state
        this.setState({
            count: newCount, 
            numbers: this.generateRandomNumbers(newCount)
        })
    }
    
    // Using random number generator from 'https://www.geeksforgeeks.org/how-to-generate-random-number-in-react-js/' 
    generateRandomNumber(){
        return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
    }

    // Function returns array of random numbers
    generateRandomNumbers(count){
        return Array.from({ length: count }, () => this.generateRandomNumber())
    }

    
}


export default ReactSortingVisualizer;