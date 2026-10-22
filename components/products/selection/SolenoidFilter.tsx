"use client";
import {useEffect} from "react";
const values = ["", "3-way", "2-way", "base", "barbed", "threaded"];
const labels = {
  zh: ["全部配置", "3通", "2通", "基板", "倒刺", "阀座"],
  en: ["All configurations", "3-way", "2-way", "Base-mount", "Barbed", "Threaded seat"],
  es: ["Todas las configuraciones", "3 vías", "2 vías", "Base", "Espiga", "Asiento roscado"],
  fr: ["Toutes les configurations", "3 voies", "2 voies", "Embase", "Cannelé", "Siège fileté"],
  ko: ["전체 구성", "3방향", "2방향", "베이스", "바브", "나사식 시트"],
  ru: ["Все конфигурации", "3-ходовые", "2-ходовые", "На плите", "Штуцеры", "Резьбовое основание"],
};
export default function SolenoidFilter({locale, value, onChange}: {locale: string; value: string; onChange: (v: string) => void}) {
  const text = labels[locale as keyof typeof labels] || labels.en;
  useEffect(() => {
    const sync = () => {const q = new URLSearchParams(window.location.search).get("solenoid") || "";onChange(values.includes(q) ? q : "");};
    sync();window.addEventListener("popstate", sync);
    return () => {window.removeEventListener("popstate", sync);onChange("");};
  }, [onChange]);
  function choose(v: string) {
    const url = new URL(window.location.href);if(v)url.searchParams.set("solenoid", v);else url.searchParams.delete("solenoid");
    window.history.replaceState(window.history.state, "", url);onChange(v);
  }
  return <nav aria-label={text[0]} data-solenoid-filter style={{display: "flex", flexWrap: "wrap", gap: 8, margin: "16px 0"}}>
    {values.map((v,i) => <button key={v} type="button" aria-pressed={value === v} onClick={() => choose(v)} style={{padding: "8px 14px", borderRadius: 8, border: "1px solid #dce3ed", cursor: "pointer", background: value === v ? "#173368" : "white", color: value === v ? "#09e9b4" : "#173368"}}>{text[i]}</button>)}
  </nav>;
}
