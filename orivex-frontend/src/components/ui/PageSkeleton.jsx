import LoadingSkeleton from "./LoadingSkeleton";

function PageSkeleton() {
  return (
    <div className="space-y-8">

      <LoadingSkeleton className="h-14 w-72" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {[...Array(6)].map((_, index) => (

          <div
            key={index}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >

            <LoadingSkeleton className="h-5 w-24" />

            <LoadingSkeleton className="mt-6 h-12 w-28" />

            <LoadingSkeleton className="mt-8 h-12 w-full" />

          </div>

        ))}

      </div>

    </div>
  );
}

export default PageSkeleton;