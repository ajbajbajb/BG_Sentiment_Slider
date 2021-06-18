---
title: Sentiment Slider Documentation
date: 05-28-2021
author: Alex John Beck 
---

# The Sentiment Slider

Built with Gatsby, a React library that uses components and templates.

After cloning the github repo, delete package-lock.json, then run ```npm install```

Launch gatsby dev environment with ```gatsby develop``` or ```npm run develop```

Local environment: http://localhost:8000
Data schema visible at: http://localhost:8000/___graphql

Since we built this tool for testing, there are still some scaffolding from our testing environment. I have marked these artifacts with  ```// TESTING //```

# Built from 1 page, 1 template, and 3 components

- Page:         index.js
- Template:     quiz.js
- Component:    layout.js
- Component:    scatterplot.js
- Component:    slider.js

## index.js
Home Page. Top hierarchy for the available quizzes as sourced from lines in Airtable.
This is the testing environment with links to various quizzes.

## quiz.js
Top half shows Studio20's testing environment with a mock article loaded from Airtable content.
The second part displays the actual sliders with questions sourced from lines in Airtable, queried and imported using Graphql, then passed to the 'Slider.js' component.
Query is visible at the bottom of this page. 

## layout.js
A React component to add a top menu for our testing environment.

## scatterplot.js
The results, labels, and legend are rendered here in an svg using the D3 library.

## slider.js
The quiz.js queries are passed here as data to populate the Studio20 testing environment and the sliders themselves.
A React hook pulls data from Firebase. Connection is setup in gatsby-config.js
Results are pushed to the Firestore.
We also added a testing structure to experiment with the sequencing of questions. An Airtable cell labeled 'UI' offers 3 options: 'bothQuestionsVisible', 'secondQuestionGray', and 'secondQuestionHidden'. We've kept the code here.

