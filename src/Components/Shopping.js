/* eslint eqeqeq: 0 */
import React from 'react';

let moviesOnSaleJSON = [
    {name: "THE LAST: NARUTO THE MOVIE"         , genre: "Anime"    , price: "$23.00", imageURL: "https://resizing.flixster.com/XCywZd6WNujpHw6rWXbxLleHSBY=/206x305/v2/https://flxt.tmsimg.com/assets/p11428092_p_v8_aa.jpg"},
    {name: "X-MEN: THE LAST STAND"              , genre: "Action"   , price: "$23.00", imageURL: "https://resizing.flixster.com/lDpViEiqHtEQVJ9VkctR6mi2VxE=/206x305/v2/https://flxt.tmsimg.com/assets/p159376_p_v10_as.jpg"},
    {name: "TOOTH FAIRY"                        , genre: "Action"   , price: "$23.00", imageURL: "https://resizing.flixster.com/E9ckTDTNPjvM9mSGNs7fx3ehMy0=/206x305/v2/https://flxt.tmsimg.com/assets/p3593387_p_v10_ag.jpg"},
    {name: "RAGING PHOENIX"                     , genre: "Violence" , price: "$23.00", imageURL: "https://resizing.flixster.com/NPGUsYyiiTLTnjNIvOY0cU6K294=/206x305/v2/https://flxt.tmsimg.com/assets/p8089954_v_h9_ab.jpg"},
    {name: "JUMANJI: WELCOME TO THE JUNGLE"     , genre: "Comedy"   , price: "$23.00", imageURL: "https://resizing.flixster.com/fL5VSwphpTqxDge29x39CcCf-bs=/206x305/v2/https://resizing.flixster.com/PXVW-3qa3ZOWceSBKQ-lT0J_3eU=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzA3NTEzOWU0LThkYWQtNDI3Mi05ZThjLWVlMzdhMDc4ZDMzNi53ZWJw"},
    {name: "THE SHAWSHANK REDEMPTION"           , genre: "Crime"    , price: "$23.00", imageURL: "https://resizing.flixster.com/U8DOCAyL0efMS6cA0UmrNi8oyQk=/206x305/v2/https://flxt.tmsimg.com/NowShowing/3725/3725_aa.jpg"},
    {name: "GOD OF GAMBLERS 3: THE EARLY STAGE" , genre: "Comedy"   , price: "$23.00", imageURL: "https://resizing.flixster.com/wyr0XIbzZJA_oi21Z5pwy0HbLZg=/206x305/v2/https://flxt.tmsimg.com/assets/p67556_p_v7_aa.jpg"},
    {name: "THE INTERVIEW"                      , genre: "Comedy"   , price: "$23.00", imageURL: "https://resizing.flixster.com/1xYRFyoXZHU-PBCnBmnxSAWiGIg=/206x305/v2/https://flxt.tmsimg.com/assets/p10569374_p_v13_ae.jpg"}
  ]

function Shopping(props) {
    const [moviesOnSale, setMoviesOnSale] = React.useState(moviesOnSaleJSON);
    const [movieGenre, setMovieGenre] = React.useState("All");

    React.useEffect(() => {
        handleAddToCartBtnOnClick();
    }, []);

    React.useEffect(() => {
        if(movieGenre == "All") {
            setMoviesOnSale(moviesOnSaleJSON);
        } else {
            setMoviesOnSale(moviesOnSaleJSON.filter(movie => movie.genre == movieGenre));
        }
    }, [movieGenre]);
    
    function handleGenreSelectChange(event){
        setMovieGenre(event.target.value);
      }

    function handleAddToCartBtnOnClick(){
        document.querySelectorAll(".add-to-cart-btn").forEach(addToCartBtn => {
            addToCartBtn.addEventListener('click', () => {
                let cartItemsSaved = JSON.parse(localStorage.getItem("cartItems"));    
                let movieRetrieved = addToCartBtn.getAttribute("title");
            
                if(cartItemsSaved[movieRetrieved] == null) {
                    cartItemsSaved[movieRetrieved] = 1;
                } else {
                    cartItemsSaved[movieRetrieved] = cartItemsSaved[movieRetrieved] + 1;
                }

                localStorage.setItem("cartItems", JSON.stringify(cartItemsSaved));

                window.dispatchEvent(new Event('rerender-cart'));
            });
        })
    }
    return (
        <div className="container">
            <div className="row">
            <div id="shop-container" className="col-md-12">
                <h1 className="text-center">Support us by buying some movies! </h1>
                <label>Genre</label>
                <select value={movieGenre} onChange={handleGenreSelectChange}>
                    <option value="All">All</option>
                    <option value="Action">Action</option>
                    <option value="Anime">Anime</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Crime">Crime</option>
                    <option value="Violence">Violence</option>
                </select>
                <div className="row">
                    {moviesOnSale.map(function (movieOnSale, index) {
                        return (
                            <div key={`movieOnSale-${index}`} className="col-md-3 mb-4">
                                <div className="card col-md-12">
                                    <img className="card-img-top mx-auto d-block"  src={movieOnSale.imageURL} alt={movieOnSale.name}/>
                                    <div className="card-body  text-center">
                                    <h5 className="card-title">{movieOnSale.name}</h5>
                                    <p className="card-text font-weight-bold text-success">{movieOnSale.genre}</p>
                                    <p className="card-text">{movieOnSale.price}</p>
                                    <a className="add-to-cart-btn btn btn-primary" title="THE LAST: NARUTO THE MOVIE">Add to Cart</a>
                
                                    </div>
                                </div> 
                            </div>
                        );
                    })}   
                </div>
            </div>
            </div>
        </div>
    );
}

export default Shopping;
