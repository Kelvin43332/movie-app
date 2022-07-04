/* eslint eqeqeq: 0 */
import React from 'react';

function Reviews(props) {
    const [reviews, setReviews] = React.useState([props.reviews]);

    React.useEffect(() => {
        setReviews(props.reviews);
    }, [props.reviews])

    return (
        <div className="row">
            <h4 className="component-title">Movie Reviews</h4>
            <div id="movie-reviews__component" className="col-md-12">
            <table id="movie-reviews__review-table"className="table table-borderless">
                <thead>
                </thead>
                <tbody>
                    {reviews.map(function (review, index) {
                        return (
                            <tr key ={`review-${index}`}>
                                <td>{review.display_title}<br/><img className="movie-img" src={`${review.multimedia?.src}`} alt={review.display_title}/></td>
                                <td className="non-mobile-only">{review.byline}</td>
                                <td className="non-mobile-only">{review.summary_short}</td>
                                <td><a className="btn btn-dark btn-block" href={`${review.link?.url}`}>Read Review</a></td>
                            </tr>
                        );
                    })} 
                </tbody>
            </table>
            </div>
        </div>
    );
}

  export default Reviews;