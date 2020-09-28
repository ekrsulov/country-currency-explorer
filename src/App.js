import React, { useState } from "react";
import { countries } from "countries-list";
import symbol from "@brixtol/currency-symbols";
import { PreciseMoney, Currency, IntlMoneyFormatter } from "@cashmoney/core";
import Switch from "react-switch";

import "./styles.css";
import "country-flag-icons/3x2/flags.css";

const cc = require("currency-codes");

const allCountries = Object.keys(countries)
  .filter((k) => k !== "AQ")
  .map((k) => ({ ...countries[k], iso: k }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function App() {
  const [showData, setShowData] = useState(false);

  const handleChange = (checked) => {
    setShowData(checked);
  };

  return (
    <>
      <center>
        <h2>
          Show Data <Switch onChange={handleChange} checked={showData} />
        </h2>
        <table border="1" className="styled-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Country</th>
              <th>Iso</th>
              <th>Continent</th>
              <th>Locale</th>
              {showData && <th>Country data</th>}
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {allCountries.map((k, n) => {
              let array = ["es"];
              if (array.includes(k.languages[0]))
                return (
                  <tr>
                    <td>
                      <span className={"flag:" + k.iso} />
                    </td>
                    <td>{k.name}</td>
                    <td>{k.iso}</td>
                    <td>{k.continent}</td>
                    <td>
                      {k.languages[0]}-{k.iso}
                    </td>
                    {showData && (
                      <td>
                        <pre>{JSON.stringify(k, null, 2)}</pre>
                      </td>
                    )}
                    <td>
                      <table>
                        {k.currency.split(",").map((c, i) => {
                          let currency = new Currency(c);
                          let money = new PreciseMoney(
                            1234567890.123456789,
                            currency
                          );
                          let formater = new IntlMoneyFormatter({
                            locales: k.languages[0] + "-" + k.iso,
                            style: "currency"
                          });
                          return (
                            <tr>
                              <td>
                                <div>{c}</div>
                              </td>
                              {showData && (
                                <td>
                                  <pre>
                                    {JSON.stringify(cc.code(c), null, 2)}
                                  </pre>
                                </td>
                              )}
                              <td>
                                <div>{symbol(c)}</div>
                              </td>
                              <td>
                                <div>{formater.format(money)}</div>
                              </td>
                            </tr>
                          );
                        })}
                      </table>
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </center>
    </>
  );
}
