import countriesData from "./countries.json";
import type { CountryItem } from "./types";

const PHONE_MAX_DIGITS: Record<string, number> = {
  BJ: 8, SN: 9, CI: 10, CM: 9, BF: 8, NG: 10, NE: 8, GA: 7, ML: 8,
  GN: 9, ZA: 9, DZ: 9, KE: 10, FR: 9, MY: 10, HT: 8, IT: 10, MX: 10,
  EG: 10, IL: 9, AE: 9, TR: 10, TZ: 9, TD: 8, TG: 8, GH: 9, MA: 9,
  TN: 8, CG: 9, CD: 9, MG: 10, RW: 9, BI: 8, ET: 9, UG: 9, ZM: 9,
  ZW: 9, MZ: 9, AO: 9, NA: 9, MW: 9, LS: 8, SZ: 8, BW: 8, MU: 8,
  SC: 7, KM: 7, DJ: 8, SO: 8, ER: 7, SS: 9, SD: 9, LR: 9, SL: 8,
  GW: 7, GQ: 9, CF: 8, ST: 7, CV: 7, MR: 8, LY: 10, GB: 10, DE: 11,
  ES: 9, PT: 9, BE: 9, CH: 9, NL: 9, AT: 10, SE: 10, NO: 8, DK: 8,
  FI: 10, PL: 9, RO: 10, HU: 9, GR: 10, IE: 9, LU: 9, MC: 8,
  US: 10, CA: 10, BR: 11, AR: 10, CO: 10, PE: 9, CL: 9, EC: 9,
  VE: 10, UY: 8, PY: 9, BO: 8, CR: 8, PA: 8, DO: 10, JM: 7, CU: 8,
  NI: 8, HN: 8, SV: 8, GT: 8, BZ: 7, IN: 10, PK: 10, BD: 10,
  LK: 9, NP: 10, JP: 10, KR: 10, CN: 11, TH: 9, VN: 10, PH: 10,
  ID: 12, MM: 10, KH: 9, LA: 10, SG: 8, BN: 7, TW: 9, HK: 8, MN: 8,
  AU: 9, NZ: 9, FJ: 7, SA: 9, QA: 8, KW: 8, BH: 8, OM: 8, JO: 9,
  LB: 8, IQ: 10, IR: 10, AF: 9, GE: 9, AM: 8, AZ: 9, KZ: 10,
  UZ: 9, TJ: 9, KG: 9, TM: 8, UA: 9, BY: 9, MD: 8, RU: 10, RS: 9,
  HR: 9, BA: 8, ME: 8, AL: 9, MK: 8, SI: 8, SK: 9, BG: 9, LT: 8,
  LV: 8, EE: 8, CY: 8, MT: 8, IS: 7, LI: 7, SM: 10, AD: 6, TT: 7,
  BB: 7, AG: 7, LC: 7, VC: 7, GD: 7, DM: 7, KN: 7, GY: 7, SR: 7,
};

const DEFAULT_MAX_DIGITS = 10;
const MIN_DIGITS = 6;

export const getPhoneMaxDigits = (countryCode?: string): number => {
  if (!countryCode) return DEFAULT_MAX_DIGITS;
  return PHONE_MAX_DIGITS[countryCode] ?? DEFAULT_MAX_DIGITS;
};

export const getPhoneMinDigits = (): number => MIN_DIGITS;

let _cachedList: CountryItem[] | null = null;

export const getCountryList = (custom?: CountryItem[]): CountryItem[] => {
  if (custom) return custom;
  if (_cachedList) return _cachedList;
  _cachedList = (countriesData as CountryItem[]).filter(
    (p) => p.callingCodes && p.callingCodes.trim() !== "",
  );
  return _cachedList;
};

export const findCountryByCallingCode = (
  callingCode: string,
  countries?: CountryItem[],
): CountryItem | undefined =>
  getCountryList(countries).find((p) => p.callingCodes === callingCode);

export const findCountryByCode = (
  code: string,
  countries?: CountryItem[],
): CountryItem | undefined =>
  getCountryList(countries).find((p) => p.code === code);

export const parseFullPhoneNumber = (
  fullNumber: string,
  countries?: CountryItem[],
): { callingCode: string; localNumber: string } | null => {
  if (!fullNumber?.startsWith("+")) return null;

  const list = getCountryList(countries);
  const sorted = [...list].sort(
    (a, b) => b.callingCodes.length - a.callingCodes.length,
  );

  for (const country of sorted) {
    if (fullNumber.startsWith(country.callingCodes)) {
      return {
        callingCode: country.callingCodes,
        localNumber: fullNumber.slice(country.callingCodes.length),
      };
    }
  }

  return null;
};

export const buildFullPhoneNumber = (
  callingCode: string,
  localNumber: string,
): string => {
  const digits = localNumber.replace(/\D/g, "");
  return digits ? `${callingCode}${digits}` : "";
};

export const validatePhoneNumber = (
  localNumber: string,
  countryCode?: string,
): { valid: boolean; error?: "too_short" | "too_long" } => {
  const digits = localNumber.replace(/\D/g, "");
  if (!digits) return { valid: true };
  if (digits.length < MIN_DIGITS) return { valid: false, error: "too_short" };
  const max = getPhoneMaxDigits(countryCode);
  if (digits.length > max) return { valid: false, error: "too_long" };
  return { valid: true };
};

export const clampPhoneDigits = (
  input: string,
  countryCode?: string,
): string => {
  const digits = input.replace(/\D/g, "");
  const max = getPhoneMaxDigits(countryCode);
  return digits.slice(0, max);
};
