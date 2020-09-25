import React from "react";
import { countries } from "countries-list";
import Dinero from "dinero.js";
import currencyToName from "@piotrgorecki/i18n-currency-name";
import symbol from "@brixtol/currency-symbols";
import "./styles.css";
import "country-flag-icons/3x2/flags.css";
import { useI18n } from "@shopify/react-i18n";

const cc = require("currency-codes");
const langmap = require("langmap");

const allCountries = Object.keys(countries)
  .filter((k) => k !== "AQ")
  .map((k) => ({ ...countries[k], iso: k }))
  .sort((a, b) => a.name.localeCompare(b.name));

const allLangs = Object.keys(langmap);

let locales = [
  "da",
  "de",
  "el",
  "en",
  "es",
  "fi",
  "fr",
  "it",
  "ja",
  "ko",
  "lt",
  "pl",
  "pt",
  "ro",
  "sv",
  "tr",
  "ua",
  "ur",
  "zh"
];

export default function App() {
  const [i18n] = useI18n();
  i18n.locale = "hi";

  return (
    <>
      <select onChange={(e) => (i18n.locale = e.target.value)}>
        {allLangs.map((k) => (
          <option value={k}>
            {"" + langmap[k]["englishName"] + " " + langmap[k]["nativeName"]}
          </option>
        ))}
      </select>

      <table border="1">
        <thead>
          <tr>
            <th>Simple</th>
            <th>Explicit</th>
            <th>Country</th>
            <th>Name</th>
            <th>Iso</th>
            <th>emoji</th>
            <th>Currency</th>
            <th>Flag</th>
            <th>Dinero</th>
            <th>Symbol</th>
            {locales.map((l) => (
              <th>{l}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allCountries.map((k) => (
            <tr>
              <td>
                {k.currency.split(",").map((c) => (
                  <div>
                    {i18n.formatCurrency(123456789, {
                      currency: c,
                      form: "short"
                    })}
                  </div>
                ))}
              </td>
              <td>
                {k.currency.split(",").map((c) => (
                  <div>
                    {i18n.formatCurrency(123456789, {
                      currency: c,
                      form: "explicit"
                    })}
                  </div>
                ))}
              </td>
              <td>
                <pre>{JSON.stringify(k, null, 2)}</pre>
              </td>
              <td>{k.name}</td>
              <td>({k.iso})</td>
              <td>{k.emoji}</td>
              <td>
                {k.currency.split(",").map((k) => (
                  <div>{k}</div>
                ))}
              </td>
              <td>
                <div className={"flag:" + k.iso} />
              </td>
              <td>
                {k.currency.split(",").map((c) => (
                  <pre>{JSON.stringify(cc.code(c), null, 2)}</pre>
                ))}
              </td>
              <td>
                {k.currency.split(",").map((c) => (
                  <div>
                    {Dinero({ amount: 123456789, currency: c }).toFormat()}
                  </div>
                ))}
              </td>{" "}
              <td>
                {k.currency.split(",").map((c) => (
                  <div>{symbol(c)}</div>
                ))}
              </td>
              {locales.map((l) => (
                <td>
                  {k.currency.split(",").map((c) => (
                    <div>{currencyToName(c, l)}</div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
