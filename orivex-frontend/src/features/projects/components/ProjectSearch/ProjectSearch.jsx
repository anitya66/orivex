import Input from "@/components/ui/Input";

function ProjectSearch({
  value,
  onChange,
}) {
  return (
    <div className="w-full max-w-md">
      <Input
        placeholder="Search projects..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}

export default ProjectSearch;