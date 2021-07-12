import React from 'react'
import { graphql } from 'gatsby'
// loading the graphql server to build the site structure (questions etc)
import Slider from '../components/slider'
import Layout from '../components/layout'

// import unified from 'unified'
// import markdown from 'remark-parse'
// import html from 'remark-html'
// we're no longer using the boston globe op-ed template in our testing so we no longer need to show images or markdown text on the page, and so we've commented out these dependencies... see below

const Quiz = ({ data }) => {
  const quiz = data.quiz.data

  return(
    <Layout>
      {/* in our demonstration we used a template styled to look like a boston globe opinion piece, composed of headline, photo, and main article body. we used markdown text in an airtable cell to style certain elements automatically. hence markdown / remark-parse / remark-html. see above */}
      {/* <div className="container"><div
        className='article'
        dangerouslySetInnerHTML={{
          __html: unified()
            .use(markdown)
            .use(html)
            .processSync(quiz.articleHeadline)
        }}
      />
      <div 
        className='articlePhoto'
        dangerouslySetInnerHTML={{
          __html: "<img src='" + (quiz.articlePhoto) + "'>" 
        }}
      />
      <div
        className='article article-body'
        dangerouslySetInnerHTML={{
          __html: unified()
            .use(markdown)
            .use(html)
            .processSync(quiz.articleBody)
        }}
      /> */}
      {/* here we create divs to arrange elements */}
      <div className='ssBox'>
        {/* using className because class is a reserved word in js */}
      <div className='sliderTitle'>
        <h3>Tell Us What You Think, Use the Sentiment Slider!</h3>
        </div>
      {/* the Slider element with graphQL query results passed to children */}
      <Slider
        quizName={quiz.quizName}
        // the name of the quiz, used for all categorization, never displayed in the slider component, shown only on our test page
        xQuestion={quiz.xQuestion}
        // the first question, which will be represented by the X axis in the resulting graph
        xRangeLowTickLabel={quiz.xRangeLowTickLabel}
        // the left-most label for the first question
        xRangeMidTickLabel={quiz.xRangeMidTickLabel}
        // the middle label for the first question. Sometimes we've left this blank
        xRangeHighTickLabel={quiz.xRangeHighTickLabel}
        // the right-most label for the first question
        yQuestion={quiz.yQuestion}
        // the second question, which will be represented by the Y axis in the resulting graph
        yRangeLowTickLabel={quiz.yRangeLowTickLabel}
        // the left-most label for the second question
        yRangeMidTickLabel={quiz.yRangeMidTickLabel}
        // the middle label for the second question
        yRangeHighTickLabel={quiz.yRangeHighTickLabel}
        // the right-most label for the first question
        UI={quiz.UI}
        // this give us three options for our testing environments: 'secondQuestionGray', 'secondQuestionHidden', or, 'bothQuestionsVisible'. this cell is addressed in slider.js from line 116 
      />
      </div>
    </Layout>
   
  )
}

// a graphQl query to load all the quiz data from the airtable
export const query = graphql`
  query ($quizName: String!) {
    quiz: airtable(
      data: {
        quizName: {
          eq: $quizName
        }
      }
    ) {
      data {
        quizName
        xQuestion
        xRangeLowTickLabel
        xRangeMidTickLabel
        xRangeHighTickLabel
        yQuestion
        yRangeLowTickLabel
        yRangeMidTickLabel
        yRangeHighTickLabel
        UI
      }
    }
  }
`

export default Quiz