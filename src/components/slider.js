import React from 'react'
import Firebase from 'gatsby-plugin-firebase'
import ScatterPlot from '../components/scatterplot'

// importing React
// importing the Firebase plugin used with Gatsby to pull/push from our Firestore.
// importing the scatterplot component to populate with the data pulled from Firestore and the user's entry


// here we access all the quiz data we passed to the slider.js component from the quiz.js component and create the React component.
const Sliders = ({quizName, xQuestion, xRangeLowTickLabel, xRangeMidTickLabel, xRangeHighTickLabel, yQuestion, yRangeLowTickLabel, yRangeMidTickLabel, yRangeHighTickLabel, UI}) => {

  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    // create a variable for the Firestore database 'clicks' for this named quiz.
    const quiz = Firebase.firestore().collection('quizzes').doc(`${quizName}`).collection('clicks')

    // TESTING // a function to toggle a class if we're using the question visibility options
    function enableNextQuestion(e) {
      e.preventDefault()
      const disabledSlider = document.querySelector('.question.disabled')

      if (!disabledSlider) {} else {
        disabledSlider.classList.remove('disabled')
      }

      const hiddenSlider = document.querySelector('.question.hidden')

      if (!hiddenSlider) {} else {
        hiddenSlider.classList.remove('hidden')
      }
      
      const rangeSlider = document.querySelector('.questionTwo')
      rangeSlider.disabled = false
      
    }
    // The functions that show and hide the slider and the results graph start here.

    // to toggle the submit button on when both answers have been submitted
    function enableSubmit(e) {
      const button = document.querySelector('.submit-button')
      button.classList.remove('disabled')
      button.addEventListener('click',answerQuiz)

    }
    // to skip to the answers without registering an input
    function skipToAnswers(e) {
      const scatterPlot = document.querySelector('.scatter-plot')
      scatterPlot.classList.toggle('hidden') // make the scatterplot visible
      const rangeContainer = document.querySelector('.range-container')
      rangeContainer.classList.toggle('hidden') // make the rangecontainer visible
      const pastClicks = document.querySelector('.past-clicks')
      pastClicks.classList.toggle('hidden') // make past-clicks visible
      const lastCircle = document.querySelector('.last_circle')
      lastCircle.classList.toggle('hidden') // to turn off most recent circle if user 'skips'
      const circleLabel = document.querySelector('.circleLabel')
      circleLabel.classList.toggle('hidden') // to show the circleLabels
    }

    // the function to register values & clicks as the user moves the sliders
    function answerQuiz(e) {
      const scatterPlot = document.querySelector('.scatter-plot')
      scatterPlot.classList.toggle('hidden') // hide the scatterplot
      const rangeContainer = document.querySelector('.range-container')
      rangeContainer.classList.toggle('hidden') // hide the range-container
      const pastClicks = document.querySelector('.past-clicks')
      pastClicks.classList.toggle('hidden') // hide the past-clicks
      const xRangeValue = document.querySelector('.questionOne').value // check the position of the first slider
      const yRangeValue = document.querySelector('.questionTwo').value // check the position of the second slider
      quiz.add({
        x: xRangeValue,
        y: yRangeValue,
        clickTime: Firebase.firestore.Timestamp.fromDate(new Date()) // push the result to the firestore (this will be added as 'clicks')
      }) // TESTING // We added clickTime since it would be worth knowing how long users take to answer the sliders.
    }
    // React hook that pulls quiz clicks from Firebase
    // Firestore data collection and sorting, to pass to the graph
    // Options for the Firebase connection are in the gatsby-config.js file
    quiz.orderBy('clickTime', 'desc').onSnapshot((querySnapshot) => {
      const graphData = []
      const clicks = []
      const allClicks = querySnapshot.size // to calculate all the clicks
      querySnapshot.forEach((doc) => {
        const clickId = doc.id
        const xAnswer = doc.data().x
        const yAnswer = doc.data().y
        const clickTime = doc.data().clickTime

        // building the graphData array from existing data on the Firestore (the variable quiz)
        
      
        clicks.sort(function(a, b) {
          return b.props['data-timestamp'] - a.props['data-timestamp']
        })

        setData(
          <>
            <div className='scatter-plot hidden'>
              {/* the Scatterplot component is here, receiving the graphData set above */}
              <ScatterPlot label={[xQuestion, yQuestion]}  data={graphData} xTicks={[xRangeLowTickLabel,xRangeMidTickLabel,xRangeHighTickLabel]} yTicks={[yRangeLowTickLabel,yRangeMidTickLabel,yRangeHighTickLabel]} />
            </div>
            <div className='range-container'>
              {/* the slider questions are displayed here, the range-container class toggles their visibility*/}
              {
                // SNIP HERE & BELOW TO REMOVE TESTING ENVIRONMENT
                // If the UI cell in the Airtable contains any of the 2 variations below it will toggle visibility settings for the second slider, either gray, or hidden.
                // I have made comments on only the default layout, since the others are just variations with class changes to toggle visibility.
                UI === 'secondQuestionGray' ?
                  <>
                    <div className='question'>
                      <label>{xQuestion}</label>
                      <input type='range' list='tickmarks' min='1' max='100' defaultValue='50' className='questionOne' id='questionOne' onClick={enableNextQuestion} />
                      <datalist id='tickmarks'>
                        <option value='1' className='prominent-tick'></option>
                        <option value='10'></option>
                        <option value='20'></option>
                        <option value='30'></option>
                        <option value='40'></option>
                        <option value='50' className='prominent-tick'></option>
                        <option value='60'></option>
                        <option value='70'></option>
                        <option value='80'></option>
                        <option value='90'></option>
                        <option value='100' className='prominent-tick'></option>
                      </datalist>
                      <div className='ticks'>
                        <span className='tick'>{xRangeLowTickLabel}</span>
                        <span className='tick'>{xRangeMidTickLabel}</span>
                        <span className='tick'>{xRangeHighTickLabel}</span>
                      </div>
                    </div>
                    <div className='question disabled'>
                      <label>{yQuestion}</label>
                      <input disabled type='range' list='tickmarks' min='1' max='100' defaultValue='50' className='questionTwo' id='questionTwo' onChange={enableSubmit} />
                      <datalist id='tickmarks'>
                        <option value='1' className='prominent-tick'></option>
                        <option value='10'></option>
                        <option value='20'></option>
                        <option value='30'></option>
                        <option value='40'></option>
                        <option value='50' className='prominent-tick'></option>
                        <option value='60'></option>
                        <option value='70'></option>
                        <option value='80'></option>
                        <option value='90'></option>
                        <option value='100' className='prominent-tick'></option>
                      </datalist>
                      <div className="ticks">
                        <span className="tick">{yRangeLowTickLabel}</span>
                        <span className="tick">{yRangeMidTickLabel}</span>
                        <span className="tick">{yRangeHighTickLabel}</span>
                      </div>
                    </div>
                  </>
                : UI === 'secondQuestionHidden' ?
                  <>
                    <div className='question'>
                      {/* <h1>SecondQuestionHidden</h1> */}
                      <label>{xQuestion}</label>
                      <input type='range' min='1' max='100' defaultValue='50' className='questionOne' id='questionOne' onClick={enableNextQuestion} />
                      <div className="ticks">
                        <span className="tick">{xRangeLowTickLabel}</span>
                        <span className="tick">{xRangeMidTickLabel}</span>
                        <span className="tick">{xRangeHighTickLabel}</span>
                      </div>
                    </div>
                    <div className='question hidden'>
                      <label>{yQuestion}</label>
                      <input disabled type='range' min='1' max='100' defaultValue='50' className='questionTwo' id='questionTwo' onChange={enableSubmit} />
                      <div className="ticks">
                        <span className="tick">{yRangeLowTickLabel}</span>
                        <span className="tick">{yRangeMidTickLabel}</span>
                        <span className="tick">{yRangeHighTickLabel}</span>
                      </div>
                    </div>
                  </>
                :
                // SNIP HERE & ABOVE TO REMOVE TESTING ENVIRONMENT
                // From below is the standard 2 slider layout.
                // we first pull the xQuestion assigned as a variable from the Airtable cell
                // then use a datalist with arbitrary options to make visible ticks
                // the className 'ticks' assigns variables we got from Airtable as tick labels
                // the variables were passed to this slider.js component in the quiz.js use of <Slider>
                // we do this for the X and the Y axis.
                // the most important part is the use of the html 'range' input.
                  <>
                    <div className='question'>
                      <label>{xQuestion}</label> 
                      {/* input creates the slider. we used 1 - 100 for a certain level of granularity. This gives 1000 possible data points on a 100 x 100 grid. Default value is the middle of the slider. the id is used for styling */}
                      <input type='range' list='tickmarks' min='1' max='100' defaultValue='50' className='questionOne' id='questionOne' /> 
                      <datalist id='tickmarks'>
                        {/* datalist to add ticks on chrome */}
                        <option value='1' className='prominent-tick'></option>
                        <option value='10'></option>
                        <option value='20'></option>
                        <option value='30'></option>
                        <option value='40'></option>
                        <option value='50' className='prominent-tick'></option>
                        <option value='60'></option>
                        <option value='70'></option>
                        <option value='80'></option>
                        <option value='90'></option>
                        <option value='100' className='prominent-tick'></option>
                      </datalist>
                      <div className="ticks">
                        <span className="tick">{xRangeLowTickLabel}</span>
                        <span className="tick">{xRangeMidTickLabel}</span>
                        <span className="tick">{xRangeHighTickLabel}</span>
                      </div>
                    </div>
                    {/* we repeat the step above for the second question */}
                    <div className='question'>
                      <label>{yQuestion}</label>
                      <input type='range' list='tickmarks' min='1' max='100' defaultValue='50' className='questionTwo' id='questionTwo' onChange={enableSubmit} />
                      <datalist id='tickmarks'>
                        <option value='1' className='prominent-tick'></option>
                        <option value='10'></option>
                        <option value='20'></option>
                        <option value='30'></option>
                        <option value='40'></option>
                        <option value='50' className='prominent-tick'></option>
                        <option value='60'></option>
                        <option value='70'></option>
                        <option value='80'></option>
                        <option value='90'></option>
                        <option value='100' className='prominent-tick'></option>
                      </datalist>
                      <div className="ticks">
                        <span className="tick">{yRangeLowTickLabel}</span>
                        <span className="tick">{yRangeMidTickLabel}</span>
                        <span className="tick">{yRangeHighTickLabel}</span>
                      </div>
                    </div>
                  </> 
              }
              {/* we show the total number of clicks below the chart, using the allClicks calculated in the  quiz.orderBy method */}
              <h5 className='respondent-count'>{allClicks} people have responded</h5>

              {/* submit button toggles as both questions are answered */}
              <div className='buttons'>
                <button aria-label="Save" className='submit-button disabled'>
                  See How You Compare To Others...
                </button>
              {/* skip button runs skipToAnswers function  */}
                <button aria-label="Save" className='skip-button' onClick={skipToAnswers}>
                  Skip to Responses
                </button>
              </div>
            </div>
            {/* stores the clicks array ppulated in the quiz.orderBy method */}
            <div className='past-clicks'>
              {clicks}
            </div>
          </>
        )
      });
      
    })
  }, [])

  // passes data for access through the component
  return (
    <>
      {data}
    </>
  )
}


export default Sliders