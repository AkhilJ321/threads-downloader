import React, { useEffect, useState } from 'react';
import { ThreadsPost, MediaCandidate } from '@/util/types/ThreadsPost';
import Loader from './Loader';

const handleImageDownload = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = `thread_image.jpg`; // Customize the filename as needed
  link.click();
  setTimeout(() => {
    link.remove();

    window.URL.revokeObjectURL(url);
  }, 3000);
};
const handleVideoDownload = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = `thread_video.mp4`; // Customize the filename as needed
  link.click();

  setTimeout(() => {
    link.remove();
    window.URL.revokeObjectURL(url);
  }, 3000);
};

const MediaItem = ({ data }: { data: ThreadsPost }) => {
  const [candidate, setCandidate] = useState<MediaCandidate[]>();

  useEffect(() => {
    setCandidate(data.media.candidates);
  }, [data]);

  return (
    <div className=" py-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {candidate &&
        candidate.map((item) =>
          item.type === 'image' ? (
            <div
              key={item.url}
              className="bg-white text-center rounded-lg shadow-md overflow-hidden "
            >
              <img
                src={'/api?url=' + item.url}
                alt=""
                className="w-full  object-cover"
              />
              <button
                onClick={() => handleImageDownload('/api?url=' + item.url)}
                className="px-4 py-2 w-[100%] text-white bg-black rounded-sm hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-700"
              >
                Download
              </button>
            </div>
          ) : (
            <div
              key={item.url}
              className="bg-white text-center rounded-lg shadow-md overflow-hidden"
            >
              <video controls>
                <source
                  src={'/api?url=' + item.url}
                  type="video/mp4"
                  className="w-full  object-cover"
                />
              </video>
              <button
                onClick={() => handleVideoDownload('/api?url=' + item.url)}
                className="px-4 py-2 w-[100%] text-white bg-black rounded-sm hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-700"
              >
                Download
              </button>
            </div>
          )
        )}
    </div>
  );
};

export default MediaItem;
