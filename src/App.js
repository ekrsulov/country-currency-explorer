import React from "react";
import { countries } from "countries-list";
import { useI18n } from "@shopify/react-i18n";
import { useCookies } from "react-cookie";
import Select from "react-select";
import symbol from "@brixtol/currency-symbols";

import "./styles.css";
import "country-flag-icons/3x2/flags.css";

const cc = require("currency-codes");
const langmap = require("langmap");

const allCountries = Object.keys(countries)
  .filter((k) => k !== "AQ")
  .map((k) => ({ ...countries[k], iso: k }))
  .sort((a, b) => a.name.localeCompare(b.name));

const allLangs = Object.keys(langmap);

const options = allLangs.map((k) => ({
  value: k,
  label:
    "" + k + ": " + langmap[k]["englishName"] + " — " + langmap[k]["nativeName"]
}));

export default function App() {
  const [i18n] = useI18n();
  const [cookies, setCookie] = useCookies(["name"]);

  function onChange(e) {
    setCookie("name", e.value, { path: "/" });
    window.location.reload(false);
  }

  i18n.locale = cookies.name;

  return (
    <>
      <Select onChange={onChange} options={options} />
      <center>
        <table border="1" className="styled-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Country</th>
              <th>Iso</th>
              <th>Country data</th>
              <th>Currency</th>
              <th>Currency data</th>
              <th>Symbol</th>
              <th>Sample short</th>
              <th>Sample explicit</th>
            </tr>
          </thead>
          <tbody>
            {allCountries.map((k, n) => (
              <tr>
                <td>
                  <div className={"flag:" + k.iso} />
                </td>
                <td>{k.name}</td>
                <td>{k.iso}</td>
                <td>
                  <pre>{JSON.stringify(k, null, 2)}</pre>
                </td>{" "}
                <td>
                  {k.currency.split(",").map((k) => (
                    <div>{k}</div>
                  ))}
                </td>
                <td>
                  {k.currency.split(",").map((c) => (
                    <pre>{JSON.stringify(cc.code(c), null, 2)}</pre>
                  ))}
                </td>{" "}
                <td>
                  {k.currency.split(",").map((c) => (
                    <div>{symbol(c)}</div>
                  ))}
                </td>{" "}
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
                </td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </>
  );
}
