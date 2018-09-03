import { Vector } from './vector';
import React from 'react';
export class Mover{
    p = new Vector(0, 0); // 坐标系位置
    v = new Vector(0, 0); // 速度
    a = new Vector(0, 0); // 加速度
    m; // 质量
    static g = 0.98; // 重力加速度
    constructor(m, x, y, vx, vy, ax, ay){
        this.p = new Vector(x,y); 
        this.v = new Vector(vx, vy);
        this.a = new Vector(ax,ay);
        this.m = m; 
    }

    // 展示 mover
    display(key){
        let style =  {
            left: this.p.x +'rem',
            top: this.p.y+'rem'
        }
        if(key === undefined || key===null){
            key = 'simple';
        }
        return (
            <div className="mover" key={`mover-${key}`} style={style}></div>
        )
    }

    // 受力
    applyForce(forces){
        // 自带重力
        let accuForce = new Vector(0, 0.98);
        // 多个受力
        if(Array.isArray(forces)){
            forces.forEach(force=>{
                accuForce.add( force );
            });
        }
        // 一个受力
        else if(forces!==undefined && forces!==null){
            accuForce.add(forces);
        }
        // 摩擦力
        // if(this.p.y >= 30){
        //     accuForce.add( this.applyFraction() );
        // }
        // 合力 改变 加速度
        this.a = accuForce.div(this.m);
        return this;
    }
    
    static applyForce(mover, forces){
        // 自带重力
        let accuForce = new Vector(0, Vector.g);
        // 多个受力
        if(Array.isArray(forces)){
            accuForce =  forces.reduce((accu, next)=>{
                return accu.add(next);
            })
        }
        // 一个受力
        else if(forces){
            return accuForce.add(forces);
        }

        if(mover.p.y >= 30){
            accuForce.add( mover.applyFraction() );
        }

        // 合力 改变 加速度
        mover.a = accuForce.div(mover.m);
        return mover;
    }

    // 移动
    move(){
        // 速度更新
        this.v.add(this.a);
        // 位置更新 ( 按照 100：1 )
        this.p.add(this.v);

        this.a = new Vector(0, 0);
        return this;
    }

    // 限速
    limitVelocity(limit){
        this.v.limit(limit);
        return this;
    }

    checkStop(){
        if(
            this.a.mag() <=0.05 &&
            this.v.mag() <=0.05 &&
            this.p.mag() <=0.05
        ){
            this.stop();
        };
        return this;
    }

    // 停止
    stop(){
        this.a = (0,0);
        this.v = (0,0);
        this.status = 'stop';
        return this;
    }

    // 边缘检测
    checkEdge(width, height){
        let { x, y } = this.p;
        if(x <= 0){
            // 改变方向 速度耗散20%
            this.v.x *= -.8;
            // 不超出边缘
            this.p.x = 0;
        }
        if(x>=width){
            // 改变方向 速度耗散20%
            this.v.x *= -.8;
            // 不超出边缘
            this.p.x = width;
        }
        if(y <= 0){
            // 改变方向  速度耗散20%
            this.v.y *= -.8;
            // 不超出边缘
            this.p.y = 0;
        }
        if(y >= height){
            // 改变方向 速度耗散20% 
            this.v.y *= -.8;
            // 不超出边缘
            this.p.y = height;
        }

        // if(
        //     Math.abs(this.v.x)<=0.005 && Math.abs(this.v.y)<=0.005 &&
        //     Math.abs(this.a.x)<=0.001 && Math.abs(this.a.y)<=0.001
        // ){
        //     this.stop();
        // }
        
        return this;
    }

    // 地板摩擦力
    applyFraction(){
        let u = 100.4; // 摩擦系数
        return new Vector(0, this.v.y * this.m * Vector.g * u * -1);
    }
    

    static moveAll(width, height, movers, forces){
        return movers.map((mover)=>{
            mover.applyForce(forces)
                .move()
                .limitVelocity(20)
                .checkEdge( width, height)
                .checkStop();
            return mover;
        });

    }
    
    static displayAll(movers) {
        return movers.map( (mover, index) => mover.display(index) );
    }
}