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

      const progress = Math.min(
        (timestamp - start) / duration,
        1
      );

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
      className="relative overflow-hidden bg-slate-950 py-28"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[180px]" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[180px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">

            OUR IMPACT

          </span>

          <h2 className="mt-8 text-4xl font-black tracking-tight text-white md:text-5xl">

            Trusted By Thousands

          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-slate-400">

            ORIVEX continues to connect businesses with world-class
            freelancers through an AI-powered hiring experience.

          </p>

        </div>

        {/* Stats */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.label}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-center transition-all duration-300 hover:-translate-y-3 hover:border-blue-500/40 hover:shadow-[0_25px_60px_rgba(37,99,235,0.18)]"
              >

                {/* Glow */}

                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">

                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />

                </div>

                <div className="relative">

                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} border border-slate-700 transition-all duration-300 group-hover:scale-110`}
                  >

                    <Icon
                      className={item.color}
                      size={30}
                    />

                  </div>

                  <h3 className={`mt-8 text-5xl font-black ${item.color}`}>

                    {inView ? (
                      <Counter end={item.value} />
                    ) : (
                      0
                    )}

                    {item.suffix}

                  </h3>

                  <p className="mt-5 leading-7 text-slate-400">

                    {item.label}

                  </p>

                </div>

              </div>

            );

          })}

        </div>

        {/* Bottom */}

        <div className="mt-20 text-center">

          <p className="text-lg text-slate-400">

            Every successful project starts with the right connection.

          </p>

          <p className="mt-2 text-sm text-slate-500">

            ORIVEX is helping businesses and freelancers grow together.

          </p>

        </div>

      </div>

    </section>
  );
}

export default Statistics;