import React from "react"
// importing react
import { scaleLinear, axisLeft, axisBottom, select } from "d3"
// importing the graphing functions from D3 to build the svg
import { FaArrowsAltV, FaArrowsAltH } from 'react-icons/fa';
// importing an up-down and a left-right icon from font awesome to use as sloppy labels

// function sortNumber(a, b) {
//   return a - b
// }
// deprecated test function

// defining the ScatterPlot react component

export default class ScatterPlot extends React.Component {
  // connecting the component to the inputs
  constructor(props) {
    super(props)
  }
  
  render() {
    // defining the size and dimensions of the graph
    const margin = { top: 20, right: 80, bottom: 60, left: 80 }
    // defining the width and height using the margin for spacing (critical if using svg for display)
    const width = 800 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom
    // defining the data & labels to apply to the graph
    const data = this.props.data
    const xTicks = this.props.xTicks
    const yTicks = this.props.yTicks
    const label = this.props.label

    // using d3 scaleLinear to map the input to the rendered output of each axis (x & y)
    const x = scaleLinear()
      .domain([
        0, 100
        // max(data, function(d) {
        //   return d[0]
        // })
        // we used to use the d3.max function to get the largest value. 
        // but .domain is where we set the granularity of the input expected and they need to be the same as the values used for the range slider we create in the 'question' divs in slider.js 
      ])
      .range([0, width])
      // this is mapping the input received (.domain) to the rendered output

    const y = scaleLinear()
      .domain([
        0, 100
      ])
      .range([height, 0])
    // the same as for the x axis. If you change the range slider values you'll have to change this part too
    
  // returning an svg using the graph inputs
    return (
      <div>
        <svg
          // using viewbox to define the visible area
          viewBox='0 0 800 600'
          className="chart"
          // we apply the className 'chart' using the jsx convention. we haven't styled this at all 
        >
          {/* using the label index to label the axes outside of the chart. using icons for x or y axis */}
          <p className='answerTitle'><FaArrowsAltH/> {label[0]} <FaArrowsAltV/> {label[1]}</p>
          {/* positioning the graph container */}
          <g
            // rendering the graph as a group within the svg, classed 'main' for styling
            transform={"translate(" + margin.left + "," + margin.top + ")"}
            width={width}
            height={height}
            className="main"
          >
            {/* rendering the data. first we start with defining the axes and the labels */}
            <RenderCircles data={data} scale={{ x, y }} />
            {/* calling and positioning the axes */}
            <Axis
              axis="x"
              transform={"translate(0," + height/2 + ")"} 
              // height/2 = cartesian axes
              scale={axisBottom().scale(x).ticks(3).tickFormat((d, i) => `${xTicks[i]}`)}
              />
            <Axis
              axis="y"
              transform={"translate(" + width/2 + ", 0)"}
              // width/2 = cartesian axes
              scale={axisLeft().scale(y).ticks(3).tickFormat((d, i) => `${yTicks[i]}`)}
            />
          </g>
          {/* using the label index to label the axes outside of the chart. using icons for x or y axis */}
          <p className='answerTitle'><FaArrowsAltH/> {label[0]} <FaArrowsAltV/> {label[1]}</p>
          <text 
            className='answerTitle'
            textAnchor='start'
            textDecoration='underline'
            transform={"translate(" + width*0.30 + ", " + height*0.98 + ")"}>
              <FaArrowsAltV/> {label[1]}
              {/* positioning the axis labels, very sloppily, notice the fractions of the height and width */}
          </text>
          <text
            className='answerTitle'
            width='20px'
            textDecoration='underline'
            transform={"translate(" + 15 + ", " + height*0.62 + ")"}>
              <FaArrowsAltH/> {label[0]}
              {/* positioning the axis labels, very sloppily, notice the fractions of the height and width */}
          </text> 
        </svg>
        
      </div>
      
    )

  }
}

// rendering the data on top of the axes drawn above
class RenderCircles extends React.Component {
  render() {
    const array = this.props.data
    // loading the data for this chart from the instance defined above from airtable data
    let renderCircles = this.props.data.map((coords, i) => (
      i != 0 ?
        // if data exists, render older results as circles with centers defined by the data -> coords map. the 'clicks' data is stored as x, y... 
        // the first in the index (the latest) will be rendered after.
        <circle
          cx={this.props.scale.x(coords[0])}
          cy={this.props.scale.y(coords[1])}
          r="8"
          style={{ fill: "rgba(0, 93, 199, 0.5)", zIndex: '1' }}
          // defining the color of the results, and making sure they appear on top
          key={i}
        />
      :
        <> 
        {/* empty element to group circle + text */}
        <circle
          // positioning the x & y of the circle using the coords taken from the data, passed in slider
          cx={this.props.scale.x(coords[0])}
          cy={this.props.scale.y(coords[1])}
          r="12"
          // setting the size of the most recent data's circle
          style={{fill: "#DE7D08", zIndex: '1'}}
          // setting the color of the circle to make it pop
          className="last_circle"
          // assigning a class for styling, which we aren't using, though if there are too many results to visualize with sharp circles reduce opacity and blur the circles to create a saturation bloom to illustrate frequency of response.
          key={i}
        />
          <text 
          // simple sloppy label reading 'Your Response', positioned to right of circle
          className="circleLabel"
          x={this.props.scale.x(coords[0])+14}
          y={this.props.scale.y(coords[1])+5}
          // really sloppy positioning
          style={{ fill: '#black', zIndex:'1'}}
          >Your Response
          </text>
        </>
    ))
    // returning renderCircles as the 'g' element
    return <g>{renderCircles}</g>
  }
}

class Axis extends React.Component {
  componentDidMount() {
    const node = this.refs[this.props.axis]
    select(node).call(this.props.scale)
  }

  render() {
    return (
      <g
        className="main axis date"
        transform={this.props.transform}
        ref={this.props.axis}
      />
    )
  }
}