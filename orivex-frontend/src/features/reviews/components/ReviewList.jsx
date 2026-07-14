import ReviewCard from "./ReviewCard";

function ReviewList({
  reviews = [],
}) {
  if (!reviews.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-500">

        No reviews yet.

      </div>
    );
  }

  return (
    <div className="space-y-5">

      {reviews.map((review) => (

        <ReviewCard
          key={review.id}
          review={review}
        />

      ))}

    </div>
  );
}

export default ReviewList;