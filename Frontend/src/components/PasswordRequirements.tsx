const PASSWORD_RULES = [
  { regex: /.{8,}/, text: "Mínimo 8 caracteres" },
  { regex: /[A-Z]/, text: "Una letra mayúscula" },
  { regex: /[a-z]/, text: "Una letra minúscula" },
  { regex: /\d/, text: "Un número" },
  { regex: /[\W_]/, text: "Un carácter especial (!@#$…)" },
];

const PasswordRequirements = ({ password }: { password: string }) => (
  <ul className="mt-2 space-y-0.5 ml-1">
    {PASSWORD_RULES.map(({ regex, text }) => {
      const met = regex.test(password);
      return (
        <li
          key={text}
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
            met ? "text-green-600" : "text-stone-400"
          }`}
        >
          <span className="material-symbols-outlined text-sm leading-none">
            {met ? "check_circle" : "radio_button_unchecked"}
          </span>
          {text}
        </li>
      );
    })}
  </ul>
);

export default PasswordRequirements;
