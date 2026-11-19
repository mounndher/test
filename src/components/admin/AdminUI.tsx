import type { ReactNode } from "react";

/** Palette de l'administration (alignée sur la charte du site). */
export const admin = {
  bg: "bg-[#F7F5F0]",
  card: "bg-white border border-[#E3DED4]",
  ink: "text-[#111827]",
  muted: "text-[#6B6B66]",
  accent: "text-[#8C6D46]",
  btn: "inline-flex items-center justify-center gap-2 bg-[#111827] px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#F7F5F0] transition-colors hover:bg-[#1F2937]",
  btnGhost:
    "inline-flex items-center justify-center gap-2 border border-[#D8D2C6] px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#111827] transition-colors hover:border-[#8C6D46] hover:text-[#8C6D46]",
  btnDanger:
    "inline-flex items-center justify-center gap-2 border border-red-300 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-red-800 transition-colors hover:bg-red-50",
  input:
    "mt-1 w-full border border-[#D8D2C6] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition-colors focus:border-[#8C6D46]",
  label: "block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#6B6B66]",
} as const;

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`${admin.card} p-5 sm:p-6 ${className}`}>{children}</div>;
}

export function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E3DED4] pb-6">
      <div>
        <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${admin.accent}`}>
          Administration
        </p>
        <h1 className={`mt-1 font-display text-[1.9rem] leading-tight ${admin.ink}`}>{title}</h1>
        {subtitle && <p className={`mt-2 max-w-[70ch] text-sm leading-relaxed ${admin.muted}`}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
  required,
  hint,
  rows,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  rows?: number;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className={admin.label}>
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          required={required}
          className={admin.input}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          required={required}
          className={admin.input}
        />
      )}
      {hint && <p className="mt-1 text-xs text-[#6B6B66]">{hint}</p>}
    </div>
  );
}

export function Checkbox({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm text-[#111827]">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-[#111827]" />
      {label}
    </label>
  );
}

export function Select({
  label,
  name,
  value,
  options,
}: {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className={admin.label}>
        {label}
      </label>
      <select id={`f-${name}`} name={name} defaultValue={value} className={admin.input}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ImageSelect({
  label,
  name,
  value,
  options,
}: {
  label: string;
  name: string;
  value?: string | null;
  options: { id?: number; url: string; alt: string }[];
}) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className={admin.label}>
        {label}
      </label>
      <select id={`f-${name}`} name={name} defaultValue={value ?? ""} className={admin.input}>
        <option value="">— Aucune image —</option>
        {options.map((o) => (
          <option key={o.url} value={o.url}>
            {o.url} — {o.alt.slice(0, 48)}
          </option>
        ))}
      </select>
      {value && <p className="mt-1 text-xs text-[#6B6B66]">Image actuelle : {value}</p>}
    </div>
  );
}

export function Submit({ children = "Enregistrer", variant = "primary" }: { children?: ReactNode; variant?: "primary" | "ghost" | "danger" }) {
  const cls = variant === "danger" ? admin.btnDanger : variant === "ghost" ? admin.btnGhost : admin.btn;
  return (
    <button type="submit" className={cls}>
      {children}
    </button>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "warning" }) {
  const tones = {
    neutral: "border-[#D8D2C6] text-[#6B6B66]",
    success: "border-emerald-300 bg-emerald-50 text-emerald-800",
    warning: "border-amber-300 bg-amber-50 text-amber-900",
  } as const;
  return (
    <span className={`inline-flex items-center border px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className={`${admin.card} px-5 py-8 text-sm ${admin.muted}`}>{children}</p>;
}
