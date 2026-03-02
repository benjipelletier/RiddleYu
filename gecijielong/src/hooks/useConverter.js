import { useState, useEffect } from "react";
import * as OpenCC from "opencc-js";

export default function useConverter(script) {
  const [converter, setConverter] = useState(null);

  useEffect(() => {
    if (script === "traditional") {
      const c = OpenCC.Converter({ from: "cn", to: "tw" });
      setConverter(() => c);
    } else {
      const c = OpenCC.Converter({ from: "tw", to: "cn" });
      setConverter(() => c);
    }
  }, [script]);

  return (text) => {
    if (!converter || !text) return text;
    return converter(text);
  };
}
