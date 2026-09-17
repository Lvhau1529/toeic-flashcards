/**
 * Removes Vietnamese diacritics / accent marks and converts to lowercase
 * Example: "Lái xe" -> "lai xe", "Đẩy" -> "day"
 */
export const removeVietnameseTones = (str: string): string => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
};

/**
 * Checks if search keyword matches any of the target strings (case-insensitive & accent-insensitive)
 */
export const matchesSearch = (
  keyword: string,
  ...targets: (string | undefined)[]
): boolean => {
  const cleanKeyword = removeVietnameseTones(keyword);
  if (!cleanKeyword) return true;

  return targets.some((target) => {
    if (!target) return false;
    const cleanTarget = removeVietnameseTones(target);
    return cleanTarget.includes(cleanKeyword);
  });
};
