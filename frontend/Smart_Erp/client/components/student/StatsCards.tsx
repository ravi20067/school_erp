import {
    BookOpen,
    GraduationCap,
    CreditCard,
    Library,
} from "lucide-react";

const cards = [
    {
        title: "Attendance",
        value: "92%",
        icon: BookOpen,
    },
    {
        title: "CGPA",
        value: "8.7",
        icon: GraduationCap,
    },
    {
        title: "Pending Fees",
        value: "₹3,500",
        icon: CreditCard,
    },
    {
        title: "Issued Books",
        value: "4",
        icon: Library,
    },
];

export default function StatsCards() {
    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-slate-500 text-sm">
                                {card.title}
                            </p>

                            <h3 className="text-3xl font-bold mt-2">
                                {card.value}
                            </h3>
                        </div>

                        <card.icon className="text-blue-600" size={32} />
                    </div>
                </div>
            ))}
        </div>
    );
}