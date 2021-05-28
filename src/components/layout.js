import * as React from 'react'
import { Link } from 'gatsby'
import '../components/styles/styles.css'
// TESTING 
// import react, import Link function from Gatsby
// import testing site styles (we used sass for this)

const Layout = ({children}) => {

  return (
    <>
    <nav>
      <Link to='/'><h4>Sentiment Slider Test / Documentation</h4></Link>
    </nav>
    <main>
      {children}
    </main>
    </>

  )
}

export default Layout