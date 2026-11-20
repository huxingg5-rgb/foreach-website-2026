"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FlangedTubingConfigurator from "@/components/products/configurator/FlangedTubingConfigurator";
import FlangedTubingDrawingDialog from "@/components/products/tubing-assemblies/FlangedTubingDrawingDialog";
import {
  FLANGED_CONFIGURATION_STORAGE_KEY,
  parseFlangedConfigurationStore,
  saveFlangedConfiguration,
  type FlangedConfiguration,
} from "@/data/products/configurator/flanged-tubing-configurations";
import {
  defaultAssemblyChoice,
  normalizeFlangedChoice,
  selectAssemblyEndAttribute,
  type FlangedTubingChoice,
} from "@/data/products/configurator/flanged-tubing";
import { assemblyText } from "@/data/products/configurator/tubing-assembly.intl";
import { getAssemblyTube } from "@/data/products/configurator/tubing-assembly-catalog";
import type { CadDrawingType } from "@/data/products/detail/drawing-requirements";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

const example = defaultAssemblyChoice("flanged-tubing-fep");
const exampleChoice: FlangedTubingChoice = {
  ...example,
  length: "250",
  b: selectAssemblyEndAttribute(example.b, "thread", "M6×1", getAssemblyTube(example.tubeModel)!.outer),
};

const draftKey = "foreach:tubing-assembly-article-draft:v1";
type Draft = { choice: FlangedTubingChoice; name: string | null };

function loadDraft(): Draft {
  try {
    const raw = sessionStorage.getItem(draftKey);
    if (raw) {
      const draft: Draft = JSON.parse(raw);
      if ((draft.name === null || typeof draft.name === "string") && getAssemblyTube(draft.choice.tubeModel)) {
        // Check that the saved fields still match the current form schema.
        normalizeFlangedChoice(draft.choice);
        return draft;
      }
    }
  } catch {
    // Unavailable storage or an old draft should still open the example.
  }
  return { choice: exampleChoice, name: null };
}

export default function TubingAssemblyArticleConfigurator({ locale }: { locale: TechnicalArticleLocale }) {
  const savedRecord = useRef<FlangedConfiguration | null>(null);
  const draft = useRef<Draft>({ choice: exampleChoice, name: null });
  const [initialChoice, setInitialChoice] = useState<FlangedTubingChoice | null>(null);
  const [customName, setCustomName] = useState<string | null>(null);
  const [drawing, setDrawing] = useState<FlangedConfiguration | null>(null);
  const [error, setError] = useState("");
  const [savedRevision, setSavedRevision] = useState<number | null>(null);
  const name = customName ?? assemblyText("FEP 双端管组件示例", locale);

  useEffect(() => {
    draft.current = loadDraft();
    setCustomName(draft.current.name);
    setInitialChoice(draft.current.choice);
  }, []);

  const storeDraft = useCallback((next: Draft) => {
    draft.current = next;
    try {
      sessionStorage.setItem(draftKey, JSON.stringify(next));
    } catch {
      // Draft storage is optional. The controls still work in this tab.
    }
  }, []);

  const updateChoice = useCallback((choice: FlangedTubingChoice) => {
    storeDraft({ ...draft.current, choice });
  }, [storeDraft]);

  function save(choice: FlangedTubingChoice, drawingTypes: CadDrawingType[]) {
    setError("");
    try {
      const latest = parseFlangedConfigurationStore(localStorage.getItem(FLANGED_CONFIGURATION_STORAGE_KEY));
      const previous = savedRecord.current;
      if (previous && latest.configurations.find(item => item.id === previous.id)?.revision !== previous.revision) {
        throw new Error("此配置已在其他页面更新或删除。请刷新文章后保存新配置。");
      }
      const { store, record } = saveFlangedConfiguration(latest, choice, name, previous?.id ?? null, undefined, undefined, drawingTypes);
      localStorage.setItem(FLANGED_CONFIGURATION_STORAGE_KEY, JSON.stringify(store));
      savedRecord.current = record;
      setSavedRevision(record.revision);
      return record;
    } catch (cause) {
      const message = cause instanceof Error && !(cause instanceof DOMException || cause instanceof SyntaxError)
        ? cause.message : "配置保存失败，请检查浏览器存储权限或可用空间。";
      setError(assemblyText(message, locale));
      return null;
    }
  }

  return (
    <div id="online-configurator" data-article-tubing-configurator style={{ scrollMarginTop: "calc(var(--site-header-height, 90px) + 16px)" }}>
      {initialChoice && <FlangedTubingConfigurator
        inline
        locale={locale}
        value={initialChoice}
        needDrawing={false}
        configurationName={name}
        onNameChange={nextName => {
          setCustomName(nextName);
          storeDraft({ ...draft.current, name: nextName });
        }}
        onChoiceChange={updateChoice}
        saveError={error}
        saveStatus={savedRevision === null ? undefined : assemblyText(`最近保存版本 R${savedRevision}`, locale)}
        onConfirm={save}
        onGenerateDrawing={(choice, drawingTypes) => {
          const record = save(choice, drawingTypes);
          if (record) setDrawing(record);
        }}
      />}
      {drawing && (
        <FlangedTubingDrawingDialog
          locale={locale}
          record={drawing}
          onClose={() => setDrawing(null)}
          sourceSection="tubing_assembly_configurator_article"
        />
      )}
    </div>
  );
}
