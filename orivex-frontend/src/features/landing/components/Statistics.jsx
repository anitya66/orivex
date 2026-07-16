import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Briefcase,
  Users,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Projects Posted",
    icon: Briefcase,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    value: 1200,
    suffix: "+",
    label: "Professional Freelancers",
    icon: Users,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    value: 98,
    suffix: "%",
    label: "Project Success Rate",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    value: 45,
    suffix: "K+",
    label: "Messages Exchanged",
    icon: MessageCircle,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

function Counter({ end }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    let start;

    const duration = 2000;

    function animate(timestamp) {
      if (!start) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [end]);

  return count;
}

function Statistics() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="statistics"
      ref={ref}
      className="relative overflow-hidden bg-slate-950 py-20 sm:py-24 lg:py-28"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[140px] sm:h-[420px] sm:w-[420px] sm:blur-[180px]" />

        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px] sm:h-[420px] sm:w-[420px] sm:blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-300 sm:px-5 sm:text-sm sm:tracking-[0.3em]">
            OUR IMPACT
          </span>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:mt-8 sm:text-4xl md:text-5xl">
            Trusted By Thousands
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-400 sm:mt-7 sm:text-lg sm:leading-9">
            ORIVEX continues to connect businesses with world-class
            freelancers through an AI-powered hiring experience.
          </p>
        </div>

        {/* Stats */}

        <div className="mt-14 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-center transition-all duration-300 hover:-translate-y-3 hover:border-blue-500/40 hover:shadow-[0_25px_60px_rgba(37,99,235,0.18)] sm:rounded-3xl sm:p-8"
              >
                {/* Glow */}

                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
                </div>

                <div className="relative">
                  <div
                    className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 ${item.bg} transition-all duration-300 group-hover:scale-110 sm:h-16 sm:w-16`}
                  >
                    <Icon
                      className={item.color}
                      size={28}
                    />
                  </div>

                  <h3
                    className={`mt-6 text-4xl font-black sm:mt-8 sm:text-5xl ${item.color}`}
                  >
                    {inView ? <Counter end={item.value} /> : 0}
                    {item.suffix}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-400 sm:mt-5 sm:text-base">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom */}

        <div className="mt-14 text-center sm:mt-20">
          <p className="text-base text-slate-400 sm:text-lg">
            Every successful project starts with the right connection.
          </p>

          <p className="mt-2 text-xs text-slate-500 sm:text-sm">
            ORIVEX is helping businesses and freelancers grow together.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Statistics;