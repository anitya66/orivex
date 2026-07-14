import AiFreelancerCard from "./AiFreelancerCard";

import { useAiMatches } from "../hooks/useAiMatches";

import PageSkeleton from "@/components/ui/PageSkeleton";
import EmptyState from "@/components/ui/EmptyState";

import {
  Brain,
  Sparkles,
  Users,
  BadgeCheck,
} from "lucide-react";

function AiMatchingSection({
  projectId,
}) {

  const {

    data,

    isLoading,

    isError,

  } = useAiMatches(projectId);

  if (isLoading) {

    return <PageSkeleton />;

  }

  if (isError) {

    return (

      <EmptyState

        message="Failed to generate AI recommendations."

      />

    );

  }

  const matches = data?.data ?? [];

  if (matches.length === 0) {

    return (

      <EmptyState

        message="No AI recommendations available for this project."

      />

    );

  }

  const averageScore = Math.round(

    matches.reduce(

      (sum, item) => sum + item.overallScore,

      0

    ) / matches.length

  );

  return (

    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">

      {/* Hero */}

      <div className="relative overflow-hidden border-b border-slate-800 px-8 py-10">

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">

              <Sparkles

                size={16}

                className="text-blue-400"

              />

              <span className="text-sm font-semibold text-blue-300">

                AI Recommendation Engine

              </span>

            </div>

            <h2 className="mt-6 text-4xl font-black text-white">

              AI Recommended Freelancers

            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">

              Our AI analyzed freelancer skills,

              project compatibility,

              experience,

              availability,

              ratings,

              and overall success probability

              to recommend the best candidates.

            </p>

          </div>

          <div className="flex flex-wrap gap-4 lg:flex-nowrap">

            <div className="min-w-[120px] flex-1 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-center">

              <Users

                size={22}

                className="mx-auto text-blue-400"

              />

              <p className="mt-3 text-3xl font-black text-white">

                {matches.length}

              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">

                Matches

              </p>

            </div>

            <div className="min-w-[120px] flex-1 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-center">

              <BadgeCheck

                size={22}

                className="mx-auto text-green-400"

              />

              <p className="mt-3 text-3xl font-black text-white">

                {averageScore}%

              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">

                Avg Score

              </p>

            </div>

            <div className="min-w-[120px] flex-1 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-center">

              <Brain

                size={22}

                className="mx-auto text-purple-400"

              />

              <p className="mt-3 text-3xl font-black text-white">

                AI

              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">

                Powered

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Cards */}

      <div className="p-8">

        <div className="grid gap-8">

          {matches.map((freelancer) => (

            <AiFreelancerCard

              key={freelancer.freelancerId}

              freelancer={freelancer}

            />

          ))}

        </div>

      </div>

    </div>

  );

}

export default AiMatchingSection;