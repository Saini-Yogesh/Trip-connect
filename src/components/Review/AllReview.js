import React from "react";
import "./AllReviewCSS.css";
import backgroundShadow from "./images/backgroundShadow.png";
const AllReview = () => {
  const reviews = [
    {
      id: 1,
      date: "2024-07-01",
      heading: "Amazing Trip to the Mountains",
      review:
        "The trip was absolutely breathtaking. The views were spectacular, and the experience was unforgettable.",
      reviewer: "John Doe",
    },
    {
      id: 2,
      date: "2024-06-15",
      heading: "A Wonderful Beach Vacation",
      review:
        "I had an amazing time at the beach. The weather was perfect, and the water was crystal clear.",
      reviewer: "Jane Smith",
    },
    {
      id: 3,
      date: "2024-05-20",
      heading: "City Exploration",
      review:
        "Exploring the city was an incredible experience. The architecture and culture were fascinating.",
      reviewer: "Alice Johnson",
    },
    {
      id: 4,
      date: "2024-07-05",
      heading: "Camping Adventure",
      review:
        "Camping in the wilderness was both challenging and rewarding. The night skies were beautiful.",
      reviewer: "Bob Brown",
    },
    {
      id: 5,
      date: "2024-07-07",
      heading: "Historical Tour",
      review:
        "Learning about the history of the area was very enlightening. The guide was knowledgeable and engaging.",
      reviewer: "Michael Davis",
    },
    {
      id: 6,
      date: "2024-07-09",
      heading: "Cultural Experience",
      review:
        "Experiencing the local culture was a highlight of my trip. The people were warm and welcoming.",
      reviewer: "Laura Wilson",
    },
    {
      id: 7,
      date: "2024-07-12",
      heading: "Gastronomical Journey",
      review:
        "The food was out of this world. Each meal was a new adventure for my taste buds.",
      reviewer: "Chris Martin",
    },
    {
      id: 8,
      date: "2024-07-11",
      heading: "Safari Expedition",
      review:
        "Seeing the wildlife up close was an exhilarating experience. The safari was well-organized and safe.",
      reviewer: "Patricia Brown",
    },
    {
      id: 9,
      date: "2024-07-08",
      heading: "Mountain Biking",
      review:
        "Mountain biking through rugged trails was a thrilling experience. The scenery was stunning.",
      reviewer: "Robert Jones",
    },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      className="review-section"
      style={{ backgroundImage: `url(${backgroundShadow})` }}
    >
      <h2 className="section-heading">Travelers Stories/Reviews</h2>
      <div className="reviews-container">
        {reviews.map((review) => (
          <div className="review-box" key={review.id}>
            <p className="review-date">
              {formatDate(review.date)} | <strong> Inspiration</strong>
            </p>
            <h3 className="review-heading">{review.heading}</h3>
            <p className="review-text">{review.review}</p>
            <div className="Line-for-seprarion" />
            <strong>
              <p className="reviewer-name">
                <i className="fa-solid fa-pen-fancy"></i> {review.reviewer}
              </p>
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReview;
