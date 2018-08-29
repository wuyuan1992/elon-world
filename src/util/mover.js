import { Vector } from './vector';
export class Mover{
    p = new Vector(0, 0); // 坐标系位置
    v = new Vector(0, 0); // 速度
    a = new Vector(0, 0); // 加速度
    m; // 质量
    constructor(m, x, y, vx, vy, ax, ay){
        this.p = new Vector(x,y); 
        this.v = new Vector(vx, vy);
        this.a = new Vector(ax,ay);
        this.m = m;
    }

    move(){
        this.v.add(this.a);
        this.p.add(this.v);
    }
}