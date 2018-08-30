export class Vector{
    m;
    x;
    y;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    // 加
    add(vector){
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    static add(vector1, vector2){
        return new Vector(vector1.x+vector2.x, vector1.y+vector2.y);
    }
    // 减
    sub(vector){
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    static sub(vector1, vector2){
        return new Vector(vector2.x-vector1.x, vector2.y-vector1.y);
    }
    // 乘
    mult(times){
        this.x *= times;
        this.y *= times;
        return this;
    }

    static mult(vector, times){
        return new Vector(vector.x*times, vector.y*times);
    }
    // 除
    div(times){
        this.x /= times;
        this.y /= times;
        return this;
    }

    static div(vector, times){
        return new Vector(vector.x/times, vector.y/times);
    }

    // 长度
    mag(){
        return Math.sqrt( Math.pow(this.x, 2) +  Math.pow(this.y, 2) );
    }
    static mag(vector){
        return Math.sqrt( Math.pow(vector.x, 2) +  Math.pow(vector.y, 2) );
    }
    // 单位向量
    normallize(){
        this.div( this.mag() );
        return this;
    }
    static normallize(vector){
        return vector.div( vector.mag() );
    }
    // 修改向量长度
    setMag(mag){
        this.normallize().mult(mag);
    }
    // 设定向量长度上线
    limit(limit){
        let mag = this.mag();
        if(mag >= limit){
            this.setMag(limit);
        }
    }

}