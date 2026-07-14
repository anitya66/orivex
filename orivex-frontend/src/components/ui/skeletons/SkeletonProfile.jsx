import SkeletonCard from "./SkeletonCard";

function SkeletonList({ count = 5 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export default SkeletonList;