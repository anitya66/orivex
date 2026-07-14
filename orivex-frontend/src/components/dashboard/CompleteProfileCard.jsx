import { ArrowRight, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CompleteProfileCard({ role }) {

    const navigate = useNavigate();

    const handleClick = () => {

        if (role === "CLIENT") {
            navigate("/dashboard/client/profile");
            return;
        }

        if (role === "FREELANCER") {
            navigate("/dashboard/freelancer/profile");
        }

    };

    return (

        <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 p-8">

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl"></div>

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-start gap-5">

                    <div className="rounded-2xl bg-amber-500/10 p-4">

                        <UserRound
                            size={34}
                            className="text-amber-400"
                        />

                    </div>

                    <div>

                        <h2 className="text-3xl font-bold text-white">
                            Complete Your Profile
                        </h2>

                        <p className="mt-3 max-w-2xl leading-7 text-slate-300">

                            Complete your marketplace profile to unlock
                            project posting, proposals, contracts,
                            messaging and all ORIVEX features.

                        </p>

                    </div>

                </div>

                <button
                    onClick={handleClick}
                    className="flex items-center gap-3 rounded-2xl bg-amber-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-amber-400"
                >

                    Complete Profile

                    <ArrowRight size={18} />

                </button>

            </div>

        </div>

    );

}

export default CompleteProfileCard;