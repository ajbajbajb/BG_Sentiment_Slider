Overview

The Sentiment Slider is an embeddable widget to let readers register their responses to Globe Opinion articles in a simple, quantifiable, and emotional way.

The Sentiment Slider takes a familiar form - the range slider, hard coded into every web browser - and gathers all respondents into a visualization of diversity opinion.

Every line of text can be customized, Globe Opinion writers and editors are encouraged to experiment with the kinds of questions they ask, the labels on the sliders, and even how they define areas of the scatterplots.

The Sentiment Slider is a new way to have productive, difficult conversations. Writing a comment is hard, it requires confidence and conviction, but sliding is frictionless and simple.




Use

The Sentiment Slider uses two questions that then become the two axes of a familiar scatterplot. These questions could be written by the Globe Opinion writer or proposed by the editors, and we recommend assigning the questions as follows: though the two questions should be related to the Globe Opinion article, one should ask how the reader feels about the article, and the second should be about who they are.

The Sentiment Slider is a tool that can place opinion in context. It helps to know something about a respondent in order to understand why they feel a certain way.
The questions are input using a standard spreadsheet. Each row defines a set of questions for a different slider. There are cells for the two questions and a set of customizable ticks to define the ranges.

We've found that a little personality goes a long way to encourage responses, and since the text fields are completely customizable writers have a new outlet for engaging with their readers.


Workflow Example

A Globe Opinion writer submits an article about student debt. The article itself debates the amount of money that should be forgiven if a relief fund becomes law. In the course of the article the writer describes their own education, the amount of debt they accumulated, and the story of how they paid it down, all to explain their opinion that the proposed law should forgive up to $30,000 of student debt.

To engage productively with the ideal audience for an article like this, the writer or editor builds a Sentiment Slider using our input widget. They consider the framing of the two Sentiment Slider questions: how does the reader feel? And who are they?

For the first, they decide to ask the natural question, 'how much debt *should* be forgiven?' This is the kind of question you'd ask a friend if you knew they'd read this same article. It shouldn't be too direct, nor too abstract.

For the second, they want to know a little bit about the reader. Who are they? This is the trickier question since it can't be asked too directly. Writers need to consider proxy questions for larger truths.

For the question of education in America, perhaps the writer and editor believe that education history is an important factor. Also, education level can act as a proxy for many other facts. Though it's not a fool-proof definition of a respondent, it provides the right kind of context for the first question. The writer decides to ask 'what level of education have you attained?'.
The Sentiment Slider encourages diversity of opinion through granular response. The sliders themselves can be placed anywhere along the range of their action. This means that if a reader doesn't feel like either pole represents their opinion, they can place a response somewhere in the middle, or off to one side.

To guide responses the writer or editor can label the axes, and, again, they are encouraged to experiment. Text labels are completely customizable and poles are intended to polarize and to focus responses. For our example the writer defined the poles in a standard, easily-understandable way that conformed to metrics.

Once the questions and axes are defined, that's the end of the writer's task. The rest is up to the respondents. As more and more responses accumulate on the scatterplot the potential increases for story discovery. Are their odd clusters of responses? Is the result what the writer expected?


Development

The Sentiment Slider leverages the 'range' input method built in HTML. This means that sliders are built into all browser environments and are adapted to whichever platform the reader uses.
The scatter plot display is SVG, scalable to different browser windows.

The backend is a simple database on Firebase that stores x & y click locations and time of click. We do not use click time in this current prototype. No cookies are captured by the Sentiment Slider, which ensures privacy, but unfortunately permits multiple inputs by the same user. A solution to this would be to make the Sentiment Slider a subscriber exclusive: we could tie results to a subscriber's account and build up a user-accessible database of their responses.
The questions are pulled from rows in an Airtable project, but we could pull supplied article metadata from the Globe Opinion's own CMS.

The project was coded in Gatsby/React/Node.js.


Testing & Discovery

Our user testing revealed 3 key insights:
1. Users are familiar with the standard range slider. They understand its granularity: they know what it means to not settle the slider on a specific answer. They know how to use it both on desktop and mobile, the Sentiment Slider does not require any additional training: users already know how it works.

2. Users understand the relationship between the axes and they understand what story is suggested by the results. They understand what it means to see a cluster of points in a part of the graph. Users are familiar with decoding a scatterplot and understanding what it represents.

3. Users describe the impact that answering questions about the article had on their understanding of the article. Instead of passively consuming an opinion article, readers processed the content of the article more deeply if they had to consider their opinion.


Next Steps

Functions we would like to add to the next version of the Sentiment Slider are:
- Allow users to write comments on their individual dots. Hover-over other dots to see other respondents' comments.
- A field to submit your own questions to suggest a Sentiment Slider to Globe Opinion.
- A way to share graphs on social media. This would be an interesting opportunity to spread the efforts of Globe Opinion.


Benefits of Using a Sentiment Slider

Deploying a Sentiment Slider is a good way for Globe Opinion to get to know their readers. It’s an easy way to engage readers and encourage them to read more critically.
The results we see from Sentiment Sliders show that this tool explores the areas between polarized opinions.

Using a Sentiment Slider is also an important tool for story discovery. It is an easy way to challenge our assumptions about how we think other people think. Unexpected outcomes can yield new leads for investigation.





