// set up the dimension for the chart

const margin = { top: 70, right: 40, bottom: 60, left: 175}
const width = 660 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

// create svg container
const svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //translate(x,y)



// fetch data from json
d3.csv("bog_bodies.csv").then(data => {
    data.forEach(d => {
        d.total = +d.total // convert value to number
    });
    console.log(data);

    //sort the data by total
    data.sort((a,b) => d3.ascending(a.total, b.total))


    // set the x and y scales
    const x = d3.scaleLinear() // for numerical data
                .range([0, width])
                .domain([0, d3.max(data, d => d.total)]);

    const y = d3.scaleBand() // for category data
                .range([height, 0])
                .padding(0.2)
                .domain(data.map(d => d.bog_body_type));



    // create x and y axes
    const xAxis = d3.axisBottom(x)
        .ticks(5)
        .tickSize(0) // remove ticks
        .tickPadding(10)

    const yAxis = d3.axisLeft(y)
        .tickSize(0)
        .tickPadding(10)

    //Add vertical gridlines
    svg.selectAll("line.vertical-grid")
    .data(x.ticks(5))
    .enter()
    .append('line')
    .attr("class", "vertical-grid")
    .attr("x1", d=>x(d)) //define start point
    .attr("y1", 0)
    .attr("x2", d=>x(d)) //define end point
    .attr("y2", height)
    .style("stroke", "gray")
    .style("stroke-width", 0.5)
    .style("stroke-dasharray", "5 5")

    //create the bars for chart
    //render bars before the axes could show the bars below axes
    svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => y(d.bog_body_type))
    .attr("width", d => x(d.total))
    .attr("height", d => y.bandwidth())
    .style("fill", "skyblue")
   

    // add x and y axes to the chart
    svg.append("g")
        .attr("class", "x-axis")
        .style("font-size", "12px")
        .attr("transform", "translate(0," + height + ")") // from top to bottom
        .call(xAxis)
        .call(g => g.select(".domain").remove()) //remove the stroke

    svg.append("g")
        .attr("class", "y-axis")
        .style("font-size", "10px")
        .call(yAxis)
        .style('stroke-width', '2px')

    svg.selectAll(".y-axis .tick text")
        .text(d => d.toUpperCase());
    
    //add label to the end of each bar
    svg.selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .text(d=>d.total)
    .attr("x", d => x(d.total)+5)
    .attr("y", d => y(d.bog_body_type) + y.bandwidth()/2)
    .style("font-family", "sans-serif")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .style("fill", "black")
    
    //add x axis label
    svg.append("text")
    .text("Total")
    .attr("transform", "translate(" + width/2 + "," + (height + margin.bottom) + ")")
    .style("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "12px")

    //add title

    svg.append("text")
    .text("Bog Muscles")
    .attr("x", margin.left)
    .attr("y", margin.top - 90)
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .style("font-weight", "bold")




})




