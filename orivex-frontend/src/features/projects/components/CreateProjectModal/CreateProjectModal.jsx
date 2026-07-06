import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useUpdateProject } from "../../hooks/useUpdateProject";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

import { projectSchema } from "../../validation/projectSchema";
import {
  PROJECT_CATEGORIES,
  PROJECT_TYPES,
  EXPERIENCE_LEVELS,
} from "../../constants/projectOptions";

import { useCreateProject } from "../../hooks/useCreateProject";

function CreateProjectModal({
  onClose,
  project = null,
})  {
  const {
    mutate,
    isPending,
  } = useCreateProject();

  const {
  mutate: updateMutate,
  isPending: isUpdating,
} = useUpdateProject();

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: zodResolver(projectSchema),
  defaultValues: {
    title: "",
    description: "",
    category: "",
    projectType: "",
    experienceLevel: "",
    budget: "",
    deadline: "",
    requiredSkills: "",
    minimumExperienceYears: "",
  },
});
  
  useEffect(() => {
  if (project) {
    reset({
      title: project.title,
      description: project.description,
      category: project.category,
      projectType: project.projectType,
      experienceLevel: project.experienceLevel,
      budget: project.budget,
      deadline: project.deadline,
      requiredSkills: project.requiredSkills,
      minimumExperienceYears: project.minimumExperienceYears,
    });
  }
}, [project, reset]);

  function onSubmit(data) {

  if (project) {

    updateMutate(
      {
        id: project.id,
        data,
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );

    return;
  }

  mutate(data, {
    onSuccess: () => {
      reset();
      onClose();
    },
  });

}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-8">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <h1 className="text-3xl font-bold text-white">
           {project ? "Edit Project" : "Create Project"}
        </h1>

        <p className="mt-2 text-slate-400">
           {project
              ? "Update your project details."
              : "Publish a new project for freelancers."}
        </p>
        

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
        >

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Project Title
            </label>

            <Input
              placeholder="Enter project title"
              {...register("title")}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Description
            </label>

            <textarea
              rows={6}
              placeholder="Describe your project..."
              {...register("description")}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>

              <Select {...register("category")}>
                <option value="">Select Category</option>

                {PROJECT_CATEGORIES.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </Select>

              {errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Project Type
              </label>

              <Select {...register("projectType")}>
                <option value="">Select Type</option>

                {PROJECT_TYPES.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </Select>

              {errors.projectType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.projectType.message}
                </p>
              )}
            </div>

          </div>

          {/* Experience & Budget */}
          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Experience Level
              </label>

              <Select {...register("experienceLevel")}>
                <option value="">Select Experience</option>

                {EXPERIENCE_LEVELS.map((level) => (
                  <option
                    key={level}
                    value={level}
                  >
                    {level}
                  </option>
                ))}
              </Select>

              {errors.experienceLevel && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.experienceLevel.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Budget (₹)
              </label>

              <Input
                type="number"
                placeholder="5000"
                {...register("budget")}
              />

              {errors.budget && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.budget.message}
                </p>
              )}
            </div>

          </div>

          {/* Deadline */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Deadline
            </label>

            <Input
              type="date"
              {...register("deadline")}
            />

            {errors.deadline && (
              <p className="mt-1 text-sm text-red-500">
                {errors.deadline.message}
              </p>
            )}
                  </div>
                  
             {/* Required Skills */}
<div>
  <label className="mb-2 block text-sm font-medium text-slate-300">
    Required Skills
  </label>

  <textarea
    rows={4}
    {...register("requiredSkills")}
    placeholder="React, Spring Boot, MySQL, Docker..."
    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
  />

  {errors.requiredSkills && (
    <p className="mt-1 text-sm text-red-500">
      {errors.requiredSkills.message}
    </p>
  )}
</div>

{/* Minimum Experience */}
<div>
  <label className="mb-2 block text-sm font-medium text-slate-300">
    Minimum Experience (Years)
  </label>

  <Input
    type="number"
    placeholder="2"
    {...register("minimumExperienceYears")}
  />

  {errors.minimumExperienceYears && (
    <p className="mt-1 text-sm text-red-500">
      {errors.minimumExperienceYears.message}
    </p>
  )}
                  </div>
                  

          {/* Footer */}
          <div className="flex justify-end gap-4 pt-4">

            <Button
              type="button"
              onClick={onClose}
              className="bg-slate-700 hover:bg-slate-600"
            >
              Cancel
            </Button>

     <Button
  type="submit"
  disabled={isPending || isUpdating}
>
  {(isPending || isUpdating)
  ? project
    ? "Updating..."
    : "Publishing..."
  : project
    ? "Update Project"
                  : "Publish Project"}
               </Button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;