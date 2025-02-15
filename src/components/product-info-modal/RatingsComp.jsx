/* eslint-disable react/prop-types */
import ReactStars from 'react-stars';
import './RatingsComp.css'; // Import the CSS file
import { Rating } from './Rating';

const RatingsComp = ({ item, className }) => {
    const { rating, ratingDistribution, totalReviews } = item || {}

    // const totalReviews = Object.values(ratingDistribution).reduce((acc, value) => acc + value, 0);
    console.log("totalReviews", totalReviews);
    console.log("ratingDistribution", ratingDistribution);


    return (
        <div
            className={`ratings-container ${className}`}
        >
            <div>
                <p className="ratings-header">Reviews</p>
                <h2 className="ratings-average">{rating}</h2>
                <ReactStars
                    edit={false}
                    size={35}
                    count={5}
                    value={rating}
                    color2={'#FF8A00'}
                    className="ratings-stars"
                />
                <p className="ratings-reviews">({totalReviews} Reviews)</p>
            </div>
            <div className="ratings-list">
                <Rating
                    ratingStar={5}
                    ratingValue={ratingDistribution["5"] && ratingDistribution["5"] || 0}
                    maxRating={totalReviews}
                />
                <Rating
                    ratingStar={4}
                    ratingValue={ratingDistribution["4"] && ratingDistribution["4"] || 0}
                    maxRating={totalReviews}
                />
                <Rating
                    ratingStar={3}
                    ratingValue={ratingDistribution["3"] && ratingDistribution["3"] || 0}
                    maxRating={totalReviews}
                />
                <Rating
                    ratingStar={2}
                    ratingValue={ratingDistribution["2"] && ratingDistribution["2"] || 0}
                    maxRating={totalReviews}
                />
                <Rating
                    ratingStar={1}
                    ratingValue={ratingDistribution["1"] && ratingDistribution["1"] || 0}
                    maxRating={totalReviews}
                />
            </div>
        </div>
    );
};

export default RatingsComp;
