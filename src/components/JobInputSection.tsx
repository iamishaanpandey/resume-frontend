import { motion } from "framer-motion";
import { Link, FileText } from "lucide-react";

type InputMode = "link" | "description";

interface JobInputSectionProps {
  mode: InputMode;
  onModeChange: (mode: InputMode) => void;
  jobLink: string;
  onJobLinkChange: (value: string) => void;
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
}

const JobInputSection = ({
  mode,
  onModeChange,
  jobLink,
  onJobLinkChange,
  jobDescription,
  onJobDescriptionChange,
}: JobInputSectionProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground block mb-4">
        Job Details
      </label>
      
      {/* Toggle Tabs */}
      <div className="glass-card p-1 inline-flex gap-1">
        <button
          onClick={() => onModeChange("link")}
          className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
            mode === "link" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {mode === "link" && (
            <motion.div
              layoutId="job-input-bg"
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-accent"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <Link className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Job Link</span>
        </button>
        <button
          onClick={() => onModeChange("description")}
          className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
            mode === "description" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {mode === "description" && (
            <motion.div
              layoutId="job-input-bg"
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-accent"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <FileText className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Job Description</span>
        </button>
      </div>

      {/* Input Fields */}
      {mode === "link" ? (
        <motion.div
          key="link"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <input
            type="url"
            value={jobLink}
            onChange={(e) => onJobLinkChange(e.target.value)}
            placeholder="https://example.com/job-posting..."
            className="glass-input"
          />
        </motion.div>
      ) : (
        <motion.div
          key="description"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <textarea
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            placeholder="Paste the job description here to help AI tailor your documents..."
            className="glass-input min-h-[180px] resize-none"
          />
        </motion.div>
      )}
    </div>
  );
};

export default JobInputSection;
