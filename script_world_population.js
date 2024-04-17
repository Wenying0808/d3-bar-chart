// set up the dimension for the chart
const margin2 = { top: 60, right: 40, bottom: 60, left: 100}
const width2 = 1100 - margin.left - margin.right
const height2 = 400 - margin.top - margin.bottom

// create svg container
const svg2 = d3.select("#chart-world-population").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")"); //translate(x,y)

//fetch json data
d3.json('world_population.json')
    .then(data => {
        console.log("World Population:" ,data);

    //sort data from oldest to latest
    data.sort((a, b) =>  a.year - b.year);

    //set the x and y scale
    const x = d3.scaleBand()
                .range([0, width2])
                .domain(data.map(d => d.year))
                .padding(0.1)


    const y = d3.scaleLinear()
                .range([height2, 0])
                .domain([0, d3.max(data, d => d.world_population)])

  
    //create x, y axes
    const xAxis = d3.axisBottom(x)
                    
                    .tickSize(5)
                    .tickPadding(5)
                    .tickSizeOuter(0)

    const yAxis = d3.axisLeft(y)

    //add axes to the chart

    svg2.append("g")
        .attr("class", "x-axis2")
        .attr("transform", "translate(0," + height2 + ")")
        .style("font-size", "9px")
        .call(xAxis)
        .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-0.8em")
                    .attr("dy", "0.15em")
                    .attr("transform", "rotate(-45)");

    svg2.append("g")
        .attr("class", "y-axis2")
        .call(yAxis)

    //create tooltip
    var tooltip = d3.select("#chart-")


    //create bars
    svg2.selectAll(".bar")
        .data(data)
        .enter()
        .append('rect')
        .attr("class", "bar")
        .attr("x", d => x(d.year))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.world_population))
        .attr("height", d => height2 - y(d.world_population))
        .style("fill", "pink")

    })

