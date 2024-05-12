import copyToClipboard from "copy-to-clipboard";
import { useRef, useEffect, useCallback } from "react";

export default function useCopy(str: string): [() => void] {
  const copyableString = useRef(str);

  const copyAction = useCallback(() => {
    copyToClipboard(copyableString.current);
  }, [copyableString]);

  useEffect(() => {
    copyableString.current = str;
  }, [str]);

  return [copyAction];
}
