import { Button } from "@chakra-ui/react";
import React from "react";
import fakenewsimg from "../assets/fake6.jpg";
import newsimg from "../assets/news5.jpg";
import { Link } from "react-router-dom";

function Home() {
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
      <div className="text-center py-10 px-6">
        <h1
          style={{
            fontSize: "60px",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          Welcome to Fake News Detection Portal!!
        </h1>
        <p
          style={{
            fontSize: "50px",
            fontWeight: "bold",
            marginTop: "30px",
            marginBottom: "30px",
            textDecoration: "underline",
          }}
        >
          Select an option below to get started.
        </p>
        <div className="flex justify-center gap-8 flex-wrap">
          <Link to="/Verify">
            <div className="border border-gray-300 rounded-xl p-10 w-[500px] min-h-[300px] shadow-2xl hover:shadow-xl transform hover:scale-105 transition duration-300 bg-green-300 text-black flex flex-col justify-between">
              <div>
                <h2 className="text-[50px] font-bold underline decoration-green-600 underline-offset-4 mb-2">
                  🧠 Detect Fake News
                </h2>
                <p className="text-lg leading-relaxed">
                  Input news and find if it is real or fake
                </p>
              </div>
              <img
                src={fakenewsimg}
                alt="Detect Fake News"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          </Link>
          <Link to="/News">
            <div className="border border-gray-300 rounded-xl p-10 w-[500px] min-h-[300px] shadow-2xl hover:shadow-xl transform hover:scale-105 transition duration-300 bg-green-300 text-black flex flex-col justify-between">
              <div>
                <h2 className="text-[50px] font-bold underline decoration-green-600 underline-offset-4 mb-2">
                  🗞️ View Recent News
                  {/* 🧠 Detect Fake News */}
                </h2>
                <p className="text-lg leading-relaxed">
                  Check out the latest headlines
                  {/* Input news and find if it is real or fake */}
                </p>
              </div>
              <img
                src={newsimg}
                alt="Detect Fake News"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
