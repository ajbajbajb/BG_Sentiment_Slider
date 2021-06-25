import React from "react"
import { scaleLinear, axisLeft, axisBottom, select } from "d3"
import { FaArrowsAltV, FaArrowsAltH } from 'react-icons/fa';

// function sortNumber(a, b) {
//   return a - b
// }

// defining the ScatterPlot component

export default class ScatterPlot extends React.Component {
  // connecting the component to the inputs
  constructor(props) {
    super(props)
  }
  
  render() {
    // defining the size of the graph
    const margin = { top: 20, right: 80, bottom: 60, left: 80 }
    const width = 800 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom
    // defining the data & labels to apply to the graph
    const data = this.props.data
    const xTicks = this.props.xTicks
    const yTicks = this.props.yTicks
    const label = this.props.label

    // using d3 scaleLinear to set the constraints of the axes
    const x = scaleLinear()
      .domain([
        0, 100
        // max(data, function(d) {
        //   return d[0]
        // })
      ])
      .range([0, width])

    const y = scaleLinear()
      .domain([
        0, 100
      ])
      .range([height, 0])

    
  // returning an svg using the graph inputs
    return (
      <div>
        <svg
          // using viewbox to define the visible area
          viewBox='0 0 800 600'
          className="chart"
        >
          {/* using the label index to label the axes outside of the chart. using icons for x or y axis */}
          <p className='answerTitle'><FaArrowsAltH/> {label[0]} <FaArrowsAltV/> {label[1]}</p>
          {/* positioning the graph container */}
          <g
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
              scale={axisBottom().scale(x).ticks(3).tickFormat((d, i) => `${xTicks[i]}`)}
            />
            <Axis
              axis="y"
              transform={"translate(" + width/2 + ", 0)"}
              scale={axisLeft().scale(y).ticks(3).tickFormat((d, i) => `${yTicks[i]}`)}
            />
          </g>
          {/* using the label index to label the axes outside of the chart. using icons for x or y axis */}
          <p className='answerTitle'><FaArrowsAltH/> {label[0]} <FaArrowsAltV/> {label[1]}</p>
          {/* positioning the axis labels, very sloppily, notice the fractions of the height and width */}
          <text 
            className='answerTitle'
            textAnchor='start'
            textDecoration='underline'
            transform={"translate(" + width*0.30 + ", " + height*0.98 + ")"}>
              <FaArrowsAltV/> {label[1]}
          </text>
          <text
            className='answerTitle'
            width='20px'
            textDecoration='underline'
            transform={"translate(" + 15 + ", " + height*0.62 + ")"}>
              <FaArrowsAltH/> {label[0]}
          </text> 
        </svg>
        
      </div>
      
    )

  }
}

// rendering the data on the axes we drew above
class RenderCircles extends React.Component {
  render() {
    const array = this.props.data
    let renderCircles = this.props.data.map((coords, i) => (
      i != 0 ?
        <circle
          cx={this.props.scale.x(coords[0])}
          cy={this.props.scale.y(coords[1])}
          r="8"
          style={{ fill: "rgba(0, 93, 199, 0.5)", zIndex: '2' }}
          key={i}
        />
      :
        <> 
        {/* empty element to group circle + text */}
        <circle
          // positioning the x & y of the circle using the coords taken from the data, passed in slider
          cx={this.props.scale.x(coords[0])}
          cy={this.props.scale.y(coords[1])}
          // setting the size of the circle
          r="12"
          // setting the color of the circle
          style={{fill: "#DE7D08", zIndex: '1'}}
          className="last_circle"
          key={i}
        />
          <text 
          // simple sloppy label for 'Your Response', positioned to right of circle
          className="circleLabel"
          x={this.props.scale.x(coords[0])+14}
          y={this.props.scale.y(coords[1])+5}
          style={{ fill: '#black', zIndex:'1'}}
          >Your Response
          </text>
        </>
    ))
    // returning renderCircles as a 'g' element
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