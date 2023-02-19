import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { thunkSingleSpot } from "../../../store/spots";
import './SpotDetails.css'
import SpotDetailsReviews from "../../Reviews/SpotDetailsReviews";

function SpotDetails() {
  const {spotId} = useParams();

  const spot = useSelector(state => state.spots.singleSpot)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkSingleSpot(spotId))

  }, [dispatch, spotId])

  if (!Object.keys(spot).length) return null;
  if (!spotId) return null;

  console.log(!spot)

  const spotImages = spot.spotImages

  return (
    <>
      <div className="spot-details-container">
        <div className="details-wrapper">
          <div className="details-header-wrapper">
            <div className="spot-name">{spot.name}</div>
            <div className="city-state-country">{spot.city}, {spot.state}, {spot.country}</div>
          </div>
          <div className="details-images-wrapper">
            <div className="half-image">
              <img id="half-image" src={spotImages && spotImages[0].url} />
            </div>
            <div className="quarter-images">
              {/* OTHER 4 IMAGES GO HERE IN ANOTHER DIV */}
            </div>
          </div>
          <div className="description-price-wrapper">
            <div className="description-wrapper">
              <div className="description-title">{`Hosted by ${spot.owner.firstName} ${spot.owner.lastName}`}</div>
              <div className="description-text">{spot.description}</div>
            </div>
            <div className="price-button-wrapper">
              <div className="price-reviews-text">
                <div className="price-text"><span className="price-text-price">{`$${spot.price.toFixed(2)}`}</span>night</div>
                <div className="reviews-text"><i className="fa-solid fa-star"></i> {!spot.numReviews ? `New` : `${parseFloat(spot.avgStarRating.toFixed(1))} • ${spot.numReviews} ${(spot.numReviews === 1 ? "Review" : "Reviews")}`}</div>
              </div>
              <div className="reserve-button">
                <button className="button">RESERVE</button>
              </div>
            </div>
          </div>
        </div>
        <div className="reviews-wrapper">
          <SpotDetailsReviews spotId={spotId} />
        </div>
      </div>
    </>
  )
}

export default SpotDetails;
