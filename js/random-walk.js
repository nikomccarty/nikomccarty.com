var width = 600,
    height = 600,
    step_size = 10;

var svg = d3.select("#random-walk")
            .append("svg")
            .style("width", width)
            .attr("height", height);

// const chartTitle = g =>
// g
//     .append("text")
//     .attr("font-family", "sans-serif")
//     .attr("font-size", 15)
//     .attr("x", width - 130)
//     .attr("y", height - 20)
//     .html("A Random Walker")

// const title = svg.append("g").call(chartTitle);

function get_sign() {
    return Math.random() > .5 ? 1 : -1;
}

function take_step(position) {
    var step = step_size * get_sign();
    if (Math.random() > .5)
        return {"x" : position.x + step, "y" : position.y};
    return {"x" : position.x, "y" : position.y + step};
}

function add_line(position, next_position, colour) {
    svg.append("line")
        .attr("x1", position.x)
        .attr("y1", position.y)
        .attr("x2", next_position.x)
        .attr("y2", next_position.y)
        .attr("stroke", colour)
        .attr("stroke-width", 4);
}

var pos = {"x" : width/2, "y" : height/2};
var next_pos;
var counter = 0;

d3.timer(function() {
    next_pos = take_step(pos);
    add_line(pos, next_pos, d3.hsl((counter = (counter + 1) % 1000), 1, .5));
    pos = next_pos;
})

document.getElementById("random-walk").setAttribute("align", "center");
