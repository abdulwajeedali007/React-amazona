import React from 'react'
import data from './data.json'
import Products from './Components/Products'
import Filter from './Components/Filter'
class App extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
       products: data.products,
       size: '',
       sort: ''
    }
    this.handleSize = this.handleSize.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }
  handleSort(e){
   console.log(e.target.value);
   if(e.target.value === ""){
     this.setState({
       sort:  e.target.value,
       products: data.products,
     }) 
   }else{
    this.setState({
      sort: e.target.value,
      products: data.products.slice().sort((a,b) =>
        e.target.value === "Lowest"
         ? a.price > b.price 
          ? 1
          : -1 
           : e.target.value ==="Highest" 
            ? a.price < b.price ? 1 : -1
             : a._id > b._id 
               ? 1
                : -1
      )
    })
   }
  }
  handleSize(e){
    if(e.target.value === ""){
        this.setState({
          size: e.target.value,
          products: data.products
        })
    }else{
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        )
      })
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
                <Filter count={this.state.products.length}
                 size={this.state.size}
                 sort={this.state.sort}
                 handleSize={this.handleSize}
                 handleSort={this.handleSort}
                />
                 <hr/>
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

