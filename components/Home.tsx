'use client';
import React, { FormEvent, useState, useEffect } from 'react';

import axios from 'axios';

const Home = () => {
  const [threadLink, setThreadLink] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreadLink(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const handleDownloadMedia = async () => {
      if (data && data.media.mediaType === 'singleImage') {
        // For photo media, create an anchor element and trigger the download
        const link = document.createElement('a');
        link.href = data.media.candidates[0].url;
        link.download = `thread_image_${data.id}.jpg`; // Customize the filename as needed
        link.click();
      } else if (data && data.media.mediaType === 'singleVideo') {
        // For video media, create an anchor element and trigger the download
        const link = document.createElement('a');
        link.href = data.media.candidates[0].url;
        link.download = `thread_video_${data.id}.mp4`; // Customize the filename as needed
        link.click();
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api', {
          headers: {
            'Content-Type': 'application/json',
          },
          url: threadLink,
        });
        const jsonData = response.data.data;

        console.log(jsonData);
        setData(jsonData);

        if (jsonData && jsonData.media.mediaType === 'singleImage') {
          const bufferRes = await axios.get(
            '/api?url=' + response.data.data.media.candidates[0].url,
            {
              responseType: 'arraybuffer',
            }
          );

          const blob = new Blob([bufferRes.data], { type: 'image/jpeg' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `thread_image.jpg`; // Customize the filename as needed
          link.click();
          setTimeout(() => {
            link.remove();
            window.URL.revokeObjectURL(url);
          }, 3000);
        } else if (jsonData && jsonData.media.mediaType === 'singleVideo') {
          const bufferRes = await axios.get(
            '/api?url=' + response.data.data.media.candidates[0].url,
            {
              responseType: 'arraybuffer',
            }
          );

          const blob = new Blob([bufferRes.data], {
            type: 'video/mp4',
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `thread_video.mp4`; // Customize the filename as needed
          link.click();
          setTimeout(() => {
            link.remove();
            window.URL.revokeObjectURL(url);
          }, 3000);
        } else if (jsonData && jsonData.media.mediaType === 'carousel') {
          for (let i = 0; i < jsonData.media.candidates.length; i++) {
            const bufferRes = await axios.get(
              '/api?url=' + jsonData.media.candidates[i].url,
              {
                responseType: 'arraybuffer',
              }
            );

            const blob = new Blob([bufferRes.data], {
              type:
                jsonData.media.candidates[i].type === 'video'
                  ? 'video/mp4'
                  : 'image/jpeg',
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const extension =
              jsonData.media.candidates[i].type === 'video' ? 'mp4' : 'jpg';
            link.download = `thread_image.${extension}`; // Customize the filename as needed
            link.click();
            setTimeout(() => {
              link.remove();
              window.URL.revokeObjectURL(url);
            }, 3000);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    await fetchData();
    // await handleDownloadMedia();

    // if (data.length != 0) {
    //   const mediaArray = data.forEach((media) => {});
    // }
  };

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setThreadLink(text);
      })
      .catch((error) => {
        console.error('Error reading clipboard: ', error);
      });
  };

  return (
    <div className="h-80vh m-4 py-20 justify-center items-center ">
      <div className="p-4">
        <div>Logo</div>
        <section className="p-4 justify-center ">
          <div className="justify-center text-center">
            <h1 className="text-3xl font-bold text-black uppercase">
              <span className="text-black text-6xl"> Thread Downloader</span>
            </h1>
          </div>
          <p className="text-black/50 m-2 text-2xl text-center">
            Download your favorite Instagram Thread to your device
          </p>
          <div className="my-4">
            {/* Form */}
            <form
              className=" justify-center text-center"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="w-2/5 px-4 py-2 border border-gray-300  focus:outline-none  "
                placeholder="Paste your text here"
                value={threadLink}
                onChange={handleInputChange}
              />
            </form>
          </div>
          <div className="flex space-x-4 justify-center text-center">
            {/* Buttons */}
            <button
              type="button"
              className="px-4 py-2 text-white bg-black rounded-sm hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-700"
              onClick={handlePaste}
            >
              Paste Link
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-black rounded-sm hover:bg-gray-800 focus:outline-none focus:ring focus:ring-green-400"
            >
              Download
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
