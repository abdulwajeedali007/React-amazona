import React from 'react'
import data from './data.json'
import Products from './Components/Products'
import Filter from './Components/Filter'
import Cart from './Components/Cart'
class App extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
       products: data.products,
       size: '',
       sort: '',
       cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): []
    }
    this.handleSize = this.handleSize.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    // this.handleSubmitdata = this.handleSubmitdata.bind(this)
  }
  handleSort(e){
    const sort = e.target.value;
    this.setState((state)=>({
      sort: sort,
      products: state.products.sort((a,b)=>
         sort === "Lowest" ? a.price > b.price ? 1 : -1 : sort === "Highest" ? a.price < b.price ? 1 : -1 : a._id > b._id ? 1 : -1
      )
    }))
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

  // add to cart
  addToCart = (product) => {
    // clone the cartItems
     const cartItems = this.state.cartItems.slice();
     let alreadyInCart = false;
     cartItems.forEach(item =>{
        if(item._id === product._id){
          item.count++;
          alreadyInCart = true
        }
      })
     if(!alreadyInCart){
       cartItems.push({...product, count :1})
     }

     this.setState({
       cartItems: cartItems
     })
     localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  }

// remove item from cart
removeFromCart = (product) => {
  // cloning the state.property
  const cartItems = this.state.cartItems.slice();
  this.setState({cartItems: cartItems.filter(item => item._id !== product._id)})
  localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(item => item._id !== product._id)));
}


handleSubmitdata = (e) => {
  e.preventDefault();

}



handleSubmitdata = (order) =>{
  alert("Order is ordered by "+ order.name)
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
                <Products products={this.state.products} addToCart = {this.addToCart}/>
             </div>
             <div className="sidebar">
                <Cart cartItems = {this.state.cartItems} removeFromCart={this.removeFromCart} handleSubmitdata={this.handleSubmitdata}/>
             </div>
          </div>
        </main>
        <footer>
           &copy; Copyright issue
        </footer>
      </div>
    )
  }
}

export default App

