(function () {
  class DrawBobble {
    constructor() {
      this.balls = []; //定义一个小求数组

      this.digit = digit; //三维数组

      this.MARGIN_TOP = 80; //表示每一个数字距离上边距的距离

      this.MARGIN_LEFT = 100; //表示第一个数字距离左边距的距离

      this.ball = new Bobble(); //得到小球实例
    }

    //初始化画布，得到画布的一些参数，
    initCanvas() {
      this.canvas = document.getElementById('canvas');

      this.canvas_w = this.canvas.clientWidth; //得到画布的宽度

      this.canvas_h = this.canvas.clientHeight; //得到画布的高度

      this.cxt = this.canvas.getContext('2d'); //得到画笔
    }

    //倒计时结束的时间
    initEndTime(year, month, day, hour, mins, seconds) {
      return new Date(year, month, day, hour, mins, seconds);
    }

    //初始化函数，整个程序的入口
    init() {
      this.initCanvas();

      this.allSeconds = this.getAllSeconds(); //总的秒数

      setInterval(() => {
        this.render(); //渲染小球

        this.update(); //更新页面
      }, 1000 / 40)
    }

    //根据总秒数渲染时间
    render() {
      this.cxt.clearRect(0, 0, this.canvas_w, this.canvas_h); //清屏画布

      const hours = this.getHours(this.allSeconds);
      const mins = this.getMins(this.allSeconds);
      const seconds = this.getSeconds(this.allSeconds);

      this.renderDigit(this.MARGIN_LEFT, this.MARGIN_TOP, parseInt(hours / 10));

      this.renderDigit(this.MARGIN_LEFT + 15 * (this.ball.RADIUS + 1), this.MARGIN_TOP, parseInt(hours % 10)); //前面这两个代表着小时

      this.renderDigit(this.MARGIN_LEFT + 30 * (this.ball.RADIUS + 1), this.MARGIN_TOP, 10); //这是冒号

      this.renderDigit(this.MARGIN_LEFT + 39 * (this.ball.RADIUS + 1), this.MARGIN_TOP, parseInt(mins / 10));

      this.renderDigit(this.MARGIN_LEFT + 54 * (this.ball.RADIUS + 1), this.MARGIN_TOP, parseInt(mins % 10)); //这两个代表着分钟

      this.renderDigit(this.MARGIN_LEFT + 69 * (this.ball.RADIUS + 1), this.MARGIN_TOP, 10); //冒号

      this.renderDigit(this.MARGIN_LEFT + 78 * (this.ball.RADIUS + 1), this.MARGIN_TOP, parseInt(seconds / 10));

      this.renderDigit(this.MARGIN_LEFT + 93 * (this.ball.RADIUS + 1), this.MARGIN_TOP, parseInt(seconds % 10)); //代表着秒钟

      this.renderBalls();
    }

    //更新页面的方法
    update() {
      const nextTime = this.getAllSeconds(); //更新过的秒数
      const nextHours = this.getHours(nextTime); //更新的小时
      const nextMins = this.getMins(nextTime); //更新的分钟
      const nextSeconds = this.getSeconds(nextTime); //更新过后的秒数

      const curHours = this.getHours(this.allSeconds);
      const curMins = this.getMins(this.allSeconds);
      const curSeconds = this.getSeconds(this.allSeconds);

      if (nextSeconds != curSeconds) {
        //如果时间发生改变， 那么就要更新页面
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) { //这是对每一位数字是否变化进行判断
          this.addBalls(this.MARGIN_LEFT + 0, this.MARGIN_TOP, parseInt(curHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
          this.addBalls(this.MARGIN_LEFT + 15 * (this.ball.RADIUS + 1), this.MARGIN_TOP, parseInt(curHours / 10));
        }

        if (parseInt(curMins / 10) != parseInt(nextMins / 10)) {
          this.addBalls(this.MARGIN_LEFT + 39 * (this.ball.RADIUS + 1), this.MARGIN_TOP, parseInt(curMins / 10));
        }
        if (parseInt(curMins % 10) != parseInt(nextMins % 10)) {
          this.addBalls(this.MARGIN_LEFT + 54 * (this.ball.RADIUS + 1), this.MARGIN_TOP, parseInt(curMins % 10));
        }

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
          this.addBalls(this.MARGIN_LEFT + 78 * (this.ball.RADIUS + 1), this.MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
          this.addBalls(this.MARGIN_LEFT + 93 * (this.ball.RADIUS + 1), this.MARGIN_TOP, parseInt(nextSeconds % 10));
        }

        this.allSeconds = nextTime;
      }

      this.updateBalls();
    }

    //更新小球运动的方法
    updateBalls() {
      for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].x += this.balls[i].vx;
        this.balls[i].y += this.balls[i].vy;
        this.balls[i].vy += this.balls[i].g;
        if (this.balls[i].y >= this.canvas_h - this.ball.RADIUS) { //如果小球运动到了画布的底端
          this.balls[i].y = this.canvas_h - this.ball.RADIUS;
          this.balls[i].vy = -this.balls[i].vy * 0.75; //进行反弹运动
        }
      }

      let cnt = 0
      for (let i = 0; i < this.balls.length; i++)
        if (this.balls[i].x + this.ball.RADIUS > 0 && this.balls[i].x - this.ball.RADIUS < this.canvas_w)
          this.balls[cnt++] = this.balls[i]

      while (this.balls.length > cnt) {
        this.balls.pop();
      }
    }

    //添加小球的方法
    addBalls(x, y, num) {
      for (let i = 0; i < this.digit[num].length; i++) {
        for (let j = 0; j < this.digit[num][i].length; j++) {
          if (this.digit[num][i][j] == 1) { //如果这个位置有小球，那么就添加一个彩色小球
            const aBall = new Bobble(x, y, i, j); //new出一个对象
            this.balls.push(aBall); //把产生的小球放进小球数组中
          }
        }
      }
    }

    //绘制具体数字的方法
    renderDigit(x, y, num) {
      this.cxt.fillStyle = "rgb(0, 102, 153)"; //给画笔设置一种颜色
      const RADIUS = this.ball.RADIUS;
      for (let i = 0; i < this.digit[num].length; i++) {
        for (let j = 0; j < this.digit[num][i].length; j++) {
          if (this.digit[num][i][j] == 1) { //如果点阵中的数字为1的话，那么就绘制实心圆
            this.cxt.beginPath(); //开始绘制
            this.cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI) //绘制圆
            this.cxt.closePath(); //结束绘制
            this.cxt.fill(); //实心绘制
          }
        }
      }
    }

    //绘制小球的方法
    renderBalls() {
      //小球的绘制
      for (let i = 0; i < this.balls.length; i++) {
        this.cxt.fillStyle = this.balls[i].color;
        this.cxt.beginPath();
        this.cxt.arc(this.balls[i].x, this.balls[i].y, this.ball.RADIUS, 0, 2 * Math.PI, true);
        this.cxt.closePath();
        this.cxt.fill();
      }
    }

    //根据总秒数得到小时数
    getHours(time) {
      return parseInt(time / 3600); //得到总的小时数
    }

    //根据总秒数得到分钟数
    getMins(time) {
      const hours = this.getHours(time);
      return parseInt((time - (hours * 3600)) / 60); //得到总的分钟数
    }

    //根据总秒数得到秒数
    getSeconds(time) {
      return parseInt(time % 60); //得到总的秒数
    }

    //得到从开始到结束的总秒数
    getAllSeconds() {
      const startTime = new Date().getTime(); //得到开始的时间

      const endTime = this.initEndTime(2020, 5, 28, 9, 30, 45).getTime(); //2020-6-28

      const all = Math.round((endTime - startTime) / 1000); //把毫秒数转为秒数

      return all > 0 ? all : 0; //如果时间为正，就返回all, 为负就返回0
    }

  }

  const drawBobble = new DrawBobble();

  drawBobble.init();
})()