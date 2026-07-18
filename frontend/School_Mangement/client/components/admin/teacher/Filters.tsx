import { Search } from "lucide-react";

interface TeacherFiltersProps {
    search: string;
    setSearch: (value: string) => void;

    selectedStatus: string;
    setSelectedStatus: (value: string) => void;

    onSearch: () => void;
}

export default function TeacherFilters({
    search,
    setSearch,

    selectedStatus,
    setSelectedStatus,

    onSearch,
}: TeacherFiltersProps) {

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border p-5">

            <div className="grid lg:grid-cols-3 gap-4">

                {/* Search */}

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Employee ID / Name / Email"
                        className="w-full border rounded-xl pl-11 pr-4 py-3 bg-transparent"
                    />

                </div>

                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border rounded-xl px-4 py-3 bg-transparent"
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="ACTIVE">
                        ACTIVE
                    </option>

                    <option value="INACTIVE">
                        INACTIVE
                    </option>

                </select>

                {/* Search Button */}

                <button
                    onClick={onSearch}
                    className="rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition"
                >
                    Search
                </button>

            </div>

        </div>
    );
}