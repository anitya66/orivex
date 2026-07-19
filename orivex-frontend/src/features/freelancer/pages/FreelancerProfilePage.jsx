import {
  Link2,
  Download,
  Briefcase,
  Clock,
  MessageCircle,
  BadgeIndianRupee,
} from "lucide-react";

import { getConversationByFreelancer } from "@/features/chat/api/chatApi";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useFreelancerProfile } from "../hooks/useFreelancerProfile";

function FreelancerProfilePage() {

  const navigate = useNavigate();

  const { freelancerId } = useParams();

  const {
    data,
    isLoading,
    isError,
    } = useFreelancerProfile(freelancerId);
    
    const handleMessage = async () => {

    try {

        const conversationId =
            await getConversationByFreelancer(
                freelancer.id
            );

        navigate(
            `/dashboard/chat?conversationId=${conversationId}`
        );

    } catch {

        alert(
            "You can message this freelancer only after a contract has been created."
        );

    }

};

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-xl font-semibold text-white">
          Loading Freelancer...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-xl text-red-500">
          Failed to load freelancer.
        </div>
      </div>
    );
  }

  const freelancer = data?.data;

  return (

  <div className="mx-auto w-full max-w-7xl space-y-8 overflow-x-hidden">

    {/* Hero */}

<div className="overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900 shadow-2xl">

  {/* Cover */}

  <div className="relative h-44 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />

  </div>

  {/* Content */}

  <div className="relative px-5 pb-6 sm:px-8 lg:px-10 lg:pb-10">

    <div className="-mt-10 flex flex-col gap-6 lg:-mt-14 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <div className="flex flex-col items-center text-center gap-6 lg:flex-row lg:items-center lg:text-left">

        {/* Avatar */}

       <div className="flex h-24 w-24 sm:h-28 sm:w-28 lg:h-36 lg:w-36 shrink-0 items-center justify-center overflow-hidden rounded-full border-[6px] border-slate-900 bg-slate-800 shadow-[0_0_40px_rgba(59,130,246,0.35)]">

          {freelancer.profileImage ? (

            <img
              src={`${import.meta.env.VITE_API_BASE_URL.replace(
                "/api/v1",
                ""
              )}${freelancer.profileImage}`}
              alt={freelancer.name}
              className="h-full w-full object-cover"
            />

          ) : (

            <span className="text-4xl lg:text-6xl font-black text-white">
              {freelancer.name.charAt(0)}
            </span>

          )}

        </div>

        {/* Details */}

        <div className="pt-2 lg:pt-12">

          

          <h1 className="break-words text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">

            {freelancer.name}

          </h1>

          <p className="mt-2 text-lg text-sky-300 sm:text-xl lg:text-2xl">

            {freelancer.headline || "Professional Freelancer"}

                              </p>
                              <div className="mt-4 flex flex-wrap gap-3">

            <span className="rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-300">

              Freelancer Profile

            </span>

            <span
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                freelancer.available
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {freelancer.available
                ? "Available For Work"
                : "Busy"}
            </span>

          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start">

            <div className="rounded-2xl border border-slate-700 bg-slate-800/60 px-5 py-3">

              <p className="text-xs uppercase tracking-widest text-slate-500">

                Experience

              </p>

              <p className="mt-1 text-lg font-bold text-white">

                {freelancer.experienceYears} Years

              </p>

            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-800/60 px-5 py-3">

              <p className="text-xs uppercase tracking-widest text-slate-500">

                Hourly Rate

              </p>

              <p className="mt-1 text-lg font-bold text-green-400">

                ₹{freelancer.hourlyRate}/hr

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="flex w-full flex-col gap-4 lg:w-[270px]">

        <button
          onClick={() => {
            alert("Contract creation flow will be connected here.");
          }}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-lg font-bold text-white transition duration-300 hover:scale-[1.02]"
        >
          Hire Freelancer
        </button>

        <button
          onClick={handleMessage}
          className="flex items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-800 px-8 py-4 text-lg font-semibold text-white transition hover:border-blue-500"
        >
          <MessageCircle size={20} />

          Message
        </button>

      </div>

    </div>

  </div>

</div>

            {/* Body */}

      <div className="grid gap-8 xl:grid-cols-3">

        {/* LEFT */}

        <div className="space-y-8 xl:col-span-2">

          {/* About */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="mb-6 text-3xl font-black text-white">
              About Freelancer
            </h2>

            <p className="text-lg leading-9 text-slate-300">

              {freelancer.bio ||
                "No professional bio has been added yet."}

            </p>

          </section>

          {/* Skills */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="mb-6 text-3xl font-black text-white">

              Skills

            </h2>

            <div className="flex flex-wrap gap-4">

              {(freelancer.skills ?? "")
                .split(",")
                .filter(Boolean)
                .map((skill) => (

                  <span
                    key={skill}
                    className="
                      rounded-full
                      border
                      border-blue-500/25
                      bg-blue-500/10
                      px-5
                      py-3
                      font-semibold
                      text-blue-300
                    "
                  >
                    {skill.trim()}
                  </span>

                ))}

            </div>

          </section>

        </div>

        {/* RIGHT */}

        <div className="space-y-8">

          {/* Professional */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="mb-8 text-xl font-black text-white">

              Professional Details

            </h2>

            <div className="space-y-6">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3 text-slate-400">

                  <BadgeIndianRupee size={18} />

                  Hourly Rate

                </div>

                <span className="text-xl font-black text-green-400">

                  ₹{freelancer.hourlyRate}/hr

                </span>

              </div>

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3 text-slate-400">

                  <Briefcase size={18} />

                  Experience

                </div>

                <span className="font-bold text-white">

                  {freelancer.experienceYears} Years

                </span>

              </div>

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3 text-slate-400">

                  <Clock size={18} />

                  Availability

                </div>

                <span
                  className={`font-bold ${
                    freelancer.available
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {freelancer.available
                    ? "Available"
                    : "Busy"}

                </span>

              </div>

            </div>

          </section>

          {/* Contact */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="mb-8 text-2xl font-black text-white">

              Contact & Links

            </h2>

            <div className="space-y-5">

              {freelancer.email && (

                <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">

                  <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">

                    Email

                  </p>

                  <p className="font-medium text-white">

                    {freelancer.email}

                  </p>

                </div>

              )}

              {freelancer.portfolioUrl && (

                <a
                  href={freelancer.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/40 p-4 transition hover:border-blue-500"
                >

                  <Link2 size={20} />

                  Portfolio

                </a>

              )}

              {freelancer.resumeUrl && (

                <a
                  href={freelancer.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 font-semibold text-blue-300 transition hover:bg-blue-500/20"
                >

                  <Download size={20} />

                  Download Resume

                </a>

              )}

            </div>

          </section>

        </div>

      </div>

    </div>

  );

}

export default FreelancerProfilePage;