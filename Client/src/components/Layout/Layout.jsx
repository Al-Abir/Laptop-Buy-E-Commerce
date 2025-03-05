import React from 'react'
import Headers from './Headers'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div>
       <Headers></Headers>
       <main style={{minHeight:"80vh"}}>
         {children}
      </main>    
        <Footer></Footer>  
    </div>
  )
}

export default Layout
