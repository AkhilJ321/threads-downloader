import React, { useState } from 'react';
import { ThreadsPost, MediaCandidate } from '@/util/types/ThreadsPost';
import axios from 'axios';
const getURL = async (data: ThreadsPost) => {
  const bufferRes = await axios.get(
    '/api?url=' + data.media.candidates[0].url,
    {
      responseType: 'arraybuffer',
    }
  );

  const blob = new Blob([bufferRes.data], { type: 'image/jpeg' });
  const url = window.URL.createObjectURL(blob);
  return url;
};

const MediaItem = async ({ data }: { data: ThreadsPost }) => {
  const [candidate, setCandidate] = useState<MediaCandidate[]>();
  const [url, setUrl] = useState<String>();
  const [urlArray, setUrlArray] = useState<String[]>();
  if (data != null) {
    setCandidate(data.media.candidates);
  }
  // if (candidate) {
  //   const urlArray: String[] = [];
  //   candidate.map((item) => getURL(item.url));
  // }

  return (
    <div>
      {candidate &&
        candidate.map((item) =>
          item.type === 'image' ? (
            <div>
              <img src={'/api?url=' + item.url} alt="" />
            </div>
          ) : (
            <div>
              <video controls>
                <source src={'/api?url=' + item.url} type="video/mp4" />
              </video>
            </div>
          )
        )}
    </div>
  );
};

export default MediaItem;
