import { useState } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import JobInputSection from "@/components/JobInputSection";
import FileUploadZone from "@/components/FileUploadZone";
import ResultsPanel from "@/components/ResultsPanel";

type InputMode = "link" | "description";
type DocumentType = "resume" | "cover-letter";
type PreviewState = "ready" | "loading" | "success" | "error";

const Index = () => {
  const [inputMode, setInputMode] = useState<InputMode>("description");
  const [jobLink, setJobLink] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [previewState, setPreviewState] = useState<PreviewState>("ready");
  const [activeTab, setActiveTab] = useState<DocumentType>("resume");
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleGenerate = async () => {
    const jobDesc = inputMode === "link" ? jobLink.trim() : jobDescription.trim();
    if (!jobDesc || !resumeFile) return;
    
    setPreviewState("loading");
    setErrorMessage("");
    
    // Clear previous blob URL
    if (pdfBlobUrl) {
      window.URL.revokeObjectURL(pdfBlobUrl);
      setPdfBlobUrl(null);
    }
    const formData = new FormData();
    formData.append("job_desc", jobDesc);
    formData.append("old_resume", resumeFile);

    // --- UPDATED: Points to your AWS Server (Port 80) ---
    const AWS_API_URL = "https://grilla-zestfully-vena.ngrok-free.dev";

    const endpoint = activeTab === "resume" 
      ? `${AWS_API_URL}/generate`
      : `${AWS_API_URL}/generate_cover_letter`;
    // ----------------------------------------------------

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      setPdfBlobUrl(blobUrl);
      setPreviewState("success");
    } catch (error) {
      console.error("Generation failed:", error);
      setErrorMessage(
        error instanceof TypeError && error.message.includes("fetch")
          ? "Connection refused. Unable to reach the AWS server. Please check your internet connection."
          : `Generation failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      setPreviewState("error");
    }
  };

  const handleDownload = (type: DocumentType) => {
    if (!pdfBlobUrl) return;
    
    const link = document.createElement("a");
    link.href = pdfBlobUrl;
    link.download = type === "resume" ? "tailored_resume.pdf" : "cover_letter.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasJobInput = inputMode === "link" ? jobLink.trim().length > 0 : jobDescription.trim().length > 0;
  const isFormValid = hasJobInput && resumeFile !== null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Build Your Perfect{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Career Documents
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              AI-powered resume and cover letter generator that tailors your documents to any job description
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6 flex flex-col"
            >
              {/* Job Input Section */}
              <JobInputSection
                mode={inputMode}
                onModeChange={setInputMode}
                jobLink={jobLink}
                onJobLinkChange={setJobLink}
                jobDescription={jobDescription}
                onJobDescriptionChange={setJobDescription}
              />

              {/* File Upload */}
              <FileUploadZone
                file={resumeFile}
                onFileSelect={setResumeFile}
              />

              {/* Spacer to push button to bottom */}
              <div className="flex-1 min-h-4" />

              {/* Generate Button */}
              <motion.button
                onClick={handleGenerate}
                disabled={!isFormValid || previewState === "loading"}
                className={`btn-primary w-full flex items-center justify-center gap-3 text-lg py-4 ${
                  (!isFormValid || previewState === "loading") 
                    ? "opacity-50 cursor-not-allowed" 
                    : ""
                }`}
                whileHover={isFormValid && previewState !== "loading" ? { scale: 1.02 } : {}}
                whileTap={isFormValid && previewState !== "loading" ? { scale: 0.98 } : {}}
              >
                <Sparkles className="w-5 h-5" />
                Generate Documents
              </motion.button>

              {/* Helper text */}
              {!isFormValid && previewState !== "loading" && (
                <p className="text-sm text-muted-foreground text-center">
                  {!hasJobInput && !resumeFile
                    ? "Add job details and upload your resume to get started"
                    : !hasJobInput
                    ? "Add a job link or description to continue"
                    : "Upload your resume to continue"}
                </p>
              )}
            </motion.div>

            {/* Right Column - Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ResultsPanel
                state={previewState}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onDownload={handleDownload}
                errorMessage={errorMessage}
              />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;