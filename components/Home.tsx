'use client';
import React, { FormEvent, useState } from 'react';

const Home = () => {
  const [threadLink, setThreadLink] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreadLink(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('hello');
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
              <span className=" text-red-300 text-7xl ">Instagram</span> <br />{' '}
              <span className="text-black text-6xl"> Thread Download</span>
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
