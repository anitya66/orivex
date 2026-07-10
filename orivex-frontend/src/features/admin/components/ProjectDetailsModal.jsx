import { useProjectDetails } from "../hooks/useProjectDetails";

function ProjectDetailsModal({

  projectId,

  onClose,

}) {

  const {

    data,

    isLoading,

  } = useProjectDetails(projectId);

  if (isLoading) {

    return (

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

        <div className="rounded-2xl bg-slate-900 p-8 text-white">

          Loading...

        </div>

      </div>

    );

  }

  const project = data.data;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

      <div className="w-full max-w-3xl rounded-2xl bg-slate-900 p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">

            Project Details

          </h2>

          <button

            onClick={onClose}

            className="text-slate-400 hover:text-white"

          >

            ✕

          </button>

        </div>

        <div className="grid grid-cols-2 gap-6 text-white">

          <div>

            <p>

              <strong>Title</strong>

            </p>

            <p>{project.title}</p>

          </div>

          <div>

            <p>

              <strong>Client</strong>

            </p>

            <p>{project.clientName}</p>

          </div>

          <div>

            <p>

              <strong>Budget</strong>

            </p>

            <p>₹{project.budget}</p>

          </div>

          <div>

            <p>

              <strong>Deadline</strong>

            </p>

            <p>{project.deadline}</p>

          </div>

          <div>

            <p>

              <strong>Status</strong>

            </p>

            <p>{project.status}</p>

          </div>

          <div>

            <p>

              <strong>Category</strong>

            </p>

            <p>{project.category}</p>

          </div>

          <div>

            <p>

              <strong>Project Type</strong>

            </p>

            <p>{project.projectType}</p>

          </div>

          <div>

            <p>

              <strong>Experience</strong>

            </p>

            <p>{project.experienceLevel}</p>

          </div>

        </div>

        <div className="mt-6">

          <h3 className="mb-2 text-lg font-semibold text-white">

            Description

          </h3>

          <p className="text-slate-300">

            {project.description}

          </p>

        </div>

        <div className="mt-6">

          <h3 className="mb-2 text-lg font-semibold text-white">

            Required Skills

          </h3>

          <p className="text-slate-300">

            {project.requiredSkills}

          </p>

        </div>

      </div>

    </div>

  );

}

export default ProjectDetailsModal;