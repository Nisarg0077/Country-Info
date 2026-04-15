import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import jsonData from "../convert.json";

export default function ContData() {
  const code = window.location.pathname.split("/").pop(); // Cleaner way to get country code

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!code) return;
    const result = jsonData.country.filter((data) => {
      if (code === data.Code) {
        return data;
      }
    });

    setCountry(result[0] || result); // Handle both array and single object
    setLoading(false);
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p className="text-xl">Loading country information...</p>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p className="text-xl text-red-400">{"Country not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-6 pb-12 px-6">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-12">
        {/* Country Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white tracking-tighter mb-2">
            {country.Name}
          </h1>
          <p className="text-white/60 text-xl">
            {country.Continent} • {country.Region}
          </p>
        </div>

        {/* Liquid Glass Information Card */}
        <div className="liquid-glass-card p-10 md:p-14 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-lg">
            <div className="space-y-6">
              <InfoRow
                label="Official Name"
                value={country.LocalName || country.Name}
              />
              <InfoRow label="Capital" value={country.Capital} />
              <InfoRow label="Government Form" value={country.GovernmentForm} />
              <InfoRow label="Head of State" value={country.HeadOfState} />
            </div>

            <div className="space-y-6">
              <InfoRow
                label="Surface Area"
                value={`${country.SurfaceArea?.toLocaleString()} km²`}
              />
              <InfoRow
                label="Population"
                value={country.Population?.toLocaleString()}
              />
              <InfoRow label="Independence Year" value={country.IndepYear} />
              <InfoRow
                label="Life Expectancy"
                value={`${country.LifeExpectancy} years`}
              />
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoRow label="GNP" value={`$${country.GNP?.toLocaleString()}`} />
            <InfoRow
              label="Old GNP"
              value={`${!country.GNPOld ? "-" : `$${country.GNPOld?.toLocaleString()}`}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Component for Clean Rows */
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-white/70 font-medium">{label}</span>
      <span className="text-white text-right font-semibold">
        {value || "—"}
      </span>
    </div>
  );
}
