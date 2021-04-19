import React, { Component } from 'react'
import formatCurrency from '../Util'

export default class Cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isOpen : false,
             name: '',
             email: '',
             address: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }
    

    handleSubmitdata = (e) => {
        e.preventDefault();
        const  order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        }

        this.props.handleSubmitdata(order)

    }     


    render() {
        const {cartItems, removeFromCart} = this.props;
        return (
            <div className="cart-container ">
                {cartItems.length === 0 ? <div className="cart cart-header">Cart is Empty</div> : <div className="cart cart-header">{cartItems.length} Products in the cart</div> }
                <hr/>
                
                {cartItems.map(item=>(
                    <div className="cartItem" key={item._id}>
                        <div className="image">
                          <img src={item.image} alt={item.title}/>
                        </div>
                        <div className="content_area">
                           <p>{item.title}</p>
                           <h4>{formatCurrency(item.price)} X {item.count}</h4>
                        </div>
                        <div className="removeButton">
                          <button onClick={()=>removeFromCart(item)} className="btn-remove">Remove</button>
                        </div>
                    </div>
                ))}
                
                {cartItems.length !== 0 && (
                    <div>
                    <div className="total-button">
                        <h3>Total :</h3>
                        <h2>{formatCurrency(cartItems.reduce((a,c)=> a + c.price * c.count, 0))}</h2>
                    </div>
                    <button className="proceed" onClick={()=>this.setState({isOpen: true})}>Proceed</button>
                    </div>
                ) }
               {this.state.isOpen && (
                   <div className="cartForm">
                      <h4>Enter Address</h4>
                      <hr/>
                      <form onSubmit={this.handleSubmitdata}>
                        <div className="form_box">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="email inputBox" id="email" required/>
                        </div>
                        <div className="form_box">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="name inputBox" id="name" required/>
                        </div>
                        <div className="form_box">
                            <label htmlFor="Address">Address</label>
                            <input type="text" name="address" value={this.state.address} onChange={this.handleChange} className="address inputBox" id="Address" required/>
                        </div>
                        <br/>
                        <div className="form_box">
                           <button type="submit" className="button btn-submit primary">Submit</button>
                        </div>
                      </form>
                   </div>
               )}
            </div>
        )
    }
}
