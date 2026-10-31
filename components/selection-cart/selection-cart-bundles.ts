import { HFL_PILOT_WASHERS, HFL_WASHER_PILOT, getHflPilotWasher, isHflPilotWasherCartItem, type HflWasherChoice } from "@/data/products/configurator/hfl-m6-16-washers";
import type { SelectionCartItem, SelectionCartItemInput } from "./selection-cart.types";
import { getHardTubeAccessory, isHardTubeAccessoryCartItem, normalizeHardTubeDetailHref, type HardTubeAccessoryConfig, type HardTubeAccessoryChoice } from "@/data/products/configurator/hard-tube-accessories";

export type SelectionCartGroup = {
  id: string;
  primary: SelectionCartItem;
  accessories: SelectionCartItem[];
  items: SelectionCartItem[];
};

export function createCartBundle(primary: SelectionCartItemInput, accessories: SelectionCartItemInput[]): SelectionCartItem[] {
  const orderedAccessories = [...accessories].sort((a, b) => `${a.sourceType}:${a.productCode}`.localeCompare(`${b.sourceType}:${b.productCode}`));
  const parts = [primary, ...orderedAccessories];
  const bundleId = `bundle:${parts.map(item => `${item.sourceType}:${item.productCode}`).join("|")}`;
  const quantity = Math.max(1, Number(primary.quantity || 1));
  return parts.map((item, index) => ({
    ...item,
    id: `${bundleId}:${index}`,
    bundleId,
    bundleRole: index === 0 ? "primary" : "accessory",
    quantity,
  }));
}

export function getCartGroups(items: SelectionCartItem[]): SelectionCartGroup[] {
  const bundles = new Map<string, SelectionCartItem[]>();
  for (const item of items) {
    if (item.bundleId) bundles.set(item.bundleId, [...(bundles.get(item.bundleId) || []), item]);
  }
  const seen = new Set<string>();
  return items.flatMap(item => {
    const parts = item.bundleId ? bundles.get(item.bundleId) || [] : [];
    const primaries = parts.filter(part => part.bundleRole === "primary");
    const accessories = parts.filter(part => part.bundleRole === "accessory");
    if (!item.bundleId || primaries.length !== 1 || !accessories.length || parts.length !== accessories.length + 1) {
      return [{ id: item.id, primary: item, accessories: [], items: [item] }];
    }
    if (seen.has(item.bundleId)) return [];
    seen.add(item.bundleId);
    return [{ id: item.bundleId, primary: primaries[0], accessories, items: [primaries[0], ...accessories] }];
  });
}

export function getCartGroupMemberIds(items: SelectionCartItem[], id: string) {
  return new Set(getCartGroups(items).find(group => group.items.some(item => item.id === id))?.items.map(item => item.id) || []);
}

export function changeCartGroupQuantity(items: SelectionCartItem[], id: string, quantity: number) {
  const ids = getCartGroupMemberIds(items, id);
  return items.map(item => ids.has(item.id) ? { ...item, quantity: Math.max(1, Number(quantity || 1)) } : item);
}

export function changeCartGroupDrawing(items: SelectionCartItem[], id: string, needDrawing: boolean) {
  const ids = getCartGroupMemberIds(items, id);
  return items.map(item => ids.has(item.id) ? { ...item, needDrawing } : item);
}

export function findHardTubeCartBundle(items: SelectionCartItem[], config: HardTubeAccessoryConfig, choice: HardTubeAccessoryChoice) {
  const accessory = getHardTubeAccessory(config, choice);
  if (!accessory) return undefined;
  return getCartGroups(items).find(group => group.primary.sourceType === "pump-selection"
    && group.primary.productCode === config.productCode && group.primary.foreachModel === config.model
    && group.accessories.length === 1 && group.accessories[0].productCode === accessory.productCode
    && normalizeHardTubeDetailHref(group.accessories[0].detailHref) === normalizeHardTubeDetailHref(config.detailHref) && isHardTubeAccessoryCartItem(group.accessories[0]));
}

