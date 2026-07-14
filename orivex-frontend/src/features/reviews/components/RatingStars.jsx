import { Star } from "lucide-react";

function RatingStars({
  rating = 0,
  size = 18,
}) {
  return (
    <div className="flex items-center gap-1">

      {[1, 2, 3, 4, 5].map((star) => (

        <Star
          key={star}
          size={size}
          className={
            star <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-slate-600"
          }
        />

      ))}

    </div>
  );
}

export default RatingStars;