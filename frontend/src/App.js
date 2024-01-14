import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'


const App = () => {
  return (
    <>
    <Header/>
    <main className='py-3'>
      <Container> {/**Containers are a fundamental building block of Bootstrap that contain, pad, and align your content within a given device or viewport. */}
     <Outlet/> {/** An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.*/}
      </Container>
      
    </main>
    <Footer/>
 </>
  )
}

export default App
