import { useState } from "react";

import { useProjects } from "../hooks/useProjects";

import ProjectSearch from "@/features/projects/components/ProjectSearch";
import ProjectFilters from "@/features/projects/components/ProjectFilters";
import ProjectPagination from "@/features/projects/components/ProjectPagination";

import FreelancerProjectCard from "../components/FreelancerProjectCard";

function BrowseProjectsPage() {
  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("OPEN");

  const { data, isLoading, error } = useProjects({
    page,
    size: 6,
    keyword: search || undefined,
    status: status || undefined,
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

      <div>

        <h1 className="text-4xl font-bold text-white">
          Browse Projects
        </h1>

        <p className="mt-2 text-slate-400">
          Discover projects posted by clients.
        </p>

      </div>

      {/* Search & Filter */}

      <div className="flex flex-wrap gap-4">

        <ProjectSearch
          value={search}
          onChange={setSearch}
        />

        <ProjectFilters
          status={status}
          setStatus={setStatus}
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