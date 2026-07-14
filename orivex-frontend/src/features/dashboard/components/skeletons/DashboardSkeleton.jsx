import SkeletonCard from "@/components/ui/skeletons/SkeletonCard";

function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">

      <div className="h-44 rounded-3xl bg-slate-900"></div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      <div className="h-96 rounded-3xl bg-slate-900"></div>

      <div className="h-72 rounded-3xl bg-slate-900"></div>

    </div>
  );
}

export default DashboardSkeleton;