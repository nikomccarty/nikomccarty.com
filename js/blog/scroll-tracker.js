async function drawLines() {

  var n = 200,
	duration = 395,
	now = new Date(Date.now() - duration),
	count = 0,
	data = d3.range(n).map(function () {
		return 0;
	});

  var margin = { top: 20, right: 20, bottom: 20, left: 40 };

  var width = 300;
  var height = 300;

  var svg = d3
  	.select("#scroll-tracker")
  	.append("svg")
  	.attr("preserveAspectRatio", "xMinYMin meet")
  	.attr("viewBox", [0, 0, width, height])
  	.style("padding", 20)
  	.style("margin", 5);

  var g = svg
  	.append("g")
  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3
  	.scaleTime()
  	.domain([now - (n - 2) * duration, now - duration])
  	.range([0, width]);

  var y = d3.scaleLinear().range([height, 0]);

  var line = d3
  	.line()
  	.curve(d3.curveBasis)
  	.x(function (d, i) {
  		return x(now - (n - 1 - i) * duration);
  	})
  	.y(function (d, i) {
  		return y(d);
  	});

  svg
  	.attr("width", width + margin.left + margin.right)
  	.attr("height", height + margin.top + margin.bottom)
  	.style("margin-left", -margin.left + "px")
  	.append("g")
  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
  	.append("defs")
  	.append("clipPath")
  	.attr("id", "clip")
  	.append("rect")
  	.attr("width", width)
  	.attr("height", height);

  var axis = svg
  	.append("g")
  	.attr("class", "x axis")
  	.attr("transform", "translate(0," + height + ")")
  	.call(d3.axisBottom(x));

  var path = svg
  	.append("g")
  	.attr("clip-path", "url(#clip)")
  	.append("path")
  	.datum(data)
  	.attr("class", "line")
  	.transition()
  	.duration(405)
  	.ease(d3.easeLinear)
  	.on("start", tick);

  d3.select(window).on("scroll", function () {
  	++count;
  });

  function tick() {
  	now = new Date();
  	x.domain([now - (n - 2) * duration, now - duration]);
  	y.domain([0, d3.max(data)]);

  	data.push(Math.min(70, count));
  	count = 0;

  	d3.select(this).attr("d", line).attr("transform", null);

  	d3
  		.active(this)
  		.attr("transform", "translate(" + x(now - (n - 1) * duration) + ")")
  		.transition()
  		.on("start", tick);

  	axis.transition().duration(750).ease(d3.easeLinear).call(d3.axisBottom(x));

  	data.shift();
  }

}
drawLines()
