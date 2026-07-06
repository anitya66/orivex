function SkillsCard({ skills }) {

  const skillList = skills
    ? skills.split(",")
    : [];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Required Skills
      </h2>

      <div className="flex flex-wrap gap-3">

        {skillList.map((skill) => (

          <span
            key={skill}
            className="rounded-full bg-blue-600/20 px-4 py-2 text-blue-400"
          >
            {skill.trim()}
          </span>

        ))}

      </div>

    </div>
  );
}

export default SkillsCard;