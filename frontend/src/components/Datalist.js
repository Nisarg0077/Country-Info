/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Datalist() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  // Fetch countries
  useEffect(() => {
    fetch("https://country-info-vm95.vercel.app/countries")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setFilteredData(result); // Initialize filteredData with all data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setLoading(false);
      });
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (!query) {
        setFilteredData(data); // Show all when search is empty
        return;
      }

      const result = data.filter((country) =>
        country.Name.trim().toLowerCase().includes(query),
      );

      setFilteredData(result);
    }, 300); // Reduced debounce time to 300ms (better UX)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Loading countries...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-6 pb-12 px-6">
      <Navbar />

      <div className="w-full mx-auto max-w-7xl">
        <h1 className="text-center text-4xl font-bold text-white mb-10 mt-2 tracking-tight">
          Explore Countries
        </h1>

        {/* Search Input */}
        <div className="w-full max-w-lg mx-auto mb-12">
          <div className="relative group">
            <input
              type="text"
              onChange={handleChange}
              placeholder="Search Countries..."
              className="liquid-glass-input w-full
                         bg-white/10 border border-white/35
                         backdrop-blur-3xl saturate-200
                         rounded-3xl py-5 pl-14 pr-6 text-lg text-white
                         placeholder:text-white/60 focus:outline-none
                         hover:bg-white/14 focus:bg-white/16
                         transition-all duration-300"
            />

            {/* Search Icon */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none transition-colors group-focus-within:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((d) => (
              <Link
                key={d.Code}
                to={`/contdata/${encodeURIComponent(d.Code)}`}
                className="liquid-glass-btn w-56 h-20 text-base flex items-center justify-center text-center"
              >
                {d.Name}
              </Link>
            ))
          ) : (
            <div className="text-white text-xl py-20">
              No countries found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
