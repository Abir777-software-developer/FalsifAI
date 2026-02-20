import React from "react";
import { Link } from "react-router-dom";
import fakenewsimg from "../assets/fake6.jpg";
import newsimg from "../assets/news5.jpg";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-[#0a0118] flex flex-col overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-dark-hero pt-32 md:pt-48 pb-16">
        <div className="container-constrained flex flex-col items-center text-center">
          <div className="max-w-6xl px-4 w-full flex flex-col items-center">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-[-0.06em] leading-tight uppercase text-center whitespace-nowrap">
              Truth in the Digital Age.
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed tracking-wider uppercase opacity-60 text-center">
              Advanced neural verification for the decentralized information era. <br className="hidden md:block" />
              Navigate reality with total confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="flex-grow flex items-center py-10 md:py-20 w-full">
        <div className="container-constrained px-6 md:px-10 flex justify-center">
          {/* Using a fixed-width grid container with mx-auto for perfect horizontal symmetry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-[960px] mx-auto">

            <Link to="/verify" className="group w-full">
              <div className="card-dark rounded-[2.5rem] p-10 md:p-12 h-full hover-lift flex flex-col justify-between overflow-hidden relative group/card border-violet-900/10 shadow-2xl">
                <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-violet-500/5 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 border border-violet-500/10 shadow-2xl">
                    🧠
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-violet-500 transition-colors uppercase tracking-tight">
                    Analyze
                  </h2>
                  <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed mb-10 font-bold uppercase tracking-wide">
                    Run deep BERT inference to uncover misinformation in headlines and snippets instantly.
                  </p>
                </div>
                <div className="mt-auto relative z-10 overflow-hidden rounded-[1.5rem] border border-violet-900/20 shadow-2xl">
                  <img
                    src={fakenewsimg}
                    alt="Detect Fake News"
                    className="w-full h-44 md:h-56 object-cover transform transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] to-transparent opacity-60"></div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl group-hover:bg-violet-500/10 transition-colors"></div>
              </div>
            </Link>

            <Link to="/news" className="group w-full">
              <div className="card-dark rounded-[2.5rem] p-10 md:p-12 h-full hover-lift flex flex-col justify-between overflow-hidden relative group/card border-violet-900/10 shadow-2xl">
                <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-violet-500/5 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 border border-violet-500/10 shadow-2xl">
                    🗞️
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-violet-500 transition-colors uppercase tracking-tight">
                    Explore
                  </h2>
                  <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed mb-10 font-bold uppercase tracking-wide">
                    Stream live global headlines and stay synchronized with the most relevant developments.
                  </p>
                </div>
                <div className="mt-auto relative z-10 overflow-hidden rounded-[1.5rem] border border-violet-900/20 shadow-2xl">
                  <img
                    src={newsimg}
                    alt="View Recent News"
                    className="w-full h-44 md:h-56 object-cover transform transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] to-transparent opacity-60"></div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl group-hover:bg-violet-500/10 transition-colors"></div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-violet-900/10 bg-[#0a0118] mt-auto">
        <div className="container-constrained px-6 flex justify-center items-center">
          <p className="text-violet-300/40 text-[10px] font-black uppercase tracking-[0.22em] opacity-80">
            ©2024 FalsifAI.All Rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
