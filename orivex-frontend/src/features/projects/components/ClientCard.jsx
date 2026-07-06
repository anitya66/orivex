function ClientCard({ project }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Client Information
      </h2>

      <div className="space-y-5">

        <Info
          title="Client Name"
          value={project.clientName}
        />

        <Info
          title="Email"
          value={project.clientEmail}
        />

        {project.createdAt && (
          <Info
            title="Created"
            value={new Date(project.createdAt).toLocaleString()}
          />
        )}

        {project.updatedAt && (
          <Info
            title="Updated"
            value={new Date(project.updatedAt).toLocaleString()}
          />
        )}

      </div>

    </div>
  );
}

function Info({ title, value }) {
  return (
    <div>

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-lg text-white">
        {value}
      </p>

    </div>
  );
}

export default ClientCard;