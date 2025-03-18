'use client';

import { useState, useRef, useEffect } from "react";
import { FaCode, FaDesktop, FaCopy, FaDownload } from 'react-icons/fa';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"code" | "preview">("code");
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLIFrameElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setGeneratedCode(""); // Clear previous code while generating

    try {
      const response = await fetch("/api/generate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setGeneratedCode(data.html);
        setViewMode("code");
      } else {
        console.error("Error generating code:", data.details || data.error);
        setGeneratedCode("<p>Error generating code: " + (data.details || data.error) + "</p>");
      }
    } catch (error) {
      console.error("Error fetching generated code:", error);
      setGeneratedCode("<p>Error generating code: Network error</p>");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!generatedCode) return;
    
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
  };

  const handleDownloadCode = () => {
    if (!generatedCode) return;
    
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-code.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Format code with Prism.js
  const formatCode = (code: string) => {
    return highlight(code, languages.html, 'html');
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col">
      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-4">
          <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Describe what you want to create
          </label>
          <textarea
            id="prompt-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            className="w-full p-4 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Describe the HTML & CSS you'd like to generate (e.g., A responsive navbar with logo and dropdown menu)"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : "Generate Code"}
          </button>
        </div>
      </div>

      {/* Output Section */}
      {generatedCode && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("code")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === "code"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <FaCode className="w-4 h-4" />
                Code
              </button>
              <button
                onClick={() => setViewMode("preview")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === "preview"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <FaDesktop className="w-4 h-4" />
                Preview
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
                title="Copy code to clipboard"
              >
                <FaCopy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownloadCode}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
                title="Download code as HTML file"
              >
                <FaDownload className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>

          {viewMode === "code" ? (
            <pre
              ref={codeRef}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto text-sm"
              dangerouslySetInnerHTML={{ __html: formatCode(generatedCode) }}
            />
          ) : (
            <iframe
              ref={previewRef}
              className="w-full h-[400px] rounded-lg border border-gray-300 dark:border-gray-600"
              srcDoc={generatedCode}
              sandbox="allow-scripts"
              title="Preview"
            />
          )}
        </div>
      )}
    </div>
  );
}
