import React, { Component } from 'react';
import './App.css';
import { Mover } from './util/mover';

class World extends Component {
  constructor(){
    super();
    this.state = {
      width: 30,
      height: 30,
      mover : new Mover(
        // 质量
        10,
        // 初始位置
        15,0,
        // 初始速度
        0,0,
        // 初始加速度
        0, 0.28
      )
    }
  }

  componentDidMount(){
    setInterval(()=>{
      this.updateMover();
    }, 10)
  }

  
  // 更新 mover
  updateMover(){
    let mover = this.state.mover;
    mover.move();
    this.checkEdge(mover);

    this.setState({ mover });
  }

  // 边缘检测
  checkEdge(mover){

    // 改变方向
    if(mover.p.x <=0 || mover.p.x>=this.state.width){
      mover.v.x *= -1;
      
      // 保持位置
      mover.p.x = Math.min(mover.p.x, this.state.width);
      mover.p.x = Math.max(mover.p.x, 0);
    }
    if(mover.p.y <=0 || mover.p.y>=this.state.height){
      mover.v.y *= -1;

      // 保持位置
      mover.p.y = Math.min(mover.p.y, this.state.height);
      mover.p.y = Math.max(mover.p.y, 0);
    }
  }


  // 重置 mover 的位置
  calcStyle() {
    let position = this.state.mover.p;
    return {
      left: position.x +'rem',
      top: position.y+'rem'
    }
  }


  render() {

    return (
      <div className="App">
        <div className="dot" style={ this.calcStyle() }></div>
      </div>
    );
  }
}

export default World;
