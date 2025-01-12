'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function VideoPlayer() {
  const videoPrefix = 'https://storage.googleapis.com/ds1-yt-processed-videos/';
  const videoSrc = useSearchParams().get('v');

  if (!videoSrc) {
    return <p>Video not found!</p>;
  }

  return (
    <video controls src={videoPrefix + videoSrc}>
      Your browser does not support the video tag.
    </video>
  );
}

export default function Watch() {
  return (
    <div>
      <h1>Watch Page</h1>
      <Suspense fallback={<p>Loading video...</p>}>
        <VideoPlayer />
      </Suspense>
    </div>
  );
}