export function getHardTubeSelectionSummary(items: SelectionCartItem[], config: HardTubeAccessoryConfig, currentChoice: HardTubeAccessoryChoice | null) {
  const choices = new Set<HardTubeAccessoryChoice>();
  for (const group of getCartGroups(items)) {
    if (group.primary.sourceType !== "pump-selection" || group.primary.productCode !== config.productCode || group.primary.foreachModel !== config.model) continue;
    if (!group.primary.bundleId) choices.add("none");
    for (const item of group.accessories) {
      if (normalizeHardTubeDetailHref(item.detailHref) === normalizeHardTubeDetailHref(config.detailHref) && isHardTubeAccessoryCartItem(item) && getHardTubeAccessory(config, item.productCode)) choices.add(item.productCode);
    }
  }
  if (currentChoice === "none" || getHardTubeAccessory(config, currentChoice)) choices.add(currentChoice!);
  return [...choices];
}

export function findHflCartBundle(items: SelectionCartItem[], washerCodes: readonly string[]) {
  const codes = new Set(washerCodes);
  if (!codes.size) return undefined;
  return getCartGroups(items).find(group =>
    group.primary.sourceType === "pump-selection"
    && group.primary.productCode === HFL_WASHER_PILOT.productCode
    && group.primary.foreachModel === HFL_WASHER_PILOT.model
    && group.accessories.length === codes.size
    && new Set(group.accessories.map(item => item.productCode)).size === codes.size
    && group.accessories.every(item => codes.has(item.productCode) && isHflPilotWasherCartItem(item)));
}

// Show saved configurations alongside the current confirmed choice. Cart entries
// keep earlier choices visible after selecting another material or reloading.
export function getHflSelectionSummary(items: SelectionCartItem[], currentChoice: HflWasherChoice | null): HflWasherChoice[] {
  const choices = new Set<HflWasherChoice>();
  for (const group of getCartGroups(items)) {
    if (group.primary.sourceType !== "pump-selection"
      || group.primary.productCode !== HFL_WASHER_PILOT.productCode
      || group.primary.foreachModel !== HFL_WASHER_PILOT.model) continue;
    if (!group.primary.bundleId) {
      choices.add("none");
      continue;
    }
    for (const accessory of group.accessories) {
      if (!isHflPilotWasherCartItem(accessory)) continue;
      const washer = HFL_PILOT_WASHERS.find(item => item.productCode === accessory.productCode);
      if (washer) choices.add(washer.productCode);
    }
  }
  if (currentChoice !== null && (currentChoice === "none" || getHflPilotWasher(currentChoice))) choices.add(currentChoice);
  return [...choices];
}

// Upgrade the unambiguous old pilot pair. Preserve quantities by keeping any
// unmatched remainder as a separate item; never guess among multiple washers.
export function migrateLegacyHflBundle(items: SelectionCartItem[]): SelectionCartItem[] {
  const primaries = items.filter(item => !item.bundleId && item.sourceType === "pump-selection"
    && item.productCode === HFL_WASHER_PILOT.productCode && item.foreachModel === HFL_WASHER_PILOT.model);
  const washers = items.filter(item => !item.bundleId && isHflPilotWasherCartItem(item));
  if (primaries.length !== 1 || washers.length !== 1) return items;
  const [primary] = primaries;
  const [washer] = washers;
  const quantity = Math.min(primary.quantity, washer.quantity);
  const bundle = createCartBundle({ ...primary, quantity }, [washer]);
  if (items.some(item => item.bundleId === bundle[0].bundleId)) return items;
  let inserted = false;
  return items.flatMap(item => {
    if (item.id !== primary.id && item.id !== washer.id) return [item];
    const next = inserted ? [] : bundle;
    inserted = true;
    return item.quantity > quantity ? [...next, { ...item, quantity: item.quantity - quantity }] : next;
  });
}
