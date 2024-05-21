import React from "react";
import faqData from "./faqData";

export default function Contact() {
  return (
    <section className="flex py-8 space-y-4">
      <div className="flex-1">
        <h2 className="py-6 text-5xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        {faqData.map((faq, index) => (
          <div
            key={index}
            id={faq.id}
            className="p-2 mx-4 space-y-2 border-b-2 border-white border-opacity-80"
          >
            <h2 className="text-4xl font-bold">{faq.question}</h2>
            <p className="w-1/2">{faq.answer}</p>
          </div>
        ))}
      </div>
      <div className="sticky ml-4 flex-0 top-4">
        <h3 className="mb-4 text-3xl font-bold">Jump to:</h3>
        <ul className="space-y-2">
          {faqData.map((faq, index) => (
            <li key={index}>
              <a
                href={`#/Contact#${faq.id}`}
                className="text-blue-500 hover:underline"
              >
                {faq.question}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
