import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { CountryItem, PhoneCountrySelectProps } from "./types";
import { getCountryList } from "./utils";

const buildKey = (c: CountryItem) => `${c.code ?? c.name}-${c.callingCodes}`;

export const PhoneCountrySelect = ({
  value,
  onValueChange,
  countries,
  searchPlaceholder = "Search country...",
  emptyText = "No country found",
  selectPlaceholder = "Select country",
  className,
  disabled = false,
}: PhoneCountrySelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const countryList = useMemo(() => getCountryList(countries), [countries]);

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const filtered = useMemo(() => {
    if (!search.trim()) return countryList;
    const q = search.toLowerCase().trim();
    return countryList.filter(
      (c) =>
        c.text?.toLowerCase().includes(q) ||
        c.name?.toLowerCase().includes(q) ||
        c.callingCodes?.includes(q) ||
        c.code?.toLowerCase().includes(q),
    );
  }, [search, countryList]);

  const selected = useMemo(
    () => countryList.find((c) => c.callingCodes === value),
    [value, countryList],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={selected ? `${selected.text} ${selected.callingCodes}` : selectPlaceholder}
          disabled={disabled}
          className={[
            "pcs-trigger",
            disabled ? "pcs-trigger--disabled" : "",
            className ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {selected ? (
            <span className="pcs-trigger__selected">
              <span className="pcs-trigger__flag">{selected.map}</span>
              <span className="pcs-trigger__code">{selected.callingCodes}</span>
            </span>
          ) : (
            <span className="pcs-trigger__placeholder">{selectPlaceholder}</span>
          )}
          <ChevronsUpDown className="pcs-trigger__chevron" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="pcs-popover"
        align="start"
        sideOffset={4}
      >
        <Command shouldFilter={false} className="pcs-command">
          <div className="pcs-search-wrapper">
            <Search className="pcs-search-icon" />
            <Command.Input
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={setSearch}
              className="pcs-search-input"
            />
          </div>
          <Command.List id="pcs-country-list" className="pcs-list">
            {filtered.length === 0 && (
              <Command.Empty className="pcs-empty">{emptyText}</Command.Empty>
            )}
            <Command.Group>
              {filtered.map((country) => (
                <Command.Item
                  key={buildKey(country)}
                  value={buildKey(country)}
                  onSelect={() => {
                    onValueChange(country.callingCodes);
                    setOpen(false);
                  }}
                  className="pcs-item"
                >
                  <span className="pcs-item__flag">{country.map}</span>
                  <span className="pcs-item__name">{country.text}</span>
                  <span className="pcs-item__code">{country.callingCodes}</span>
                  {value === country.callingCodes && (
                    <Check className="pcs-item__check" />
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
