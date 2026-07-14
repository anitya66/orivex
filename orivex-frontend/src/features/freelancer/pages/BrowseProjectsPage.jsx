import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useProjects } from "../hooks/useProjects";

import ProjectSearch from "@/features/projects/components/ProjectSearch";
import ProjectFilters from "@/features/projects/components/ProjectFilters";
import ProjectPagination from "@/features/projects/components/ProjectPagination";

import FreelancerProjectCard from "../components/FreelancerProjectCard";

function BrowseProjectsPage() {
  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
  const keyword = searchParams.get("keyword");

  if (keyword) {
    setSearch(keyword);
  }
}, [searchParams]);

  

  const { data, isLoading, error } = useProjects({
    page,
    size: 6,
    keyword: search || undefined,
    direction: "desc",
    sortBy: "createdAt",
  });

  if (isLoading) {
    return (
      <div className="p-8 text-white">
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">
        Failed to load projects.
      </div>
    );
  }

  const pagedData = data?.data;

  return (
    <div className="space-y-8 p-8">

      {/* Header */}

<div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-600/20 via-slate-900 to-slate-900 p-8">

  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
        🚀 Freelance Marketplace
      </span>

      <h1 className="mt-5 text-4xl font-bold text-white lg:text-5xl">
        Browse Projects
      </h1>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
        Explore opportunities that match your skills, submit proposals,
        and grow your freelance career with ORIVEX.
      </p>

    </div>

  </div>

</div>

      {/* Search & Filter */}

      <div className="flex flex-wrap gap-4">

        <ProjectSearch
          value={search}
          onChange={setSearch}
        />

        

      </div>

      {/* Cards */}

      {pagedData?.content?.length === 0 ? (
        <div className="rounded-xl bg-slate-900 p-8 text-center text-slate-400">
          No projects found.
        </div>
      ) : (
        <div className="grid gap-6">

          {pagedData.content.map((project) => (
            <FreelancerProjectCard
              key={project.id}
              project={project}
            />
          ))}

        </div>
      )}

      {/* Pagination */}

      {pagedData && (
        <ProjectPagination
          page={page}
          totalPages={pagedData.totalPages}
          setPage={setPage}
        />
      )}

    </div>
  );
}

export default BrowseProjectsPage;