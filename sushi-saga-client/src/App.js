import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  
  constructor(){
    super()
    this.state={
      allSushi: [],
      currentSushi: [],
      index: 0,
      eaten: true,
      eatenSushi: [],
      money: 100
    }
  }

  componentDidMount(){
    fetch(API)
        .then(response => response.json())
        .then(sushiData => {
          let firstFour = sushiData.slice(this.state.index, this.state.index + 4)
            this.setState({
              allSushi: sushiData,
              currentSushi: firstFour
            })
        });
  }

  moreSushi = () =>{
    let newIndex = this.state.index + 4
    this.setState({
      index: newIndex,
      currentSushi: this.state.allSushi.slice(newIndex, newIndex +4)
    })
  }

  eatSushi =(sushiObj)=>{
    ///
    
    // let copyEatenSushi = [...this.state.eatenSushi]
    // copyEatenSushi.push(sushiObj)
  if(this.state.eatenSushi.includes(sushiObj)){
    alert("you ate this already")
  }
  else if (this.state.money - sushiObj.price < 0){
    alert("youre brokeeeeeee. go get u some money")
  } else {
      this.setState({
          money: this.state.money - sushiObj.price,
          eatenSushi: [...this.state.eatenSushi, sushiObj]}
      )
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer 
        eatSushi={this.eatSushi}
        currentSushi={this.state.currentSushi} 
        moreSushi={this.moreSushi}
        orderedSushi={this.state.eatenSushi}
        />
        <Table
        orderedSushi={this.state.eatenSushi}
        money={this.state.money}
         />
      </div>
    );
  }
}

export default App;