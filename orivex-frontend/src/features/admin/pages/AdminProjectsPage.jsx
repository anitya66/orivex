import { useState } from "react";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import FilterSelect from "../components/common/FilterSelect";
import Pagination from "../components/common/Pagination";
import LoadingState from "../components/common/LoadingState";
import EmptyState from "../components/common/EmptyState";
import ProjectTable from "../components/ProjectTable";
import ProjectDetailsModal from "../components/ProjectDetailsModal";
import { useProjects } from "../hooks/useProjects";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

import ConfirmActionModal from "../components/ConfirmActionModal";

import { useUpdateProjectStatus } from "../hooks/useUpdateProjectStatus";

import { useDeleteProject } from "../hooks/useDeleteProject";

function AdminProjectsPage() {

  const [page, setPage] = useState(0);

  const [keyword, setKeyword] = useState("");

  const debouncedKeyword =
    useDebounce(keyword);

  const [status, setStatus] = useState("");

  const [selectedProjectId, setSelectedProjectId] =
  useState(null);

const [openDetails, setOpenDetails] =
  useState(false);

const [selectedProject, setSelectedProject] =
  useState(null);

const [openConfirmModal, setOpenConfirmModal] =
  useState(false);

const [actionType, setActionType] =
  useState(null);  

  const size = 10;

  const updateProjectStatus =
  useUpdateProjectStatus();

const deleteProject =
  useDeleteProject();

  const {

    data,

    isLoading,

    isError,

  } = useProjects({

    page,

    size,

    keyword: debouncedKeyword,

    status,

  });

  if (isLoading) {

    return (

      <LoadingState
        message="Loading projects..."
      />

    );

  }

  if (isError) {

    return (

      <EmptyState
        message="Failed to load projects."
      />

    );

  }

  const pageData = data.data;

  const projects = pageData.content;


  function handleToggleStatus(project) {

  setSelectedProject(project);

  setActionType("STATUS");

  setOpenConfirmModal(true);

}

function handleDelete(project) {

  setSelectedProject(project);

  setActionType("DELETE");

  setOpenConfirmModal(true);

}

  return (

    <div className="space-y-8">

      <PageHeader

        title="Project Management"

        description="Manage all projects."

      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <SearchBar

          value={keyword}

          onChange={(e) => {

            setKeyword(e.target.value);

            setPage(0);

          }}

        />

        <FilterSelect

          value={status}

          onChange={(e) => {

            setStatus(e.target.value);

            setPage(0);

          }}

        >

          <option value="">
            All Status
          </option>

          <option value="OPEN">
            Open
          </option>

          <option value="IN_PROGRESS">
            In Progress
          </option>

          <option value="COMPLETED">
            Completed
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>

          <option value="SUSPENDED">
            Suspended
          </option>

        </FilterSelect>

      </div>

      {

        projects.length === 0

          ? (

            <EmptyState
              message="No projects found."
            />

          )

          : (

            <ProjectTable

  projects={projects}

  onView={(project) => {

    setSelectedProjectId(project.id);

    setOpenDetails(true);

  }}

  onToggleStatus={handleToggleStatus}

  onDelete={handleDelete}

/>

          )

      }

      <Pagination

        page={page}

        totalPages={pageData.totalPages}

        onPrevious={() =>

          setPage((prev) => prev - 1)

        }

        onNext={() =>

          setPage((prev) => prev + 1)

        }

      />

      {openDetails && (

  <ProjectDetailsModal

    projectId={selectedProjectId}

    onClose={() => {

      setOpenDetails(false);

      setSelectedProjectId(null);

    }}

  />

)}

         {openConfirmModal && selectedProject && (

  <ConfirmActionModal

    title={
      actionType === "DELETE"

        ? "Delete Project"

        : selectedProject.status === "SUSPENDED"

        ? "Resume Project"

        : "Suspend Project"
    }

    message={
      actionType === "DELETE"

        ? `Are you sure you want to delete "${selectedProject.title}"?`

        : `Are you sure you want to ${
            selectedProject.status === "SUSPENDED"

              ? "resume"

              : "suspend"

          } "${selectedProject.title}"?`
    }

    confirmText={
      actionType === "DELETE"

        ? "Delete"

        : selectedProject.status === "SUSPENDED"

        ? "Resume"

        : "Suspend"
    }

    confirmColor={
      actionType === "DELETE"

        ? "bg-red-700 hover:bg-red-800"

        : selectedProject.status === "SUSPENDED"

        ? "bg-green-600 hover:bg-green-700"

        : "bg-yellow-600 hover:bg-yellow-700"
    }

    loading={
      actionType === "DELETE"

        ? deleteProject.isPending

        : updateProjectStatus.isPending
    }

    onClose={() => {

      setOpenConfirmModal(false);

      setSelectedProject(null);

      setActionType(null);

    }}

    onConfirm={() => {

      if (actionType === "DELETE") {

        deleteProject.mutate(

          selectedProject.id,

          {

            onSuccess: () => {

              toast.success(
                "Project deleted successfully."
              );

              setOpenConfirmModal(false);

              setSelectedProject(null);

              setActionType(null);

            },

            onError: (error) => {

              toast.error(

                error?.response?.data?.message ||

                "Failed to delete project."

              );

            },

          }

        );

        return;

      }

      updateProjectStatus.mutate(

        {

          projectId: selectedProject.id,

          status:

            selectedProject.status === "SUSPENDED"

              ? "OPEN"

              : "SUSPENDED",

        },

        {

          onSuccess: () => {

            toast.success(
              "Project status updated."
            );

            setOpenConfirmModal(false);

            setSelectedProject(null);

            setActionType(null);

          },

          onError: () => {

            toast.error(
              "Failed to update project."
            );

          },

        }

      );

    }}

  />

)}

    </div>

  );

}

export default AdminProjectsPage;