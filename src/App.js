import React from 'react'
import data from './data.json'
import Products from './Components/Products'
class App extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
       products: data.products,
       size: '',
       sort: ''
    }
  }
  
  render(){
    return (
      <div className="grid-container">
        <header>
           <a href="#">ReactShoppingCART</a>
        </header>
        <main>
          <div className="content">
             <div className="main-content">
                <Products products={this.state.products}/>
             </div>
             <div className="sidebar">
                sidebar
             </div>
          </div>
        </main>
        <footer>
           this is footer
        </footer>
      </div>
    )
  }
}

export default App

