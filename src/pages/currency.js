import React, { useEffect, useState } from "react";

export default function Currencies() {
  const [currency, setCurrency] = useState({});
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [isShow, setShow] = useState(false);

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

  function handleShow() {
    setShow((prevState) => !prevState);
  }

  return (
    <section className="flex justify-center p-2">
      <div>
        <div className="">
          <h3 className="my-4 text-4xl font-bold">Select Currencies:</h3>
          <div
            className={
              isShow
                ? "grid grid-cols-8 gap-1 overflow-hidden"
                : "grid grid-cols-8 gap-1 overflow-hidden h-28 text-ellipsis"
            }
          >
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
          <div className="flex justify-center">
            <button
              className="p-2 m-4 transition-colors duration-100 border-2 rounded-md hover:text-black hover:bg-white hover:border-black"
              onClick={handleShow}
            >
              Show more
            </button>
          </div>
          <div className="flex gap-4 text-center">
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
