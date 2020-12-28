async function sparklines1 () {
    const width = 150;
    const height = 20;
    const margin = { top: 5, right: 2, bottom: 0, left: 2 };
    const boundedwidth  = width - margin.left - margin.right;
    const boundedheight = height - margin.top - margin.bottom;

    // Generate random data for a line chart.
    const data = d3.range(50).map( d => Math.random() );

    const xScale = d3.scaleLinear().domain([0, data.length]).range([0, boundedwidth]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([boundedheight, 0]);
    
    const svg = d3.select("#sparklines1").append("svg")
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
sparklines1()