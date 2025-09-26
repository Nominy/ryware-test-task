import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      className="
        flex
        min-h-screen w-full
        text-neutral-100
        bg-neutral-900
        items-center justify-center
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto p-8
          text-center
        "
      >
        <div
          className="
            flex
            items-center justify-center gap-6
          "
        >
          <a
            href="https://vite.dev"
            target="_blank"
            className="
              inline-block
              p-6
            "
          >
            <img
              src={viteLogo}
              alt="Vite logo"
              className="
                h-24
                transition duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]
              "
            />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            className="
              inline-block
              p-6
            "
          >
            <img
              src={reactLogo}
              alt="React logo"
              className="
                h-24
                transition duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] motion-safe:animate-[spin_20s_linear_infinite]
              "
            />
          </a>
        </div>

        <h1
          className="
            mt-2
            text-5xl leading-tight
          "
        >
          Vite + React
        </h1>

        <div
          className="
            mt-6
            rounded-lg
          "
        >
          <button
            onClick={() => setCount((c) => c + 1)}
            className="
              px-5 py-2.5
              text-base font-medium
              bg-neutral-800
              rounded-lg border border-transparent
              transition-colors
              hover:border-indigo-500
              hover:cursor-pointer
              focus:outline-4 focus:outline-blue-600/50
            "
          >
            count is {count}
          </button>
          <p
            className="
              mt-4
              text-base text-neutral-300
            "
          >
            Edit{" "}
            <code
              className="
                font-mono
              "
            >
              src/App.tsx
            </code>{" "}
            and save to test meow
          </p>
        </div>

        <p
          className="
            mt-4
            text-sm text-neutral-400
          "
        >
          Click on the{" "}
          <a
            href="https://vite.dev"
            target="_blank"
            className="
              text-indigo-400
              hover:text-indigo-300
            "
          >
            Vite
          </a>{" "}
          and{" "}
          <a
            href="https://react.dev"
            target="_blank"
            className="
              text-indigo-400
              hover:text-indigo-300
            "
          >
            React
          </a>{" "}
          logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
