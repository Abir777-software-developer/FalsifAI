import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
function News() {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const fetchNews = async () => {
    const api = import.meta.env.VITE_APP_API_SECRET_KEY;
    const cachearticles = localStorage.getItem("newArticles");
    if (cachearticles) {
      setarticles(JSON.parse(cachearticles));
    } else {
      try {
        const res = await fetch(
          `https://newsdata.io/api/1/latest?apikey=${api}&language=en`
        );
        const data = await res.json();
        setarticles(data.results || []);
        localStorage.setItem("newsArticles", JSON.stringify(data.results));
      } catch (error) {
        console.log("error fetching messages");
      } finally {
        setloading(false);
      }
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);
  return (
    <div>
      <header className="bg-green-400 text-black px-8 py-12">
        <div className="flex justify-between items-center w-full">
          <div className="flex-1">
            <h1 className="text-lg font-bold ">FalsifAI</h1>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold">Welcome to FalsifAi!!</h1>
          </div>
          <nav className="flex-1 flex justify-end gap-4">
            <Link to="/">
              <Button variant="ghost" size="xs">
                Home
              </Button>
            </Link>
            <Link to="/Verify">
              <Button variant="ghost" size="xs">
                Verify
              </Button>
            </Link>
            <Link to="/News">
              <Button variant="ghost" size="xs">
                News
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <div className="min-h-scrren flex flex-col items-center justify-start bg-green-300 p-6">
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "1rem",
            textDecoration: "underline",
          }}
        >
          🗞️ Latest News
        </h2>
        {loading ? (
          <div className="flex justify-center mt-10">
            <Spinner color="colorPalette.600" />
          </div>
        ) : (
          <div className="flex flex-col items-center  gap-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="w-full border border-gray-300 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 bg-white"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {article.title}
                </h3>
                <p className="text-base font-medium text-gray-800 mb-3">
                  {article.description || "No description available"}
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferer"
                  className="text-blue-600 font-semibold hover:underline mt-2 block"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
