import React from "react";
import Navbar from "./Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-black pt-6 pb-12 px-6">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-12">
        {/* Liquid Glass Card */}
        <div className="liquid-glass-card p-12 md:p-16 rounded-3xl">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-white tracking-tight mb-4">
              About Us
            </h1>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
          </div>

          <div className="text-white/90 leading-relaxed text-lg">
            <p className="mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
