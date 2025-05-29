import React from 'react'
import ReactDom from 'react-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Team from './components/Team'
import '..main.js'
function App() {
  return (
    <>
    <Header/>
    <Hero/>
    <h1>Hello KEC</h1>
    <Team/>
    <Footer/>
    </>
  )
}

export default App
