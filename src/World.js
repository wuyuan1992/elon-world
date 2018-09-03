import React, { Component } from 'react';
import { createMovers, createVectors } from './util/createMover';
import { Mover } from './factory/mover';
import './world.css';

class World extends Component {
  constructor(){
    super();

    this.worldUpdateTimer;

    this.state = {
      width: 30, height: 30,
      movers : createMovers(15),
      forces : createVectors(1, .4, 0),
      // liquid : new Liquid(p, height)
    }
  }

  componentWillMount(){
    this.clearTimer();
    this.updateWorld(60);
  }

  componentWillUnmount(){
    this.clearTimer();
  }

  clearTimer(){
    clearInterval(this.worldUpdateTimer);
    this.worldUpdateTimer = null;
  }
  
  // 更新 world
  updateWorld(frame){
    let {width, height, movers, forces} = this.state;

    this.worldUpdateTimer = setInterval(()=>{

      this.setState({
        movers : Mover.moveAll( width, height, movers, forces),
        // 其他内容
      });

    }, 1000/frame);
  }

  // 绘制 world
  paintWorld(){
    return (
      <div className="wrapper">
        { Mover.displayAll(this.state.movers) }
        {/* 其他内容 */}

      </div>
    )
    
  }

  render() {
    return (
      <div className="world">
        {/* 绘制 */}
        { this.paintWorld() }
      </div>
    );
  }
}

export default World;
