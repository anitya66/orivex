import { User } from "lucide-react";

import RatingStars from "./RatingStars";

function ReviewCard({
  review,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-start gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800">

          <User
            className="text-slate-400"
            size={22}
          />

        </div>

        <div className="flex-1">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold text-white">
              {review.reviewerName}
            </h3>

            <span className="text-sm text-slate-500">
              {review.createdAt}
            </span>

          </div>

          <div className="mt-2">

            <RatingStars
              rating={review.rating}
            />

          </div>

          <p className="mt-4 text-slate-300">
            {review.comment}
          </p>

        </div>

      </div>

    </div>
  );
}

export default ReviewCard;