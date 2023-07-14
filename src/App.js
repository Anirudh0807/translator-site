import React from "react";
import { useState } from 'react';
import axios from 'axios';

function App() {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleLangChange = (e) => {
    setLang(e.target.value);
  }

  const langs = {
    es: "Español",
    fr: "Français", de: "Deutsch", it: "Italiano",
    ja: "Japanese"
  }

  const [lang, setLang] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const fetchData = async () => {
    // const encodedParams = new URLSearchParams();
    // encodedParams.set("q", searchTerm);
    // encodedParams.set("target", lang);
    // encodedParams.set("source", "en");

    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'en');
    encodedParams.set('target_language', lang);
    encodedParams.set('text', searchTerm);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'f2637d3aa1msh03edca5164bfb7dp17fe4ejsn934dcf5b48a6',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setSearchResult(response.data.data.translatedText);
      console.log(response.data.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="font-bold text-center text-4xl py-10">Translator</h1>
      <div className="flex flex-col items-center p-10">
        <div className="w-96">
          <textarea
            placeholder="Enter your text here"
            className="w-full h-32 p-4 border-2 rounded-md resize-none"
            value={searchTerm}
            onChange={handleSearch}
          ></textarea>
        </div>

        <select className="w-60 mt-4 p-2 border-2 rounded-md" value={lang} onChange={handleLangChange}>
          <option value="">Select a language</option>
          {Object.entries(langs).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>

        <button className="bg-blue-500 rounded-md mt-6 px-4 py-2 text-white" onClick={fetchData}>
          Submit
        </button>

        <div className="mt-8">
          <textarea className="w-full h-32 p-4 border-2 rounded-md resize-none" value={searchResult}></textarea>
        </div>
      </div>
    </>
  );
}

export default App;
