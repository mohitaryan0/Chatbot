"use client";

import { useState, useRef, useEffect } from "react";
import { FaCode, FaDesktop, FaCopy, FaDownload } from 'react-icons/fa';

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
    try {
      const response = await fetch("/api/generate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setGeneratedCode(data.html);
      setViewMode("code"); // Reset to "code" view after generation
    } catch (error) {
      console.error("Error fetching generated code:", error);
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
        
        <div className="flex items-center justify-end">
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Tabs and Actions */}
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  viewMode === "code" 
                    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400" 
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                onClick={() => setViewMode("code")}
              >
                <FaCode className="mr-2" />
                Code
              </button>
              <button
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  viewMode === "preview" 
                    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400" 
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                onClick={() => setViewMode("preview")}
              >
                <FaDesktop className="mr-2" />
                Preview
              </button>
            </div>
            
            <div className="flex items-center mr-4">
              <button
                onClick={handleCopyCode}
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                title="Copy to clipboard"
              >
                <FaCopy />
                <span className="sr-only">Copy</span>
              </button>
              {copied && (
                <span className="text-xs text-green-600 dark:text-green-400 ml-2">
                  Copied!
                </span>
              )}
              <button
                onClick={handleDownloadCode}
                className="p-2 ml-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                title="Download as HTML file"
              >
                <FaDownload />
                <span className="sr-only">Download</span>
              </button>
            </div>
          </div>

          {/* Content Panels */}
          <div className="relative">
            {/* Code Panel */}
            {viewMode === "code" && (
              <div className="p-4">
                <pre
                  ref={codeRef}
                  className="text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-auto text-gray-800 dark:text-green-400 whitespace-pre-wrap break-words max-h-[500px] scroll-smooth"
                >
                  {generatedCode}
                </pre>
              </div>
            )}

            {/* Preview Panel */}
            {viewMode === "preview" && (
              <div className="bg-white">
                <div className="border-b border-gray-200 dark:border-gray-700 p-3 flex items-center bg-gray-100 dark:bg-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto text-xs text-gray-500 dark:text-gray-400">Preview</div>
                </div>
                <div className="relative pt-[56.25%] bg-white">
                  <iframe
                    ref={previewRef}
                    className="absolute top-0 left-0 w-full h-full border-0 bg-white"
                    srcDoc={generatedCode}
                    title="Generated HTML Preview"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
