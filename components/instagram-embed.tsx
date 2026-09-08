"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

let instagramScript: Promise<void> | undefined;

function loadInstagramScript() {
  if (window.instgrm?.Embeds) return Promise.resolve();
  if (instagramScript) return instagramScript;

  instagramScript = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-instagram-embed]",
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Instagram embed failed to load")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.dataset.instagramEmbed = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Instagram embed failed to load"));
    document.body.appendChild(script);
  });

  return instagramScript;
}

export default function InstagramEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    loadInstagramScript()
      .then(() => {
        if (!cancelled) window.instgrm?.Embeds?.process();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div ref={ref} className="instagram-embed">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        data-instgrm-captioned="false"
      />
    </div>
  );
}
