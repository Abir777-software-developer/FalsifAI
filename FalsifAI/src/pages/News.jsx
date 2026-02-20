import React from "react";
import { Link } from "react-router-dom";
import { Button, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function News() {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchNews = async () => {
    const api = import.meta.env.VITE_APP_API_SECRET_KEY;
    const cachearticles = localStorage.getItem("newArticles");
    if (cachearticles) {
      setarticles(JSON.parse(cachearticles));
    }
    try {
      const res = await fetch(
        `https://newsdata.io/api/1/latest?apikey=${api}&language=en`
      );
      const data = await res.json();
      setarticles(data.results || []);
      localStorage.setItem("newArticles", JSON.stringify(data.results));
    } catch (error) {
      console.log("error fetching messages");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0118] flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow py-16 md:py-24">
        <div className="container-constrained px-6 md:px-10 flex flex-col items-center">
          <header className="mb-12 md:mb-16 text-center w-full max-w-3xl">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
              Global <span className="text-violet-500">Flux</span>
            </h2>
            <p className="text-[9px] md:text-[10px] text-violet-300/60 font-black leading-relaxed uppercase tracking-[0.4em]">
              Synchronized Real-time Information Stream
            </p>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] gap-8">
              <Spinner
                thickness="3px"
                speed="0.65s"
                emptyColor="violet.950"
                color="violet.500"
                size="lg"
              />
              <p className="text-violet-900 font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">Establishing Uplink...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full">
              {articles.map((article, index) => (
                <a
                  key={index}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-dark rounded-[2rem] overflow-hidden hover-lift flex flex-col h-full group border-violet-900/30 shadow-xl"
                >
                  <div className={`h-52 w-full ${article.image_url ? '' : 'bg-violet-950/20'} overflow-hidden relative`}>
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl opacity-10">
                        🗞️
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-violet-600 text-white text-[8px] font-black rounded-md uppercase tracking-[0.15em] shadow-2xl">
                        {article.source_id || "Global"}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow text-center md:text-left">
                    <div className="mb-4">
                      <span className="text-[8px] text-violet-400/30 font-black uppercase tracking-[0.2em]">
                        {article.pubDate ? new Date(article.pubDate).toLocaleDateString() : "Timestamp Unavailable"}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-black text-white mb-4 line-clamp-2 leading-tight group-hover:text-violet-400 transition-colors uppercase tracking-tight">
                      {article.title}
                    </h3>

                    <p className="text-violet-300/40 mb-8 line-clamp-2 text-[10px] leading-relaxed font-bold uppercase tracking-tight">
                      {article.description || "Node content decryption required for full summary access."}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-violet-900/20 bg-[#0a0118] mt-auto">
        <div className="container-constrained px-6 flex justify-center items-center">
          <p className="text-violet-300/40 text-[10px] font-black uppercase tracking-[0.2em]">
            ©2024 FalsifAI.All Rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default News;
