import React, { useEffect, useState } from "react";

export default function Currencies() {
  const [currency, setCurrency] = useState({});
  const [previousCurrency, setPreviousCurrency] = useState({});
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [isShow, setShow] = useState(false);
  const [value, setValue] = useState("eur");

  const getYesterdayDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const latestRes = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${value}.json`
        );
        const latestData = await latestRes.json();
        setCurrency(latestData);

        const yesterday = getYesterdayDate();
        const prevRes = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${yesterday}/v1/currencies/${value}.json`
        );
        const prevData = await prevRes.json();
        setPreviousCurrency(prevData);

        const defaultSelectedCurrencies = ["usd", "eur", "uah"].map((code) => ({
          code,
          rate: latestData[value][code],
          previousRate: prevData[value][code],
        }));
        setSelectedCurrencies(defaultSelectedCurrencies);
      } catch (error) {
        console.error("Помилка отримання даних про валюту:", error);
      }
    };

    fetchCurrencyData();
  }, [value]);

  const handleCurrencyChange = (event) => {
    const code = event.target.value;
    const rate = currency[value][code];
    const previousRate = previousCurrency[value][code];
    if (event.target.checked) {
      setSelectedCurrencies([
        ...selectedCurrencies,
        { code, rate, previousRate },
      ]);
    } else {
      setSelectedCurrencies(selectedCurrencies.filter((c) => c.code !== code));
    }
  };

  const handleBaseChange = (base) => {
    setValue(base.toLowerCase());
  };

  function handleShow() {
    setShow((prevState) => !prevState);
  }

  const getColor = (rate, previousRate) => {
    if (rate > previousRate) return "red";
    if (rate < previousRate) return "green";
    return "yellow";
  };

  return (
    <section className="flex justify-center p-2">
      <div>
        <div className="">
          <h3 className="my-4 text-4xl font-bold">Select Currencies:</h3>
          <button
            onClick={() => handleBaseChange("usd")}
            className="p-2 m-4 transition-colors duration-100 border-2 rounded-md hover:text-black hover:bg-white hover:border-black"
          >
            USD
          </button>
          <button
            onClick={() => handleBaseChange("eur")}
            className="p-2 m-4 transition-colors duration-100 border-2 rounded-md hover:text-black hover:bg-white hover:border-black"
          >
            EUR
          </button>
          <button
            onClick={() => handleBaseChange("uah")}
            className="p-2 m-4 transition-colors duration-100 border-2 rounded-md hover:text-black hover:bg-white hover:border-black"
          >
            UAH
          </button>
          <div
            className={
              isShow
                ? "grid grid-cols-8 gap-1 overflow-hidden"
                : "grid grid-cols-8 gap-1 overflow-hidden h-28 text-ellipsis"
            }
          >
            {Object.keys(currency[value] || {}).map((code) => (
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
              Show {isShow ? "less" : "more"}
            </button>
          </div>
          <div className="flex gap-4 text-center">
            {selectedCurrencies.map(({ code, rate, previousRate }) => (
              <div key={code}>
                <p>{code.toUpperCase()}</p>
                <p style={{ color: getColor(rate, previousRate) }}>
                  {rate.toFixed(6)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
