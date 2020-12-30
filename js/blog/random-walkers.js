async function d3RandomWalk() {
  const width = 400;
  const height = 400;
  const step_length = 5;

  var svg = d3.select("#random-walk")
              .append("svg")
              .attr("viewBox", [0, 0, width, height])

  function direction() {
      return Math.random() > .5 ? 1 : -1;
  }
  console.log(Math.random())

  function take_step(position) {
      var step = step_length * direction();
      if (Math.random() > 0.5)
          return {"x" : position.x + step, "y" : position.y};
      return {"x" : position.x, "y" : position.y + step};
  }

  function add_line(position, next_position) {
      svg.append("line")
          .attr("x1", position.x)
          .attr("y1", position.y)
          .attr("x2", next_position.x)
          .attr("y2", next_position.y)
          .attr("stroke", "black")
          .attr("stroke-width", 2);
  }

  let pos = {"x" : width/2, "y" : height/2};
  let next_pos;
  let counter = 0;

  var timePassed = d3.timer(function(elapsed) {
      next_pos = take_step(pos);
      add_line(pos, next_pos);
      pos = next_pos;
      if (elapsed > 30000) timePassed.stop();
  })
}

d3RandomWalk();


async function p5RandomWalk() {
  let sketch = function(p) {
    let x;
    let y;
    let x_next;
    let y_next;
    
    p.setup = function(){
      p.createCanvas(400, 400);
      p.background(255);
      x = p.width / 2;
      y = p.height / 2;
    }
    p.draw = function(){
      const step = p.floor(p.random(4));
      switch (step) {
        case 0:
          x_next = x + 5;
          y_next = y;
          break;
        case 1:
          x_next = x - 5;
          y_next = y;
          break;
        case 2:
          y_next = y + 5;
          x_next = x;
          break;
        case 3:
          y_next = y - 5;
          x_next = x;
          break;
      }
      p.stroke(0);
      p.strokeWeight(3);
      p.line(x, y, x_next, y_next);
      x = x_next;
      y = y_next;
        }
  };
  new p5(sketch, 'p5-canvas');
}

p5RandomWalk()