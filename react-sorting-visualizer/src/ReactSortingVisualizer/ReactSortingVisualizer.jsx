import React, {Component} from 'react'
import './ReactSortingVisualizer.css'

const MIN_NUMBER = 1
const MAX_NUMBER = 1000
const MIN_COUNT = 10
const MAX_COUNT = 200

class ReactSortingVisualizer extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            count: MAX_COUNT,
            numbers: this.generateRandomNumbers(MAX_COUNT)
        }
    }

    render() {

        const { count, numbers } = this.state

        return (
           <div className='react-sotring-visualizer-cotainer'>

                <div className='sorting-options-cotainer'>
                    <input type='range' min={MIN_COUNT} max={MAX_COUNT} value={count} onChange={this.handleCountChange}></input>
                </div>

                <div className='random-numbers'>
                    { numbers.map((number, index) =>
                        <p key={index}>{number}</p>
                    )}
                </div>
            </div> 
        );
    }

    handleCountChange = (event) => {

        const newCount = parseInt(event.target.value, 10)

        this.setState({
            count: newCount, 
            numbers: this.generateRandomNumbers(newCount),
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