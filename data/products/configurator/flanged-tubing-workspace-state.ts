import { defaultAssemblyChoice, type FlangedTubingChoice } from "./flanged-tubing";
import { assemblyChoiceMatchesEntry } from "./tubing-assembly-entry";
import { assemblyText } from "./tubing-assembly.intl";
import { emptyFlangedConfigurationStore, parseFlangedConfigurationStore, type FlangedConfiguration, type FlangedConfigurationStore } from "./flanged-tubing-configurations";

export type FlangedWorkspaceEditor = {
  record: FlangedConfiguration | null;
  choice: FlangedTubingChoice | null;
  name: string;
};

/** Reading a saved snapshot must never repair, replace or write browser data. */
export function readFlangedWorkspace(read: () => string | null): { store: FlangedConfigurationStore; error: string } {
  try {
    return { store: parseFlangedConfigurationStore(read()), error: "" };
  } catch {
    return { store: emptyFlangedConfigurationStore(), error: "已保存配置读取失败，请检查浏览器存储权限。原数据未被覆盖。" };
  }
}

export function flangedWorkspaceRequest(store: FlangedConfigurationStore, entrySlug: string, requestDrawing: boolean, locale: string): {
  editor: FlangedWorkspaceEditor | null;
  drawing: FlangedConfiguration | null;
} {
  const active = store.configurations.find(record => record.id === store.activeId);
  if (requestDrawing && active && assemblyChoiceMatchesEntry(active.choice, entrySlug)) {
    return { editor: null, drawing: active };
  }
  // A product-page request starts a new configuration. Only the saved card's
  // explicit edit action may update an existing record and its revision.
  return {
    editor: { record: null, choice: defaultAssemblyChoice(entrySlug), name: `${assemblyText("配置", locale)} ${store.nextNumber}` },
    drawing: null,
  };
}
