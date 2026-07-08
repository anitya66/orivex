import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import ProjectGrid from "../components/ProjectGrid";
import ProjectSearch from "../components/ProjectSearch";
import ProjectFilters from "../components/ProjectFilters";
import ProjectPagination from "../components/ProjectPagination";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "../hooks/useProjects";

function ProjectsPage() {

  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
  const keyword = searchParams.get("keyword");

  if (keyword) {
    setSearch(keyword);
  }
  }, [searchParams]);
  

  const [status, setStatus] = useState("");
    
  const [open, setOpen] = useState(false);
  
  const { user } = useAuth();

  const { data, isLoading, error } =
    useProjects({
      page,
      size: 5,
      keyword: search || undefined,
      status: status || undefined,
      direction: "desc",
      sortBy: "createdAt",
    });
  
  

  const pagedData = data?.data;

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Projects
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all your projects.
          </p>

        </div>

      {user?.role === "CLIENT" && (
  <button
    onClick={() => setOpen(true)}
    className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
  >
    Create Project
  </button>
)}

      </div>

      <div className="flex flex-wrap items-center gap-4">

        <ProjectSearch
          value={search}
          onChange={setSearch}
        />

        <ProjectFilters
          status={status}
          setStatus={setStatus}
        />

      </div>

      <ProjectGrid
        data={data}
        loading={isLoading}
        error={error}
      />

      {pagedData && (
        <ProjectPagination
          page={page}
          totalPages={pagedData.totalPages}
          setPage={setPage}
        />
          )}
          
         {user?.role === "CLIENT" && open && (
  <CreateProjectModal
    onClose={() => setOpen(false)}
  />
      )}
      
          

    </div>
  );
}

export default ProjectsPage;