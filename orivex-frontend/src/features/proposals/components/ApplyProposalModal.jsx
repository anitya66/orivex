import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { proposalSchema } from "../validation/proposalSchema";
import { useCreateProposal } from "../hooks/useCreateProposal";

function ApplyProposalModal({
  projectId,
  onClose,
}) {
  const {
    mutate,
    isPending,
  } = useCreateProposal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      projectId,
    },
  });

  function onSubmit(data) {
    mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5">

      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            Apply to Project
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <div>

            <label className="mb-2 block text-slate-300">
              Cover Letter
            </label>

            <textarea
              rows={7}
              {...register("coverLetter")}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
            />

            {errors.coverLetter && (
              <p className="mt-1 text-red-500">
                {errors.coverLetter.message}
              </p>
            )}

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-slate-300">
                Proposed Budget
              </label>

              <Input
                type="number"
                {...register("proposedBudget")}
              />

              {errors.proposedBudget && (
                <p className="mt-1 text-red-500">
                  {errors.proposedBudget.message}
                </p>
              )}

            </div>

            <div>

              <label className="mb-2 block text-slate-300">
                Estimated Days
              </label>

              <Input
                type="number"
                {...register("estimatedDays")}
              />

              {errors.estimatedDays && (
                <p className="mt-1 text-red-500">
                  {errors.estimatedDays.message}
                </p>
              )}

            </div>

          </div>

          <div className="flex justify-end gap-4">

            <Button
              type="button"
              onClick={onClose}
              className="bg-slate-700 hover:bg-slate-600"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending
                ? "Submitting..."
                : "Submit Proposal"}
            </Button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ApplyProposalModal;