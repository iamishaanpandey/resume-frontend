import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Loader2, CheckCircle2, Download, Sparkles } from "lucide-react";

type PreviewState = "ready" | "loading" | "success";

interface PreviewCardProps {
  state: PreviewState;
  documentType: "resume" | "cover-letter";
  onDownload: () => void;
}

const PreviewCard = ({ state, documentType, onDownload }: PreviewCardProps) => {
  const documentLabel = documentType === "resume" ? "Resume" : "Cover Letter";

  return (
    <div className="glass-card h-full min-h-[500px] flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="glow-effect" />
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </div>

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
                Paste a job description and upload your resume to generate a tailored {documentLabel.toLowerCase()}
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
                Analyzing {documentLabel}...
              </h3>
              <p className="text-muted-foreground text-sm">
                Crafting your perfect document
              </p>
            </div>
            
            {/* Progress bar */}
            <div className="w-48 h-1 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}

        {state === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20"
            >
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </motion.div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {documentLabel} Ready!
              </h3>
              <p className="text-muted-foreground text-sm">
                Your tailored document has been generated
              </p>
            </div>
            
            <motion.button
              onClick={onDownload}
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Download PDF
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PreviewCard;
