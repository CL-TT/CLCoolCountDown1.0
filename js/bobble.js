/*
 * @Author: CL 
 * @Date: 2020-06-24 18:54:57 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-06-26 16:25:20
 * 小球对象 
 */

class Bobble {
  constructor(x, y, i, j) {
    this.RADIUS = 8; //定义小球的半径
    this.colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000", "#e11e89", "#ff5959", "#0bff48"];
    this.x = x + j * 2 * (this.RADIUS + 1) + (this.RADIUS + 1); //横坐标
    this.y = y + i * 2 * (this.RADIUS + 1) + (this.RADIUS + 1); //纵坐标
    this.g = 1.5 + Math.random(); //重力加速度
    this.vx = Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4; //横向的加速度
    this.vy = -5; //纵向的加速度
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]; //小球的随机颜色
  }
}