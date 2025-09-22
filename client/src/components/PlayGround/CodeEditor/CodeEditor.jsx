import { useState } from "react";
import Editor from "@monaco-editor/react";
import ToggleSwitch from "./ToggleSwitch";
import axios from "axios";
import { BiLoaderCircle } from "react-icons/bi";

// Boilerplate code for each language
const boilerplate = {
  javascript: `function greet() {
  console.log("Hello, Nucleus!");
}

greet();`,

  python: `def greet():
    print("Hello, Nucleus!")

greet()`,

  java: `class Code {
    public static void main(String[] args) {
        System.out.println("Hello, Nucleus!");
    }
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, Nucleus!" << endl;
    return 0;
}`,
};

function CodeEditor() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(boilerplate["cpp"]);
  const [output, setOutput] = useState("");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [loading, setLoading] = useState(false);

  async function handleRunCode() {
    setLoading(true);
    setOutput("");
    try {
      const response = await axios.post(
        import.meta.env.VITE_PROD_CODE_RUNNER_URL,
        {
          language,
          code,
        }
      );

      // Check if backend returned output or error
      if (response.data.output) {
        setOutput(response.data.output);
      } else if (response.data.error) {
        setOutput(`Error: ${response.data.error}`);
      } else {
        setOutput("No output returned.");
      }
    } catch (error) {
      // Network / axios errors
      setOutput(`Request failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* Language selector */}
        <select
          value={language}
          onChange={(e) => {
            const lang = e.target.value;
            setLanguage(lang);
            setCode(boilerplate[lang]); // load boilerplate automatically
          }}
          className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {["CPP", "Java", "JavaScript", "Python"].map((lang) => (
            <option key={lang} value={lang.toLowerCase()}>
              {lang}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600">Dark Mode</span>
          <ToggleSwitch
            enabled={editorTheme === "vs-dark"}
            setEnabled={(isDark) =>
              setEditorTheme(isDark ? "vs-dark" : "light")
            }
          />
          <button
            onClick={handleRunCode}
            className="px-6 py-2 bg-green-600 cursor-pointer text-white font-semibold rounded-md flex items-center gap-2"
          >
            {loading ? (
              <>
                <BiLoaderCircle className="animate-spin" size={20} />
                Running...
              </>
            ) : (
              "Run Code"
            )}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="border rounded-lg overflow-hidden">
        <Editor
          height="400px"
          language={language === "cpp" ? "cpp" : language}
          value={code}
          theme={editorTheme}
          onChange={(value) => setCode(value ?? "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {/* Output */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Output</h3>
        <pre
          className={`p-4 rounded-lg text-sm whitespace-pre-wrap min-h-[100px] ${
            editorTheme === "vs-dark"
              ? "bg-slate-800 text-green-300"
              : "bg-gray-800 text-white"
          }`}
        >
          {output || "// Click 'Run Code' to see the output here"}
        </pre>
      </div>
    </div>
  );
}

export default CodeEditor;
