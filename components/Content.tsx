'use client';
import React, { useState } from 'react';
import faqData from '@/data/faqData';

const Content = () => {
  const [activeQuestion, setActiveQuestion] = useState('');

  const toggleAnswer = (question: any) => {
    setActiveQuestion(activeQuestion === question ? '' : question);
  };
  return (
    <div className="w-[86%] md:w-[60%] lg:w-[70%] mx-auto flex flex-col  py-8 text-justify items-center justify-center">
      <section className="mb-8 text-justify justify-center">
        {/* About */}
        <h1 className="text-4xl font-bold mb-4 uppercase text-center">
          <span className="border-b-2 ">About</span>
        </h1>
        <p className=" text-black/70 text-justify ">
          Are you tired of losing track of engaging Instagram threads? Look no
          further! At XYZ - Instagram Threads Downloader, we offer a convenient
          and user-friendly solution to download all those insightful and
          entertaining Instagram threads. Now, you can easily revisit and
          explore these engaging conversations later, share them with friends
          and family, or create your own collection of valuable and
          thought-provoking threads. Unlock the power of Instagram Threads with
          XYZ - Instagram Threads Downloader! Begin your journey of downloading
          your favorite threads today and immerse yourself in the world of
          organized and captivating content.
        </p>
      </section>
      <section className="mb-8">
        {/* Features */}
        <h1 className="text-4xl font-bold mb-4 uppercase text-center">
          Features
        </h1>
        <p>
          Are you looking for a reliable and efficient way to download Instagram
          Reels videos? Look no further than Savein - Reels Downloader! With
          Savein, you can easily download your favorite Instagram Reels videos
          and enjoy them offline on any device. Let's explore the amazing
          features of Savein - Reels Downloader:
          <br />
          <span className="font-bold">
            No Watermark for Better Quality Visual Experiences:
          </span>
          <br />
          Savein- Reels Downloader understands the importance of visual quality
          and strives to provide you with the best experience. With Savein-
          Reels Downloader, you can download Instagram Reels videos without any
          annoying watermarks. Enjoy high-quality videos without any
          distractions!
          <br />
          <span className="font-bold">
            Download Instagram Reels Anytime, Anywhere - Absolutely Free:
          </span>
          <br />
          Savein- Reels Downloader empowers you to download Instagram Reels
          videos at your convenience. Whether you're on the go or relaxing at
          home, Savein- Reels Downloader is always available to fulfill your
          downloading needs. Best of all, it's completely free of cost! No
          hidden fees or subscriptions required.
        </p>
      </section>
      <section className="mb-8">
        {/* How To Section */}
        <h1 className="text-4xl font-bold mb-4 uppercase text-center">
          How To Download Threads
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          voluptatem sit temporibus quas velit enim esse accusamus
          necessitatibus saepe amet est sunt, excepturi odit sapiente officia.
          Tempora, iusto corrupti nemo ipsa, dignissimos laboriosam nesciunt
          corporis perspiciatis dolore ratione quidem reiciendis blanditiis
          nostrum quaerat. Qui iusto maiores culpa debitis eaque, nemo
          consectetur tenetur, animi dolores voluptatem consequatur!
        </p>
      </section>
      <section className="mb-8">
        {/* Why */}
        <h1 className="text-4xl font-bold mb-4 uppercase text-center">Why</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
          aspernatur laboriosam distinctio explicabo vero laudantium modi
          commodi voluptatibus dolores alias laborum perferendis facilis
          voluptates consequatur accusamus error, qui, sunt cupiditate et.
          Deserunt et distinctio accusantium dolorum nobis. Porro beatae
          voluptate perferendis ipsum possimus est veniam exercitationem nam,
          rerum adipisci totam facilis magni fuga maxime quae natus?
        </p>
      </section>
      <div className="mb-8">
        {/* FAQ */}
        <h1 className="text-4xl font-bold mb-4 uppercase text-center">
          Frequently Asked Questions
        </h1>
        {faqData.map((item, index) => (
          <div key={index} className="mb-4">
            <button
              className="w-full text-left font-semibold bg-gray-200 rounded-md px-4 py-2 focus:outline-none"
              onClick={() => toggleAnswer(item.question)}
            >
              {item.question}
            </button>
            {activeQuestion === item.question && (
              <div className="mt-2 px-4 py-2 bg-gray-100 rounded-md text-sm">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
