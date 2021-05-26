import type { FontObjectV1, FontObjectV2 } from "./index";

type FontObject = FontObjectV1 | FontObjectV2;

// Alphabetically order the generated font object lists
export const orderObject = (unordered: FontObject): FontObject => {
  const ordered: FontObject = {};
  const orderedKeys = Object.keys(unordered).sort();

  for (const key of orderedKeys) {
    ordered[key] = unordered[key];
  }

  return ordered;
};

// Convert APIResponse.variants into a weights number[]
export const weightListGen = (variants: string[]): number[] => {
  // Replace regular and italic with numeric values
  const replacedList = variants.map(variant => {
    if (variant === "regular" || variant === "italic") {
      return "400";
    }
    return variant;
  });
  // Remove variants like 700italic to become 700
  const cleanedList = replacedList.map(variant =>
    variant.replace(/italic/g, "")
  );

  // Convert from string to number
  const numberList = cleanedList.map(variant => Number(variant));
  const numberListWithoutDuplicates = [...new Set(numberList)];

  return numberListWithoutDuplicates;
};