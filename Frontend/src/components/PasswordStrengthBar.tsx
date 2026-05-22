import React from "react";

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

interface PasswordStrengthBarProps {
  strength: PasswordStrength;
}

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({ strength }) => {
  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                level <= strength.score ? strength.color : "#e7e5e4",
            }}
          />
        ))}
      </div>
      <p
        className="text-xs font-semibold ml-1"
        style={{ color: strength.color }}
      >
        {strength.label}
      </p>
    </div>
  );
};

export default PasswordStrengthBar;
