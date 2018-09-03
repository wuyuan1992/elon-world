import { Vector } from '../factory/vector';
import { Mover } from '../factory/mover';

// 随机整数
export function random(limit){
    return Math.floor(Math.random()*(limit+1));
}

// 随机小数
export function randomDigit(limit){
    return Math.random()*(limit)*( Math.random()>.5?1:-1 );
}

export function createVectors(count, xLimit, yLimit){
    let vectors = [];
    for(let i=0; i<count; i++){
        vectors.push( new Vector( randomDigit(xLimit) , randomDigit(yLimit) ) )
    }
    return vectors;
}

export function createMovers(count){
    let movers = [];
    for(let i=0; i<count; i++){
        movers.push(new Mover(
            // 质量
            10,
            // 初始位置
            random(30) , random(20),
            // 初始速度
            0,0,
            // 初始加速度
            0, 0
            )
        )
    }
    return movers;
}
  