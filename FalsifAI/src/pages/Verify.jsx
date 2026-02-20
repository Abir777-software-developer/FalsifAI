import React from "react";
import { Link } from "react-router-dom";
import { Button, Textarea, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { Toaster, toaster } from "../components/ui/toaster";
import Navbar from "../components/Navbar";

function Verify() {
  const [input, setinput] = useState("");
  const [res, setres] = useState(null);
  const [loading, setloading] = useState(false);

  const handledetect = async () => {
    if (!input.trim()) {
      toaster.create({
        title: "Input required",
        description: "Please enter a news article or sentence",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }

    setloading(true);
    setres(null);

    try {
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/hamzab/roberta-fake-news-classification",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HUGGING_FACE_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: input }),
        }
      );
      const data = await response.json();
      console.log("Hugging Face API Response:", data);

      if (Array.isArray(data) && Array.isArray(data[0])) {
        const flatData = data[0];
        const topres = flatData.reduce(
          (prev, curr) => (prev.score > curr.score ? prev : curr),
          flatData[0]
        );

        // Robust check for various verified labels
        const verifiedLabels = ["LABEL_1", "REAL", "TRUE", "VERIFIED"];
        topres.isVerified = verifiedLabels.includes(topres.label.toUpperCase());

        setres(topres);
      } else if (data.error) {
        toaster.create({
          title: "Model Error",
          description: data.error,
          type: "error",
          duration: 3000,
          closable: true,
        });
      } else {
        toaster.create({
          title: "Unexpected response",
          description: "Model returned unexpected data format",
          type: "error",
          duration: 3000,
          closable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toaster.create({
        title: "Error",
        description: "Failed to fetch result from model",
        type: "error",
        duration: 3000,
        closable: true,
      });
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0118] flex flex-col">
      <Navbar />
      <Toaster />

      <main className="flex-grow py-20 flex items-center justify-center px-4 w-full">
        <div className="container-constrained flex justify-center items-center w-full">
          <div className="max-w-2xl w-full mx-auto">
            <header className="mb-16 text-center">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">
                Neural <span className="text-violet-500">Analysis</span>
              </h2>
              <p className="text-xl text-violet-300 font-medium leading-relaxed uppercase tracking-widest text-[10px] text-center opacity-60">
                Powered by state-of-the-art BERT Transformers
              </p>
            </header>

            <div className="card-dark rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden group w-full shadow-2xl border-violet-900/30">
              <div className="relative z-10">
                <Textarea
                  value={input}
                  onChange={(e) => setinput(e.target.value)}
                  placeholder="Paste headline or article content for deep inference..."
                  className="w-full mb-10 min-h-[220px] text-lg p-8 bg-[#0a0118] border border-violet-900/40 rounded-[1.5rem] focus:ring-2 focus:ring-violet-500/50 transition-all text-violet-50 placeholder:text-violet-900/50 font-medium resize-none shadow-2xl"
                />

                <Button
                  onClick={handledetect}
                  disabled={loading}
                  className={`w-full py-10 text-xl font-black rounded-2xl transition-all duration-300 shadow-2xl tracking-tight uppercase ${loading
                    ? 'bg-violet-950 text-violet-700 cursor-not-allowed'
                    : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-500/10 hover:shadow-violet-500/20'
                    }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-4">
                      <Spinner thickness="3px" size="sm" />
                      <span>Processing Hash...</span>
                    </div>
                  ) : (
                    "Launch Inference"
                  )}
                </Button>

                {res && (
                  <div className={`mt-12 p-10 rounded-[2rem] border-2 animate-in fade-in slide-in-from-bottom-6 duration-700 shadow-2xl ${res.isVerified
                    ? "bg-violet-500/5 border-violet-500/20"
                    : "bg-rose-500/5 border-rose-500/20"
                    }`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                      <div>
                        <p className={`text-[10px] uppercase tracking-[0.2em] font-black mb-3 ${res.isVerified ? "text-violet-400" : "text-rose-500"
                          }`}>
                          Inference Results
                        </p>
                        <h3 className={`text-4xl font-black tracking-tighter uppercase ${res.isVerified ? "text-white" : "text-white"
                          }`}>
                          {res.isVerified ? "Verified" : "Misinfo"}
                        </h3>
                      </div>
                      <div className="bg-[#0a0118] rounded-2xl p-6 shadow-2xl border border-violet-900/40 min-w-[140px] text-center">
                        <p className="text-violet-400/50 text-[10px] font-black uppercase tracking-widest mb-2">Confidence</p>
                        <span className={`text-3xl font-black ${res.isVerified ? "text-violet-400" : "text-rose-500"
                          }`}>
                          {(res.score * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="h-4 w-full bg-[#0a0118] rounded-full overflow-hidden p-1 shadow-inner border border-violet-900/30">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 shadow-sm ${res.isVerified ? "bg-violet-500" : "bg-rose-500"
                          }`}
                        style={{ width: `${res.score * 100}%` }}
                      ></div>
                    </div>

                    <p className="mt-8 text-sm text-violet-300 font-bold text-center leading-relaxed italic opacity-60">
                      {res.isVerified
                        ? "Pattern match complete. High probability of authentic content."
                        : "Neural discrepancy discovered. Content likely contains misinformation."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link to="/news" className="text-violet-400/60 font-black text-xs uppercase tracking-widest hover:text-violet-400 flex items-center justify-center gap-3 group">
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Sync with Live Feed
              </Link>
            </div>
          </div>
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

export default Verify;
