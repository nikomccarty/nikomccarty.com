async function sparklinesLine () {
    const width = 150;
    const height = 20;
    const margin = { top: 5, right: 2, bottom: 0, left: 2 };
    const boundedwidth  = width - margin.left - margin.right;
    const boundedheight = height - margin.top - margin.bottom;

    // Generate random data for a line chart.
    const data = d3.range(50).map( d => Math.random() );

    const xScale = d3.scaleLinear().domain([0, data.length]).range([0, boundedwidth]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([boundedheight, 0]);
    
    const svg = d3.select("#sparklines-line").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d));

    svg.append('path').datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#bbb')
        .attr('stroke-width', 1)
        .attr('d', line);

    svg.append('circle')
        .attr('r', 2)
        .attr('cx', xScale(0))
        .attr('cy', yScale(data[0]))
        .attr('fill', 'steelblue');

    svg.append('circle')
        .attr('r', 2)
        .attr('cx', xScale(data.length - 1))
        .attr('cy', yScale(data[data.length - 1]))
        .attr('fill', 'tomato');
}
sparklinesLine()

async function sparklinesBars () {
    const width = 150;
    const height = 20;
    const margin = { top: 5, right: 2, bottom: 0, left: 2 };
    const boundedwidth  = width - margin.left - margin.right;
    const boundedheight = height - margin.top - margin.bottom;

    // Generate random data for a line chart.
    const data = await d3.csv("https://assets.codepen.io/4506684/alphabet.csv", d3.autoType)
    const yAccessor = d => d.frequency;

    const xScale = d3.scaleBand()
		.domain(d3.range(data.length))
		.range([0, boundedwidth])
        
	const yScale = d3.scaleLinear()
		.domain(d3.extent(data, yAccessor))
		.range([boundedheight, 0])
		.nice();
    
    const svg = d3.select("#sparklines-bars").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const bars = svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", (d) => yScale(yAccessor(d)))
        .attr("height", d => yScale(0) - yScale(yAccessor(d)))
        .attr("width", xScale.bandwidth())
        .attr("fill", 'steelblue')
           
}
sparklinesBars()

async function sparklinesBars2 () {

    const width = 150;
    const height = 20;
    const maxdata = 50;
    const mindata = -50;
    const margin = 2;
    

    const data = d3.range(50).map( d => mindata + (maxdata - mindata) * Math.random());
    console.log(data[0])

    const bar_width  = (width - data.length) / data.length;

    const xScale = d3.scaleLinear().domain([0, data.length]).range([0, width]);
    const yScale = d3.scaleLinear().domain([mindata, maxdata]).range([height, 0]);
    
    const svg = d3.select('#sparklines-bars2')
        .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${-margin},${margin})`)

    svg.selectAll('.bar')
    .data(data)
    .join('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => d > 0 ? yScale(d) : yScale(0))
        .attr('width', bar_width)
        .attr('height', d => Math.abs(yScale(d) - yScale(0)))
        .attr('fill', d => d > 0 ? 'steelblue' : 'tomato');

           
}
sparklinesBars2()