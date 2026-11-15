export function rangesOverlap(left, right) {
  return left.start < right.start + right.weeks &&
    right.start < left.start + left.weeks;
}

export function hasLtgOverlap(items, candidate, ignoredIds = new Set([candidate.id])) {
  if (candidate.type !== "ltg") return false;

  return items.some((item) =>
    item.type === "ltg" &&
    !ignoredIds.has(item.id) &&
    rangesOverlap(item, candidate),
  );
}
