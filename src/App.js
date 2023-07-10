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
    en: "English", es: "Español",
    fr: "Français", de: "Deutsch", it: "Italiano",
    ja: "Japanese"
  }

  const [lang, setLang] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const fetchData = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("q", searchTerm);
    encodedParams.set("target", lang);
    encodedParams.set("source", "en");

    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "f2637d3aa1msh03edca5164bfb7dp17fe4ejsn934dcf5b48a6",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setSearchResult(response.data.data.translations[0].translatedText);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <h1 className="font-bold place-content-center">Translator</h1>
    <div className="p-20 px-48">
      <div>
        
        <textarea
          placeholder="Enter your text here"
          className="w-full h-20 p-2 border-2 rounded-md resize-none"
          value={searchTerm}
          onChange={handleSearch}
        ></textarea>
      </div>

      <select className="m-2 p-1 border-2 rounded-md" value={lang} onChange={handleLangChange}>
        <option value="">Select a language</option>
        {Object.entries(langs).map(([key, value]) => (
          <option key={key} value={key}>{value}</option>
        ))}
      </select>

      <button className="bg-blue-500 rounded-md m-4 border-2 px-2 py-1 items-center" onClick={fetchData}>
        Submit
      </button>

      <div className="py-5">
        <textarea className="w-full h-20 p-2 border-2 rounded-md resize-none" value={searchResult}></textarea>
      </div>
    </div>

    </>
  );
}

export default App;
