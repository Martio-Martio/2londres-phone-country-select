# @klemi/phone-country-select

Searchable phone country code selector with per-country digit validation for React.

- Searchable combobox (by country name, ISO code, or calling code)
- Built-in phone number length validation per country (ITU-T E.164)
- 200+ countries with flags, calling codes, and local names
- Headless-friendly: BYO styles or use the included CSS
- Tree-shakeable ESM + CJS builds
- Zero i18n dependency — pass your own labels

## Install

```bash
pnpm add @klemi/phone-country-select
# or
npm install @klemi/phone-country-select
```

## Quick start

### PhoneCountrySelect (standalone selector)

```tsx
import { PhoneCountrySelect } from "@klemi/phone-country-select";
import "@klemi/phone-country-select/styles.css";
import { useState } from "react";

export function MyForm() {
  const [code, setCode] = useState("+229");

  return (
    <PhoneCountrySelect
      value={code}
      onValueChange={setCode}
      searchPlaceholder="Search country..."
      emptyText="No country found"
    />
  );
}
```

### PhoneInput (selector + input with validation)

```tsx
import { PhoneInput, validatePhoneNumber, buildFullPhoneNumber, findCountryByCallingCode } from "@klemi/phone-country-select";
import "@klemi/phone-country-select/styles.css";
import { useState } from "react";

export function MyPhoneField() {
  const [callingCode, setCallingCode] = useState("+33");
  const [phone, setPhone] = useState("");

  const country = findCountryByCallingCode(callingCode);
  const { valid, error } = validatePhoneNumber(phone, country?.code);

  const handleSubmit = () => {
    const fullNumber = buildFullPhoneNumber(callingCode, phone);
    console.log(fullNumber); // "+33612345678"
  };

  return (
    <div>
      <PhoneInput
        callingCode={callingCode}
        onCallingCodeChange={setCallingCode}
        phoneNumber={phone}
        onPhoneNumberChange={setPhone}
        error={!valid ? (error === "too_short" ? "Too short" : "Too long") : undefined}
      />
      <button onClick={handleSubmit} disabled={!valid || !phone}>Save</button>
    </div>
  );
}
```

## Utilities

| Function | Description |
|---|---|
| `getCountryList()` | Returns filtered list of countries |
| `findCountryByCallingCode(code)` | Find country by calling code |
| `findCountryByCode(iso)` | Find country by ISO code |
| `parseFullPhoneNumber("+22912345678")` | Parse into `{ callingCode, localNumber }` |
| `buildFullPhoneNumber(code, local)` | Combine calling code + local digits |
| `validatePhoneNumber(local, iso?)` | Validate digit count for country |
| `getPhoneMaxDigits(iso?)` | Get max local digits for country |
| `getPhoneMinDigits()` | Get min digits (6) |
| `clampPhoneDigits(input, iso?)` | Strip non-digits & clamp to max |

## Styling

Import `@klemi/phone-country-select/styles.css` for default styles, or target the `pcs-*` CSS classes for custom styling.

## License

MIT
