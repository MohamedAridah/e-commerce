import FiltersSheet, { FilterCategories, FilterHeader } from "./filters-sheet";

export default function Filters() {
  return (
    <>
      <FiltersSheet />

      <aside className="sticky top-20  h-fit min-w-60 rounded-lg border border-light-300 bg-light-100 p-4 hidden md:block">
        <FilterHeader />
        <FilterCategories />
      </aside>
    </>
  );
}
