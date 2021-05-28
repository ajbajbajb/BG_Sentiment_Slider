import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

// importing react
// importing link and graphql to add Links between components.
// TESTING: importing Layout component for headline + organize quizzes sourced from airtable

// TESTING: this small React component creates a <p> tag for every new node found on the Airtable, then links to the page that was created. w/ Layout + queries Airtable with Graphql

const IndexPage = ({data}) => {

  const quizzes = data.quizzes
  return (
    
    <Layout>
      <div className='quiz-list'>
        {quizzes.edges.map(({node}, index) => (
          <Link to={node.data.quizName} key={index}>
            <p>{node.data.quizName}</p> 
          </Link>
        ))}
      </div>
    </Layout>
  )
}
/* here is where we query the airtable from graphql. Our sliders are built from the cells in one row of airtable, and we access them using quizName. We use quizName across the product to access the other cells */

export const query = graphql`
  query {
    quizzes: allAirtable {
      edges {
        node {
          data {
            quizName
          }
        }
      }
    }
  }
`

export default IndexPage
