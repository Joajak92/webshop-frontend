

type CategoryFilterProps = {
    categories: string[];
    selected: string;
    onChange: (category: string) => void;
};

const CategoryFilter = ({categories, selected, onChange}: CategoryFilterProps) => (
    <select
    value={selected}
    onChange={(e) => onChange(e.target.value)}
        className="w-56 border-b border-slate-300 bg-transparent px-2 py-1 text-xs uppercase tracking-[0.2em] text-slate-500 focus:outline-none"
    >
        <option value="">Alla kategorier</option>
        {categories.map((c) => (
            <option key={c} value={c}>
                {c}
            </option>
        ))}
    </select>
);

export default CategoryFilter;