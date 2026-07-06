function ActionButtons({
  isOwner = false,
  onApply,
  onEdit,
  onClose,
  onDelete,
}) {
  if (!isOwner) {
    return (
      <div className="flex flex-wrap gap-4">

        <button
          onClick={onApply}
          className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Apply Proposal
        </button>

      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">

      <button
        onClick={onEdit}
        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Edit Project
      </button>

      <button
        onClick={onClose}
        className="rounded-xl bg-yellow-600 px-5 py-3 font-semibold text-white transition hover:bg-yellow-700"
      >
        Close Project
      </button>

      <button
        onClick={onDelete}
        className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Delete Project
      </button>

    </div>
  );
}

export default ActionButtons;