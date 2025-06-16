import React from "react";
import { Link } from "react-router-dom";
import { Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { Toaster, toaster } from "../components/ui/toaster";
import logoimg from "../assets/logo.png";
function Verify() {
  const [input, setinput] = useState("");
  const [res, setres] = useState(null);

  const handledetect = async () => {
    //const ai = import.meta.env.VITE_HUGGING_FACE_KEY;
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
    try {
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/jy46604790/Fake-News-Bert-Detect",
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
      //console.log(data);
      if (Array.isArray(data) && Array.isArray(data[0])) {
        //console.log(data[0]);
        const flatData = data[0];
        const topres = flatData.reduce(
          (prev, curr) => (prev.score > curr.score ? prev : curr),
          flatData[0]
        );
        //console.log(topres);
        //alert(`Label: ${topres.label},Score:${topres.score}`);
        setres(topres);
      } else if (data.error) {
        toaster.create({
          title: "Model Error",
          description: data.error,
          type: "error",
          duration: 3000,
          closable: true,
        });
        setres(null);
      } else {
        toaster.create({
          title: "Unexpected response",
          description: "Model return unexpected data format",
          type: "error",
          duration: 3000,
          closable: true,
        });
        setres(null);
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
    }
  };
  return (
    <div>
      <header className="bg-green-400 text-black px-8 py-12">
        <div className="flex justify-between items-center w-full">
          <div className="flex-1">
            <h1 className="text-lg font-bold ">FalsifAI</h1>
            {/* <img src="logoimg" alt="logo" /> */}
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
      <div className="min-h-screen flex justify-center items-center bg-green-300">
        <div className="w-full max-w-4xl  mx-auto  p-6 bg-green-400 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-4 text-center">
            🧠 Enter News to Analyze
          </h2>
          <Textarea
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Paste a news headline or content here..."
            size="md"
            className="w-full mb-6 h-40 text-lg placeholder-black"
          />
          <Button
            colorScheme="blue"
            onClick={handledetect}
            size="lg"
            className="px-8 py-6 text-xl"
          >
            Detect Fake News
          </Button>
          {res && (
            <div className="mt-8 p-6 bg-gray-100 rounded-md shadow-md w-full">
              <p className="text-lg mb-2">
                <strong>Label:</strong>{" "}
                {res.label === "LABEL_0"
                  ? "Fake news"
                  : res.label === "LABEL_1"
                  ? "Real news"
                  : res.label}
              </p>
              <p className="text-lg">
                <strong>Confidence:</strong>{" "}
                {typeof res.score === "number"
                  ? `${(res.score * 100).toFixed(2)}%`
                  : "Not available"}
              </p>
            </div>
          )}
          {/* {res  && (
          <div className="mt-6 p-4 bg-yellow-100 text-red-700 rounded-md">
            <p>
              <strong>Invalid response received from model.</strong>
            </p>
            <pre>{JSON.stringify(res, null, 2)}</pre>
          </div>
        )} */}
        </div>
      </div>
    </div>
  );
}

export default Verify;
