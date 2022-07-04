/* eslint eqeqeq: 0 */
import React from 'react';

function Cart(props) {

    const [cartItemsSaved, setCartItemsSaved] = React.useState({});
    const [generatedTransactionNumber, setGeneratedTransactionNumber] = React.useState("G804333442");
    const [buyerName, setBuyerName] = React.useState("");
    const [buyerEmail, setBuyerEmail] = React.useState("");
    const [buyerContactNumber, setBuyerContactNumber] = React.useState("");
    const [isFormValid, setIsFormValid] = React.useState(false);
    React.useEffect(() => {
        configureCartInLocalStorage();
        updateCartDisplay();
        document.getElementsByClassName("checkout-cart-btn")[0].addEventListener("click", () => handleCartCheckoutBtnOnClick());

        window.addEventListener('rerender-cart', updateCartDisplay);
    }, []);

    function configureCartInLocalStorage(){
        if(localStorage.getItem("cartItems") == null) {
            localStorage.setItem("cartItems", "{}") 
        }
    };

    function updateCartDisplay() {
        let cartItemsSaved = JSON.parse(localStorage.getItem("cartItems"));
    
        let numberOfItems = 0;
        Object.keys(cartItemsSaved).forEach(function(key) {
            numberOfItems = numberOfItems + cartItemsSaved[key];
        });
    
        document.getElementById("cart-item-display").innerHTML = (`${numberOfItems} ${numberOfItems < 2 ? "item" : "items"} - $${(numberOfItems * 23.00).toFixed(2)}`);
    };

    function handleCartCheckoutBtnOnClick(){
        document.getElementById("checkout-modal-body").classList.remove("d-none");
        //document.getElementById("cart-checkout-btn").classList.remove("d-none");

        document.getElementById("receipt-modal-body").classList.add("d-none");
        document.getElementById("cart-receipt-btn").classList.add("d-none");
        document.getElementById("cart-complete-message").classList.add("d-none");
        document.getElementById("cart-failure-message").classList.add("d-none");

        setCartItemsSaved(JSON.parse(localStorage.getItem("cartItems")));
    }
    
    function handleAddQtyBtnOnClick(movieName){
        let cartItemsSaved = JSON.parse(localStorage.getItem("cartItems"));
        cartItemsSaved[movieName] = cartItemsSaved[movieName] + 1;        
        localStorage.setItem("cartItems", JSON.stringify(cartItemsSaved));
        setCartItemsSaved(JSON.parse(localStorage.getItem("cartItems")));
        window.dispatchEvent(new Event('rerender-cart'));
    }

    function handleMinusQtyBtnOnClick(movieName){
        let cartItemsSaved = JSON.parse(localStorage.getItem("cartItems"));
        cartItemsSaved[movieName] = cartItemsSaved[movieName] - 1;
        if (cartItemsSaved[movieName] <= 0) {
            delete cartItemsSaved[movieName];
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItemsSaved));
        setCartItemsSaved(JSON.parse(localStorage.getItem("cartItems")));
        window.dispatchEvent(new Event('rerender-cart'));
    }

    function handleCartSubmitBtnOnClick(){
    
        
        let isNameValid = validateName(buyerName).isValid;
        let isEmailValid = validateEmail(buyerEmail).isValid;
        let isMobileValid = validateContactNumber(buyerContactNumber).isValid;
        setIsFormValid(isNameValid && isEmailValid && isMobileValid);

        //Submit transaction to Spring Boot backend
        if(isFormValid) {

            // $("#cart-receipt-btn")
            // .html(
            //     `Submitting...
            //     <div class="spinner-border spinner-border-sm" role="status">
            //         <span class="sr-only">Loading...</span>
            //     </div>
            //     `
            // )
            // .removeClass("btn-success")
            // .addClass("btn-secondary")
            // .attr("disabled", "disabled");
            
            let data = {
                name: buyerName,
                email : buyerEmail,
                mobile: buyerContactNumber,
                orders: localStorage.getItem("cartItems"),
                transactionNumber: generatedTransactionNumber,
            }
            
            alert(`Thank you ${data.name}! Please check your email at ${data.email} for a receipt for ${data.transactionNumber}.`);
            document.getElementById("cart-complete-message").classList.remove("d-none");
            localStorage.setItem("cartItems", "{}");
            updateCartDisplay();
            document.querySelector("#checkout-modal .close").click();
            //Send email
            // $.ajax(
            //     {
            //         url: "http://localhost:8228/cart", 
            //         type:'POST',
            //         data: JSON.stringify(data),
            //         contentType: "application/json; charset=utf-8",
            //         dataType: "json",
            //         success: function(result){
            //             console.log("Success");
            //             console.log(result);
            //             $("#cart-complete-message").removeClass("d-none");
            //             localStorage.setItem("cartItems", "{}");
            //             //updateCartDisplay();
            //         },
            //         error: function(error) {
            //             console.log("Failure");
            //             console.log(error);
            //             $("#cart-failure-message").removeClass("d-none");
            //         },
            //         complete: function(){
            //             $("#cart-receipt-btn").addClass("d-none").html("Submit").removeClass("btn-secondary").addClass("btn-success").attr("disabled", false);
            //         }
            //     }
            // );
        } 
    }
    
    function CartPaymentBtnOnClick(){
        //Random generate transaction reference [using date time]
        setGeneratedTransactionNumber("G" + (Math.floor(Math.random() * 900000000) + 100000000));
        document.getElementById("checkout-modal-body").classList.add("d-none");
        document.getElementById("cart-checkout-btn").classList.add("d-none");
        document.getElementById("receipt-modal-body").classList.remove("d-none");
        document.getElementById("cart-receipt-btn").classList.remove("d-none");
        document.getElementById("receipt-name-input").classList.remove("border-danger");   
        document.getElementById("receipt-email-input").classList.remove("border-danger");   
        document.getElementById("receipt-mobile-input").classList.remove("border-danger");   
    }
    
    function validateName(name) {
        const hasNumberRegex =  /\d/; 
        const hasSymbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    
        name = name.trim();
        //Criteria: Non empty, less than 28 words, less than 215 characters, non-numeric, non-symbolic
        //Reference: https://the-biggest.net/nature/who-has-the-longest-last-name-ever.html 
        let errorMsg = "";
        let isValid = false; 
    
        if(name.length <= 0) {
            errorMsg = "Please enter a name";
        } else if(name.length >=214 || name.split(" ").length >= 41) {
            errorMsg = "Name is too long";
        } else if (hasNumberRegex.test(name) && hasSymbolRegex.test(name)) {
            errorMsg = "Invalid character detected (Number and Symbol)";
        } else if (hasNumberRegex.test(name)) {
            errorMsg = "Invalid character detected (Number)";
        } else if (hasSymbolRegex.test(name)) {
            errorMsg = "Invalid character detected (Symbol)";
        } else {
            isValid = true;
        }
    
        if(!isValid) {
            document.getElementById("receipt-name-input").classList.add("border-danger");
        } else {
            document.getElementById("receipt-name-input").classList.remove("border-danger");
        }
    
        let output = {isValid: isValid, errorMsg: errorMsg};
        return output; 
    }
    
    function validateContactNumber(contactNumber) {
        contactNumber = contactNumber.trim();
        //Assumption: Validation here will be done only for Singapore number
        //Criteria: 
            // Can be empty
            //8 characters
            //optional to have spacing between 4 numbers
            //starts with 3,6,8 or 9
            //Can also start with "65", "65 ", "+65" or "+65 ". However, the next character have to be either 3,6,8 or 9
        let errorMsg = "";
        let isValid = false; 
    
        if(/^(65|65 |\+65|\+65 )*(3|6|8|9){1}(\d{7}|\d{3} \d{4})$/.test(contactNumber)) {
            isValid = true;
        } else {
            errorMsg = "Please enter a valid number. Format: XXXX XXXX";
        }
    
        if(!isValid) {
            document.getElementById("receipt-mobile-input").classList.add("border-danger");
        } else {
            document.getElementById("receipt-mobile-input").classList.remove("border-danger");
        }
    
        let output = {isValid: isValid, errorMsg: errorMsg};
        return output; 
    }
    
    function validateEmail(email) {
        email = email.trim();
        //Criteria: 
            // Can be empty
            // Total length must be lesser than 346. Reference: https://laughingsquid.com/the-worlds-longest-active-email-address/
            // must meet the schema or <left>@<right>.{<domain>}* 
            // left must be alphanumeric, can have fullstop(.), dash (-) or underscore (_) as well. Length must be more than 0 and starts with an alphanumeric. ([a-zA-Z0-9]+[a-zA-Z0-9\-]*)+
            // right must be alphanumeric only. Length must be more than 0. ([a-zA-Z0-9]+)
            // Domain can be repeatable as many times as possible. However, there must be atleast one domain (\.[a-zA-Z0-9]+)+
        let errorMsg = "";
        let isValid = false; 
    
        if(/^([a-zA-Z0-9]+[a-zA-Z0-9\-\_\.]*)+@([a-zA-Z0-9]+)(\.[a-zA-Z0-9]+)+$/.test(email)) {
            isValid = true;
        } else {
            errorMsg = "Please enter a valid email.";
        }
    
        if(!isValid) {
            document.getElementById("receipt-email-input").classList.add("border-danger");
        } else {
            document.getElementById("receipt-email-input").classList.remove("border-danger");
        }
    
        let output = {isValid: isValid, errorMsg: errorMsg};
        return output; 
    }

    
    return (

        <>
            <div className="modal fade" id="checkout-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                    
                        <div className="modal-header">
                        <h4 className="modal-title">Checkout Cart Items</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        
                        <div id="checkout-modal-body" className="modal-body">
                            {Object.keys(cartItemsSaved).length < 1 
                                ?   <div>"Cart is empty"</div> 
                                :   <table className='table'>
                                        <thead>
                                            <tr>
                                                <th className='text-left'>Movie</th><th className='text-center'>Qty</th><th className='text-right'>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className='checkout-modal-table'>
                                            {Object.keys(cartItemsSaved).map(function(key, index) {
                                               return(
                                               <tr>
                                                    <td>{key}</td>
                                                    <td className="text-left">
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="add-qty-btn" onClick={() => handleAddQtyBtnOnClick(key)} movie-name={key}><i className="fa fa-plus mr-1" aria-hidden="true"></i></td>
                                                                    <td className="qty-display">{cartItemsSaved[key]}</td>
                                                                    <td className="minus-qty-btn" onClick={() => handleMinusQtyBtnOnClick(key)} movie-name={key}><i className="fa fa-minus ml-1" aria-hidden="true"></i></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td className="movie-total-price text-right">${(cartItemsSaved[key] * 23.00).toFixed(2)}</td>
                                                </tr>)
                                            })}
                                            <tr>
                                                <td colspan="2"><b>Grand Total</b></td>
                                                <td className="movie-grand-total text-right text-success"><b>${(Object.values(cartItemsSaved).reduce((a, b) => a + b) * 23.00).toFixed(2)}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                            }
                        </div>

                        <div id="receipt-modal-body" className="modal-body d-none">
                        <form>
                            <h3>We only accept PayNow</h3>
                            <div className="form-group">
                                <label htmlFor="receipt-name-input">Name: </label>
                                <input type="text" className="form-control" id="receipt-name-input" placeholder="Enter your name" value={buyerName} onChange={e => setBuyerName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="receipt-email-input">Email address: </label>
                            <input type="email" className="form-control" id="receipt-email-input" aria-describedby="emailHelp" placeholder="Enter your email" value={buyerEmail} onChange={e => setBuyerEmail(e.target.value)}/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                            <label htmlFor="receipt-mobile-input">Phone Number: </label>
                            <input type="tel" className="form-control" id="receipt-mobile-input" placeholder="Enter your phone number" value={buyerContactNumber} onChange={e => setBuyerContactNumber(e.target.value)}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="receipt-recipient-input">Pay To: </label>
                            <input type="tel" className="form-control" id="receipt-recipient-input" readOnly value="82286372"/>
                            </div>

                            <div className="form-group">
                            <label htmlFor="receipt-reference-input">Transaction Reference: </label>
                            <input type="text" className="form-control" id="receipt-reference-input" aria-describedby="referenceHelp" readOnly value={generatedTransactionNumber}/>
                            <small id="referenceHelp" className="form-text text-muted">Enter this reference number in PayNow under "Add comments for recipient".</small>
                            </div>
                        </form>

                        <div className="alert alert-info">
                            <strong>Info!</strong> Transaction will be confirmed upon clicking on the Submit button. Transaction will not be processed unless payment is received through PayNow. If payment is not made in 7 days, this transaction will be cancelled. Our sales representative will WhatsApp you to confirm or to validate your order. 
                        </div>
                        </div>


                        <div className="modal-footer">
                        <div id="cart-complete-message" className="alert alert-success d-none">
                            <strong>Success!</strong> Order has been made. Please check your e-mail for your e-receipt. 
                        </div>

                        <div id="cart-failure-message" className="alert alert-danger d-none">
                            <strong>Failure!</strong> An error has occured. Please resubmit your order, sorry for any inconvenience caused. 
                        </div>

                        <button id="cart-checkout-btn" onClick={() => CartPaymentBtnOnClick()} type="button" className={`btn btn-success ${Object.keys(cartItemsSaved).length <= 0 ? "d-none" : ""}`}>Make Payment</button>
                        <button id="cart-receipt-btn" onClick={() => handleCartSubmitBtnOnClick()} type="button" className="btn btn-success d-none">Submit</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

  export default Cart;

