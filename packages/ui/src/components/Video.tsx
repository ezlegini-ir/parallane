"use client";

import Plyr, { PlyrOptions, PlyrSource } from "plyr-react";
import "plyr-react/plyr.css";
import React, { useMemo } from "react";

interface VideoProps {
  src: string;
  poster?: string;
}

const Video: React.FC<VideoProps> = ({ poster, src }) => {
  const subtitleUrl = useMemo(() => {
    try {
      return src.replace(/\.[^/.]+$/, ".vtt");
    } catch {
      return null;
    }
  }, [src]);

  const plyrProps: {
    source: PlyrSource;
    options: PlyrOptions;
  } = {
    source: {
      type: "video",
      poster,
      sources: [
        {
          src,
          type: "video/mp4",
          provider: "html5",
        },
      ],
      tracks: subtitleUrl
        ? [
            {
              kind: "captions",
              label: "English",
              src: subtitleUrl,
              srcLang: "en",
              default: true,
            },
          ]
        : [],
    },
    options: {
      speed: {
        selected: 1,
        options: [0.75, 1, 1.25, 1.5, 1.75, 2],
      },
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "captions",
        "settings",
        "fullscreen",
      ],
      settings: ["quality", "speed", "captions"],
      autoplay: false,
    },
  };

  return (
    <div>
      <Plyr crossOrigin="anonymous" {...plyrProps} />
    </div>
  );
};

export default Video;
