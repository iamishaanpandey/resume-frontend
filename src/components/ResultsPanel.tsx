import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Loader2, CheckCircle2, Download, Sparkles, FileText, ScrollText, AlertCircle } from "lucide-react";

type PreviewState = "ready" | "loading" | "success" | "error";
type DocumentType = "resume" | "cover-letter";

interface ResultsPanelProps {
  state: PreviewState;
  activeTab: DocumentType;
  onTabChange: (tab: DocumentType) => void;
  onDownload: (type: DocumentType) => void;
  errorMessage?: string;
}

const ResultsPanel = ({ state, activeTab, onTabChange, onDownload, errorMessage }: ResultsPanelProps) => {
  const documentLabel = activeTab === "resume" ? "Resume" : "Cover Letter";

  return (
    <div className="glass-card h-full min-h-[500px] flex flex-col relative overflow-hidden">
      {/* Background glow effect */}
      <div className="glow-effect" />
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Document Tabs */}
      <div className="relative z-10 p-4 border-b border-glass-border">
        <div className="inline-flex gap-1 p-1 rounded-lg bg-secondary/30">
          <button
            onClick={() => onTabChange("resume")}
            className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
              activeTab === "resume" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === "resume" && (
              <motion.div
                layoutId="result-tab-bg"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-accent"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <FileText className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Resume</span>
          </button>
          <button
            onClick={() => onTabChange("cover-letter")}
            className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
              activeTab === "cover-letter" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === "cover-letter" && (
              <motion.div
                layoutId="result-tab-bg"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-accent"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <ScrollText className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Cover Letter</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {state === "ready" && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <motion.div
                className="p-6 rounded-2xl bg-secondary/50 border border-glass-border"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="w-12 h-12 text-primary" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Ready to Build
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Add job details and upload your resume to generate tailored documents
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="w-3 h-3 text-primary" />
                <span>AI-Powered Generation</span>
              </div>
            </motion.div>
          )}

          {state === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="p-6 rounded-full bg-secondary/50 border border-glass-border relative z-10">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Analyzing & Generating...
                </h3>
                <p className="text-muted-foreground text-sm">
                  Crafting your perfect {documentLabel.toLowerCase()}
                </p>
              </div>
              
              {/* Progress bar */}
              <div className="w-48 h-1 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 10, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}

          {state === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="p-6 rounded-2xl bg-destructive/10 border border-destructive/20"
              >
                <AlertCircle className="w-12 h-12 text-destructive" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Generation Failed
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  {errorMessage || "An unexpected error occurred. Please try again."}
                </p>
              </div>
            </motion.div>
          )}

          {state === "success" && (
            <motion.div
              key={`success-${activeTab}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6 text-center w-full max-w-sm"
            >
              {/* PDF Preview Placeholder */}
              <div className="w-full aspect-[8.5/11] max-h-[280px] rounded-lg bg-secondary/30 border border-glass-border flex flex-col items-center justify-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </motion.div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Document Ready!
                  </h4>
                  <p className="text-muted-foreground text-xs mt-1">
                    Your {documentLabel.toLowerCase()} has been generated
                  </p>
                </div>
              </div>
              
              <motion.button
                onClick={() => onDownload(activeTab)}
                className="btn-primary flex items-center gap-2 text-lg px-8 py-4 w-full justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                Download PDF
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResultsPanel;
