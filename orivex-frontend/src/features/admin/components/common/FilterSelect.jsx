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
      className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
    >
      {children}
    </select>
  );
}

export default memo(FilterSelect);