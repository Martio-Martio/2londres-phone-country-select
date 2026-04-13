import { useMemo } from "react";
import { PhoneCountrySelect } from "./PhoneCountrySelect";
import type { PhoneInputProps } from "./types";
import { clampPhoneDigits, findCountryByCallingCode, getPhoneMaxDigits } from "./utils";

export const PhoneInput = ({
  callingCode,
  onCallingCodeChange,
  phoneNumber,
  onPhoneNumberChange,
  countries,
  phonePlaceholder = "Phone number",
  searchPlaceholder,
  emptyText,
  selectPlaceholder,
  error,
  className,
  disabled = false,
}: PhoneInputProps) => {
  const selectedCountry = useMemo(
    () => findCountryByCallingCode(callingCode, countries),
    [callingCode, countries],
  );
  const maxDigits = getPhoneMaxDigits(selectedCountry?.code);

  return (
    <div className={["pcs-phone-input", className].filter(Boolean).join(" ")}>
      <div className="pcs-phone-input__row">
        <PhoneCountrySelect
          value={callingCode}
          onValueChange={onCallingCodeChange}
          countries={countries}
          searchPlaceholder={searchPlaceholder}
          emptyText={emptyText}
          selectPlaceholder={selectPlaceholder}
          disabled={disabled}
        />
        <input
          type="tel"
          value={phoneNumber}
          maxLength={maxDigits}
          placeholder={phonePlaceholder}
          disabled={disabled}
          onChange={(e) => {
            onPhoneNumberChange(clampPhoneDigits(e.target.value, selectedCountry?.code));
          }}
          className={[
            "pcs-phone-input__input",
            error ? "pcs-phone-input__input--error" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </div>
      {error && <p className="pcs-phone-input__error">{error}</p>}
      <p className="pcs-phone-input__hint">
        {phoneNumber
          ? `${phoneNumber.length}/${maxDigits}`
          : `Max. ${maxDigits}`}
      </p>
    </div>
  );
};
