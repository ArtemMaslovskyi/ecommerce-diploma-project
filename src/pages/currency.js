import React, { useEffect, useState } from "react";

export default function Currencies() {
  const [currency, setCurrency] = useState({});
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);

  useEffect(() => {
    fetch("https://latest.currency-api.pages.dev/v1/currencies/eur.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCurrency(data);
        const defaultSelectedCurrencies = ["usd", "eur", "uah"].map((code) => ({
          code,
          rate: data.eur[code],
        }));
        setSelectedCurrencies(defaultSelectedCurrencies);
      })
      .catch((error) => {
        console.error("Помилка отримання даних про валюту:", error);
      });
  }, []);

  const handleCurrencyChange = (event) => {
    const code = event.target.value;
    const rate = currency.eur[code];
    if (event.target.checked) {
      setSelectedCurrencies([...selectedCurrencies, { code, rate }]);
    } else {
      setSelectedCurrencies(selectedCurrencies.filter((c) => c.code !== code));
    }
  };

  return (
    <section>
      <h3>Price</h3>
      <div>
        <h3>Дані валюти</h3>
        <div>
          <label>
            Виберіть валюти:
            <div className="grid grid-cols-8">
              {Object.keys(currency.eur || {}).map((code) => (
                <div key={code}>
                  <input
                    type="checkbox"
                    value={code}
                    checked={selectedCurrencies.some((c) => c.code === code)}
                    onChange={handleCurrencyChange}
                  />
                  {code.toUpperCase()}
                </div>
              ))}
            </div>
          </label>
          <div>
            {selectedCurrencies.map(({ code, rate }) => (
              <div key={code}>
                <p>{code.toUpperCase()}</p>
                <p>{rate.toFixed(6)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
