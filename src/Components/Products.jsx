import React, { Component } from 'react'
import formatCurrency from '../Util'
import Modal from 'react-modal'
export default class Products extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product: null,
             isOpen: false,
        }
    }
    openModal = (product) =>{
        this.setState({product:product, isOpen: true})
    }
    closeModal = () => {
        this.setState({product: null, isOpen: false})
    }
    render() {
        const product = this.state.product;
        const customStyles = {
            content : {
              top                   : '40%',
              left                  : '50%',
              right                 : '40%',
              bottom                : '0%',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            }
          };
        return (
            <div>
                <ul className="products">
                   {this.props.products.map(product=> <li key={product._id}>
                       <div className="product">
                          <a href={"#"+ product._id} onClick={()=>this.openModal(product)}>
                             <img src={product.image} alt={product.title}/>
                            <p>{product.title}</p>
                          </a>
                          <div className="product-price">
                              <div>
                                 {formatCurrency(product.price)}
                              </div>
                              <button onClick={()=>this.props.addToCart(product)} className="button primary">Add To Cart</button>
                          </div>
                       </div>
                    </li>)}
                </ul>
                {product && (
                    <Modal isOpen={this.state.isOpen} onRequestClose={this.closeModal} style={customStyles}>
                       <div className="modal-header">
                       <div className="product-title">Product Details</div>
                       <button className="close-modal" onClick={this.closeModal}>X</button>
                       </div>
                       <div className="product-detail-content">
                          <div className="product">  
                             <div className="image-box">   
                                <img src={product.image} alt={product.title}/>
                             </div>
                             <div className="content-box">
                                <h4>{product.title}</h4>
                                <p>{product.description}</p>
                                <br/>
                                <div className="sizes"> 
                                    Avaiable Sizes: {" "} 
                                    {product.availableSizes.map(x=> (<span>{" "} <button className="buttonSize">{x}</button></span>))}
                                </div>
                             </div>
                             
                          </div>
                          <div className="closeBtn">
                                <h4>Price: {formatCurrency(product.price)}</h4>
                                <button className="button primary" onClick={(e) => {this.props.addToCart(product); this.closeModal()}} >Add To Cart</button>
                             </div>
                       </div>
                    </Modal>
                )}
            </div>
        )
    }
}
