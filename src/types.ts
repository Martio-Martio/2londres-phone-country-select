export interface CountryItem {
  name: string;
  callingCodes: string;
  text: string;
  map?: string;
  code?: string;
  currencyCodes?: string[];
  wikiDataId?: string;
}

export interface PhoneCountrySelectProps {
  /** Currently selected calling code (e.g. "+229") */
  value: string;
  /** Callback when a calling code is selected */
  onValueChange: (callingCode: string) => void;
  /** Override default country list */
  countries?: CountryItem[];
  /** Default country code to pre-select (ISO, e.g. "BJ") */
  defaultCountryCode?: string;
  /** Placeholder for search input */
  searchPlaceholder?: string;
  /** Text shown when no country matches the search */
  emptyText?: string;
  /** Placeholder shown when no country is selected */
  selectPlaceholder?: string;
  /** Additional class name on the trigger button */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface PhoneInputProps {
  /** Currently selected calling code (e.g. "+229") */
  callingCode: string;
  /** Callback when calling code changes */
  onCallingCodeChange: (callingCode: string) => void;
  /** Local phone number (digits only) */
  phoneNumber: string;
  /** Callback when phone number changes */
  onPhoneNumberChange: (phoneNumber: string) => void;
  /** Override default country list */
  countries?: CountryItem[];
  /** Default country code (ISO, e.g. "BJ") */
  defaultCountryCode?: string;
  /** Placeholder for phone input */
  phonePlaceholder?: string;
  /** Placeholder for search input */
  searchPlaceholder?: string;
  /** Text shown when no country matches */
  emptyText?: string;
  /** Placeholder shown when no country is selected */
  selectPlaceholder?: string;
  /** Error message to display */
  error?: string;
  /** Additional class name */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}
