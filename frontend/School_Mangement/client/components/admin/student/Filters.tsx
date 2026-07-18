import { Search } from "lucide-react";

interface StudentFiltersProps {
    search: string;
    setSearch: (value: string) => void;

    selectedClass: string;
    setSelectedClass: (value: string) => void;

    selectedSection: string;
    setSelectedSection: (value: string) => void;

    sections: string[];

    onClassChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

    onSearch: () => void;
}

export default function StudentFilters({
    search,
    setSearch,

    selectedClass,
    setSelectedClass,

    selectedSection,
    setSelectedSection,

    sections,

    onClassChange,

    onSearch,
}: StudentFiltersProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border p-5">

            <div className="grid lg:grid-cols-4 gap-4">

                {/* Search */}

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="name / admission_no"
                        className="w-full border rounded-xl pl-11 pr-4 py-3 bg-transparent"
                    />

                </div>

                {/* Class */}

                <select
                    value={selectedClass}
                    onChange={(e) => {
                        setSelectedClass(e.target.value);
                        onClassChange(e);
                    }}
                    className="border rounded-xl px-4 py-3 bg-transparent"
                >
                    <option value="">All Classes</option>

                    <option value="NURSERY">NURSERY</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>

                    <option value="CLASS_1">CLASS 1</option>
                    <option value="CLASS_2">CLASS 2</option>
                    <option value="CLASS_3">CLASS 3</option>
                    <option value="CLASS_4">CLASS 4</option>
                    <option value="CLASS_5">CLASS 5</option>
                    <option value="CLASS_6">CLASS 6</option>
                    <option value="CLASS_7">CLASS 7</option>
                    <option value="CLASS_8">CLASS 8</option>
                    <option value="CLASS_9">CLASS 9</option>
                    <option value="CLASS_10">CLASS 10</option>
                    <option value="CLASS_11">CLASS 11</option>
                    <option value="CLASS_12">CLASS 12</option>
                </select>

                {/* Section */}

                <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="border rounded-xl px-4 py-3 bg-transparent"
                >
                    <option value="">All Sections</option>

                    {sections.map((section) => (
                        <option
                            key={section}
                            value={section}
                        >
                            {section}
                        </option>
                    ))}

                </select>

                {/* Search Button */}

                <button
                    onClick={onSearch}
                    className="rounded-xl bg-primary text-white"
                >
                    Search
                </button>

            </div>

        </div>
    );
}