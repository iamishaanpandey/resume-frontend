import { motion } from "framer-motion";

interface SegmentedControlProps {
  value: "resume" | "cover-letter";
  onChange: (value: "resume" | "cover-letter") => void;
}

const SegmentedControl = ({ value, onChange }: SegmentedControlProps) => {
  return (
    <div className="glass-card p-1 inline-flex gap-1">
      <button
        onClick={() => onChange("resume")}
        className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
          value === "resume" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {value === "resume" && (
          <motion.div
            layoutId="segment-bg"
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-accent"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}
        <span className="relative z-10">Resume</span>
      </button>
      <button
        onClick={() => onChange("cover-letter")}
        className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
          value === "cover-letter" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {value === "cover-letter" && (
          <motion.div
            layoutId="segment-bg"
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-accent"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}
        <span className="relative z-10">Cover Letter</span>
      </button>
    </div>
  );
};

export default SegmentedControl;
