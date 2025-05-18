// تبدیل انگلیسی به فارسی
export const toPersian = (num: string | number): string => {
  return String(num).replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

// تبدیل فارسی به انگلیسی
export const toEnglish = (num: string): string => {
  return num.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
};

// اعتبارسنجی عدد
export const isNumber = (value: string): boolean => {
  return /^[۰-۹0-9]+$/.test(value);
};
export const calculatePersianNumbers = (num1: string, num2: string): string => {
  const enNum1 = Number(toEnglish(num1));
  const enNum2 = Number(toEnglish(num2));
  return ((toPersian((enNum1 * enNum2).toLocaleString())));
};