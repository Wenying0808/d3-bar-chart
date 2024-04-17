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

    // Create tooltip element
    const tooltip = d3.select("#chart-world-population").append("div")
    .attr("class", "tooltip")
    .append('p')
    .attr("class", "year")
    .append('p')
    .attr("class", "population")
  

    //create bars
    svg2.selectAll(".bar2")
        .data(data)
        .enter()
        .append('rect')
        .attr("class", "bar2")
        .attr("x", d => x(d.year))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.world_population))
        .attr("height", d => height2 - y(d.world_population))
        .style("fill", "pink")

        //add hover effect
        .on("mouseover", function(e, d){
            //get xy values from bar for tooltip position
            var xPos = parseFloat(d3.select(this).attr("x")) + x.bandwidth() / 2;
            var yPos = parseFloat(d3.select(this).attr("y")) + height + height2 + 140;
            

            //update tooltips's position and value
            d3.select('.tooltip')
                    .style("display", "block")
                    .style("left", xPos + 'px')
                    .style("top", yPos + 'px')
                    .html(`<p class="tooltip-text">Year: ${d.year}</p><p class="tooltip-text">Population: ${d.world_population}</p>`)
                    //.select('.year').text(d.year)
                    //.select('.population').text(d.world_population)

            d3.select(this).style("fill", "brown");
            d3.select(this).transition()
                            .duration(200);
            
        })
        .on("mouseout", function(e, d){
            setTimeout(() => {
                tooltip.style("display", "none");
              }, 100); 
            d3.select(this).style("fill", "pink");
        })
       
    })

