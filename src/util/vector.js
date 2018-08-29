export class Vector{
    m;
    x;
    y;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(v2){
        this.x += v2.x;
        this.y += v2.y;
    }
    static add(v1, v2){
        return new Vector(v1.x+v2.x, v1.y+v2.y);
    }

    sub(v2){
        this.x -= v2.x;
        this.y -= v2.y;
    }
    static sub(v1, v2){
        return new Vector(v1.x-v2.x, v1.y-v2.y);
    }

    mult(times){
        this.x *= times;
        this.y *= times;
    }
    static mult(v1, times){
        return new Vector(v1.x*times, v1.y*times);
    }

}