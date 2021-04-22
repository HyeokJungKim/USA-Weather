import React from "react"
import * as d3 from "d3";

class Temperature extends React.Component{
    componentDidMount() {
        this.renderGraph()
    }

    renderGraph(){
        let w = 400
        let h = 300

        let margin = 75
        let height = h - margin * 2
        let width = w - margin * 2

        let svg = d3.select("#temperature")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
        
        let chart = svg.append("g")
            .attr("transform", `translate(${margin}, ${margin})`)
        
        this.yScale = d3.scalePoint()
            .range([0, height])
            .domain(["Humidity", "Temperature"])
            .padding(0.5)
            
        this.xScale = d3.scaleLinear()
            .range([0, width])
            .domain([0, 120])
            
        chart.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(this.xScale))

        chart.append("g")
            .call(d3.axisLeft(this.yScale))
                        
        this.tempBar = chart.append("rect")
            .attr("x", 0)
            .attr("y", () => this.yScale("Temperature") - 10)
            .attr("height", 20)
            .attr("width", 0)


        this.humidBar = chart.append("rect")
            .attr("x", 0)
            .attr("y", () => this.yScale("Humidity") - 10)
            .attr("height", 20)
            .attr("width", 0)
        
        this.animateBars()
    }

    animateBars(){
        this.tempBar.transition()
            .duration(1500)
            .ease(d3.easeQuadOut)
            .attr("width", () => this.xScale(this.props.temperature))

        this.humidBar.transition()
            .duration(1500)
            .ease(d3.easeQuadOut)
            .attr("width", () => this.xScale(this.props.humidity))

    }

    componentDidUpdate({humidity, temperature}){
        if(humidity !== this.props.humidity || temperature !== this.props.temperature){
            this.animateBars()
        }
    }

    render(){
        return(
            <div id="temperature">
            </div>
        )
    }

}

export default Temperature