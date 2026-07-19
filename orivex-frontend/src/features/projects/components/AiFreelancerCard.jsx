import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Briefcase,
  Star,
  Brain,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BadgeCheck,
  IndianRupee,
} from "lucide-react";

function getBadgeColor(recommendation) {
  switch (recommendation) {
    case "Excellent Match":
      return "from-emerald-500 to-green-400";

    case "Highly Recommended":
      return "from-blue-500 to-cyan-400";

    case "Recommended":
      return "from-amber-500 to-yellow-400";

    default:
      return "from-orange-500 to-red-400";
  }
}

function getProgressColor(score) {
  if (score >= 90)
    return "from-emerald-500 to-green-400";

  if (score >= 75)
    return "from-blue-500 to-cyan-400";

  if (score >= 60)
    return "from-yellow-500 to-orange-400";

  return "from-red-500 to-rose-400";
}

function ScoreBar({
  title,
  score,
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-sm font-medium text-slate-300">
          {title}
        </span>

        <span className="font-bold text-white">
          {score}%
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-800">

        <div
          className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(
            score
          )}`}
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}) {
  const Icon = icon;

  return (
    <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/70 p-3 sm:p-4">

      <div className="flex items-center gap-2">

        <Icon
          size={16}
          className="text-blue-400"
        />

        <span className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </span>

      </div>

      <p className="mt-3 break-words text-base font-bold text-white sm:text-lg">
        {value}
      </p>

    </div>
  );
}

function AiFreelancerCard({
  freelancer,
}) {

  const [showReason, setShowReason] = useState(false);

  const navigate = useNavigate();

  return (

    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-5 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/20 sm:p-7">

      {/* Glow */}

      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

      {/* Header */}

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">

          {/* Avatar */}

          <div className="relative shrink-0">

            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-md opacity-50" />

            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-blue-500 bg-slate-800">

              {freelancer.profileImage ? (

                <img
                  src={`${import.meta.env.VITE_API_BASE_URL.replace(
                    "/api/v1",
                    ""
                  )}${freelancer.profileImage}`}
                  alt={freelancer.freelancerName}
                  className="h-full w-full object-cover"
                />

              ) : (

                <div className="flex h-full w-full items-center justify-center">

                  <User
                    size={34}
                    className="text-slate-400"
                  />

                </div>

              )}

            </div>

          </div>

          {/* Name + Skills */}

          <div className="min-w-0 flex-1">

            <h2 className="break-words text-xl font-bold leading-tight text-white sm:text-2xl">
              {freelancer.freelancerName}
            </h2>

            <p className="mt-1 break-words text-slate-400">
              {freelancer.headline || "Full Stack Freelancer"}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              {(freelancer.skills ?? "")
                .split(",")
                .filter(Boolean)
                .slice(0, 5)
                .map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
                  >
                    {skill.trim()}
                  </span>

                ))}

            </div>

          </div>

        </div>

        {/* Score */}

        <div className="w-full shrink-0 text-center sm:text-right lg:w-auto">

          <div
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-4 py-2 text-sm font-bold text-white ${getBadgeColor(
              freelancer.recommendation
            )}`}
          >

            <Sparkles size={15} />

            {freelancer.overallScore}%

          </div>

          <p className="mt-3 text-sm text-slate-400">
            {freelancer.recommendation}
          </p>

        </div>

      </div>
          {/* ================= STATS ================= */}

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">

        <StatCard
          icon={Briefcase}
          label="Experience"
          value={`${freelancer.experienceYears} Years`}
        />

        <StatCard
          icon={Star}
          label="Rating"
          value={
            freelancer.ratingScore > 0
              ? `⭐ ${freelancer.ratingScore}`
              : "New"
          }
        />

        <StatCard
          icon={IndianRupee}
          label="Hourly"
          value={`₹${freelancer.hourlyRate}/hr`}
        />

        <StatCard
          icon={BadgeCheck}
          label="AI Match"
          value={`${freelancer.overallScore}%`}
        />

      </div>

      {/* ================= AI ANALYSIS ================= */}

      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/60 p-4 sm:p-6">

        <div className="mb-6 flex items-start gap-3">

          <Brain
            size={22}
            className="mt-1 shrink-0 text-blue-400"
          />

          <div className="min-w-0">

            <h3 className="text-lg font-bold text-white">
              AI Match Analysis
            </h3>

            <p className="mt-1 break-words text-sm leading-6 text-slate-400">
              Generated using skill similarity,
              experience, availability,
              ratings and project compatibility.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <ScoreBar
            title="Skill Match"
            score={freelancer.skillScore}
          />

          <ScoreBar
            title="Experience Match"
            score={freelancer.experienceScore}
          />

          <ScoreBar
            title="Availability"
            score={freelancer.availabilityScore}
          />

          {/* AI Insight */}

          <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-slate-900 p-4 sm:p-5">

            <div className="flex items-center gap-2">

              <Sparkles
                size={18}
                className="shrink-0 text-blue-400"
              />

              <h4 className="font-semibold text-white">
                AI Insight
              </h4>

            </div>

            <p className="mt-4 break-words text-sm leading-7 text-slate-300 sm:text-base">

              This freelancer is recommended because of a strong combination of
              technical skills, relevant experience, project compatibility and
              current availability.

              <span className="font-semibold text-blue-400">
                {" "}
                {freelancer.overallScore}%{" "}
              </span>

              predicted success probability.

            </p>

          </div>

        </div>

      </div>

      {/* ================= WHY RECOMMENDED ================= */}

      <div className="mt-8">

        <button
          onClick={() => setShowReason(!showReason)}
          className="flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4 transition hover:border-blue-500/40 hover:bg-slate-900 sm:px-5"
        >

          <div className="flex items-center gap-3">

            <Brain
              size={20}
              className="text-blue-400"
            />

            <span className="text-left font-semibold text-white">
              AI Recommendation Breakdown
            </span>

          </div>

          {showReason ? (

            <ChevronUp
              size={20}
              className="text-slate-400"
            />

          ) : (

            <ChevronDown
              size={20}
              className="text-slate-400"
            />

          )}

        </button>

        {showReason && (

          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6">

            <ul className="space-y-4">

              <li className="flex items-start gap-3">

                <span className="text-green-400">✓</span>

                <span className="break-words text-slate-300">

                  Skill similarity score :

                  <span className="font-semibold text-white">
                    {" "}
                    {freelancer.skillScore}%
                  </span>

                </span>

              </li>

              <li className="flex items-start gap-3">

                <span className="text-green-400">✓</span>

                <span className="break-words text-slate-300">

                  Experience compatibility :

                  <span className="font-semibold text-white">
                    {" "}
                    {freelancer.experienceScore}%
                  </span>

                </span>

              </li>

              <li className="flex items-start gap-3">

                <span className="text-green-400">✓</span>

                <span className="break-words text-slate-300">

                  Availability score :

                  <span className="font-semibold text-white">
                    {" "}
                    {freelancer.availabilityScore}%
                  </span>

                </span>

              </li>

              <li className="flex items-start gap-3">

                <span className="text-yellow-400">★</span>

                <span className="break-words text-slate-300">

                  Current Rating :

                  <span className="font-semibold text-white">
                    {" "}
                    {freelancer.ratingScore > 0
                      ? freelancer.ratingScore
                      : "New Freelancer"}
                  </span>

                </span>

              </li>

              <li className="break-words rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-blue-300">

                🤖 Recommendation :

                <span className="font-semibold">
                  {" "}
                  {freelancer.recommendation}
                </span>

              </li>

            </ul>

          </div>

        )}

      </div>
          {/* ================= ACTION BUTTONS ================= */}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">

        <button
          className="flex-1 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-blue-500 hover:to-indigo-500"
        >
          Hire Freelancer
        </button>

        <button
          className="flex-1 rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
        >
          View Profile
        </button>

      </div>

    </div>

  );

}





export default AiFreelancerCard;