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
      <Container>
     <Outlet/> {/**Child routes within parent routes  all other routes sign up cart product are rendered within this component*/}
      </Container>
      
    </main>
    <Footer/>
 </>
  )
}

export default App
