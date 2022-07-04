/* eslint eqeqeq: 0 */
import React from 'react';

function Header(props) {

    //const {query, searchMovie} = props;
    const [query, setQuery] = React.useState('');

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="planner">Plan</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="shopping">Shop</a>
                </li>
            </ul>
            <div className="checkout-cart-btn" data-toggle="modal" data-target="#checkout-modal">
                <span className="mobile-only float-left pt-1">Checkout (</span>
                <span id="cart-item-display" className="float-left pt-1" >0 item - $0.00</span>
                <span className="mobile-only float-left pt-1">)</span>
                <i className="non-mobile-only fas fa-2x fa-shopping-cart float-right mr-2"></i>
            </div>
            </div>
        </nav>
    );
}

  export default Header;