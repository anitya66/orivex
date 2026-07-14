import { useState } from "react";
import { X, Star } from "lucide-react";
import { toast } from "sonner";

import { useCreateReview } from "../hooks/useCreateReview";

function ReviewModal({
  contractId,
  onClose,
}) {
  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const createReview = useCreateReview();

  function handleSubmit() {
    if (!comment.trim()) {
      toast.error("Comment is required.");
      return;
    }

    createReview.mutate(
      {
        contractId,
        rating,
        comment,
      },
      {
        onSuccess: () => {
          toast.success(
            "Review submitted successfully."
          );

          onClose();
        },

        onError: (error) => {
          toast.error(
            error?.response?.data?.message ??
              "Unable to submit review."
          );
        },
      }
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-slate-900 p-8">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            Leave Review
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>

        </div>

        {/* Rating */}

        <div>

          <p className="mb-3 font-medium text-white">
            Rating
          </p>

          <div className="flex gap-2">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                key={star}
                onClick={() =>
                  setRating(star)
                }
              >
                <Star
                  size={34}
                  className={
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-600"
                  }
                />
              </button>

            ))}

          </div>

        </div>

        {/* Comment */}

        <div className="mt-8">

          <label className="mb-3 block font-medium text-white">
            Comment
          </label>

          <textarea
            rows={6}
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:border-blue-500"
            placeholder="Write your experience..."
          />

        </div>

        {/* Buttons */}

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-6 py-3 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={createReview.isPending}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Submit Review
          </button>

        </div>

      </div>

    </div>
  );
}

export default ReviewModal;