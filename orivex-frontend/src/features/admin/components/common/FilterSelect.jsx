import { memo } from "react";

function FilterSelect({
  value,
  onChange,
  children,
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
    >
      {children}
    </select>
  );
}

export default memo(FilterSelect);