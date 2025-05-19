import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export function ScrollToTop() {
  const { url } = usePage();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [url]);

  return null;
}
