
import React from 'react'
import Firstblock from './Components/Firstblock'
import Service from './Components/feature'
import MainCard from './Components/Card'
import Accordin from './Components/Accordion'
import Footer from './Components/Footer'
import MainNavbar from './Components/Navbar'
import BlogHome from './Components/BlogHome'
import FlightsHome from './Components/FlightsHome'
// import Carousel from './Components/Carousel'

function Home() {
  return (
    <>
    <MainNavbar/>
    <Firstblock/>
    <Service/>
    {/* <Carousel/> */}
    <MainCard/>
    <FlightsHome/>
    {/* <BlogHome/> */}
    <Accordin/>
    <Footer/>
    </>
  )
}

export default Home