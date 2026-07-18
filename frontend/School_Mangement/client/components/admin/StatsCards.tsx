import {
    Users,
    GraduationCap,
    BookOpen,
    IndianRupee,
} from "lucide-react";

const cards = [
    {
        title: "Total Students",
        value: "2,548",
        icon: GraduationCap,
    },
    {
        title: "Total Staff",
        value: "186",
        icon: Users,
    },
    {
        title: "Active Classes",
        value: "48",
        icon: BookOpen,
    },
    {
        title: "Fee Collection",
        value: "₹24.6L",
        icon: IndianRupee,
    },
];

export default function StatsCards() {
    return (<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (<div
            key={card.title}
            className="
                     bg-white
                     dark:bg-slate-900
                     rounded-2xl
                     p-6
                     shadow-sm
                     border
                     border-slate-200
                     dark:border-slate-800
                 "
        > <div className="flex justify-between items-center">

                ```
                <div>
                    <p className="text-sm text-slate-500">
                        {card.title}
                    </p>

                    <h3 className="text-3xl font-bold mt-2">
                        {card.value}
                    </h3>
                </div>

                <div
                    className="
                            p-3
                            rounded-xl
                            bg-blue-50
                            dark:bg-slate-800
                        "
                >
                    <card.icon
                        size={28}
                        className="text-primary"
                    />
                </div>

            </div>
        </div>
        ))}
    </div>
    );


}
