import React, { Component } from 'react'
import formatCurrency from '../Util'

export default class Cart extends Component {
    
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
                    <button className="proceed">Proceed</button>
                    </div>
                ) }

            </div>
        )
    }
}
