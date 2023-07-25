'use client';
import React, { FormEvent, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { ThreadsPost } from '@/util/types/ThreadsPost';
import MediaItem from './MediaItem';

const Home = () => {
  const [threadLink, setThreadLink] = useState('');
  const [data, setData] = useState<ThreadsPost>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreadLink(e.target.value);
    if (threadLink.trim() === '') {
      setError('');
    } else if (!threadLink.startsWith('https://www.threads.net/')) {
      setError('Please Enter a Valid Instagram thread URL.');
    } else {
      setError('');
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api', {
        headers: {
          'Content-Type': 'application/json',
        },
        url: threadLink,
      });
      const jsonData = response.data.data;

      setData(jsonData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error fetching data. Please try again.');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (threadLink.trim() === '') {
      setError('Please Enter a Valid URL.');
    } else if (!threadLink.startsWith('https://www.threads.net/')) {
      setError('Please Enter a Valid Instagram thread URL.');
    } else {
      setError('');
      await fetchData();
    }
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
    <div className="h-80vh m-2 md:m-3 lg:m-4 py-10 justify-center items-center ">
      <div className="p-3 md:p-4 lg:p-5">
        {/* <div>Logo</div> */}
        <section className="px-2 py-2 md:py-2 lg:py-4 justify-center ">
          <div className="justify-center text-center">
            <h1 className="text-3xl font-bold text-black uppercase">
              <span className="text-black text-[100%] md:text-4xl lg:text-7xl ">
                {' '}
                Thread Downloader
              </span>
            </h1>
          </div>
          <p className="text-black/50 m-2 text-[75%] md:text-2xl  text-center">
            Download your favorite Instagram Thread to your device
          </p>
          <div className="my-4 py-3">
            {/* Form */}
            <form
              className=" justify-center text-center"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="w-[100%] md:w-2/5  px-4 py-2 border border-gray-300  focus:outline-none  "
                placeholder="Paste your text here"
                value={threadLink}
                onChange={handleInputChange}
              />
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
          <div className="flex space-x-4 justify-center text-center">
            {/* Buttons */}
            <button
              type="button"
              className="px-2 py-2 text-white bg-black rounded-sm hover:bg-gray-800 "
              onClick={handlePaste}
            >
              Paste Link
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-black rounded-sm hover:bg-gray-800 "
            >
              Download
            </button>
          </div>
          {/* Loader */}
          {loading && (
            <div className=" my-2 flex items-center justify-center mb-8">
              <Loader />
            </div>
          )}
          {data ? <MediaItem data={data} /> : <div></div>}
        </section>
      </div>
    </div>
  );
};

export default Home;
