import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Header from "../Components/Header/Header";
import './CartPage.css';


class CartPage extends React.Component{
    constructor(){
       super() 
          this.state = {
           cart: [],
        }
    }


  componentDidMount() { 
   const cart = JSON.parse(localStorage.getItem("cart"));
    console.log("localstor",cart);
     this.setState({cart: cart});
     console.log("displayCart",this.state.cart);

  }

//     EmptyCart = () => (
//     <div>
//             <Navbar />
//             <Header />
//         <div className="CartPage-empty">
//             <br></br>
//             Your Shopping Cart is empty. That's sad. 
//             <br></br>
//             Your Cart lives to serve. Give it purpose — fill it with soap, soap, and more soap!
//         </div>
//     </div>   
//   );

    render(){
    return(
        //displayCart.length === 0 ? {EmptyCart} :
        <div className="CartPage-items">
                    <Navbar />
                    <Header />
        <div className="CartHeader">
            <h2> Your Shopping Cart</h2>  
                <h2 className="CartPage-total">
                 {/* Total Amount: ${(4 * displayCart.length)}.00 } */}
                </h2> 
                <br></br>
            <div className="checkoutButton">
                <Link to="/cart" className={window.location.pathname === "/cart"}>
                    <button className="btn btn-primary my-2 my-sm-0" href="/cart" type="submit">Checkout</button>
                </Link>
                <Link to="/products" className={window.location.pathname === "/products"}>
                    <button className="btn btn-primary my-2 my-sm-0" href="/cart" type="submit">Continue Shopping</button>
                </Link>
            </div>
            <hr></hr>
        </div>

        {/* <div className="ItemPage-items">
            <Navbar />
            <Header />
            <div className="row">
            {this.state.items.map(item => (
                <li key={item.id} className="ItemPage-item">
                    <Item 
                       id={item._id}
                       name={item.name}
                       image={item.image}
                       price={item.price}
                       item={item}
                       addToCart={this.addToCart}
                       />
        
                </li>
             ) )}
        </div>
        </div> */}
    </div>

    )
    };
};
export default CartPage;