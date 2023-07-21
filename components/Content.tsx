'use client';
import React, { useState } from 'react';
import faqData from '@/data/faqData';

const Content = () => {
  const [activeQuestion, setActiveQuestion] = useState('');

  const toggleAnswer = (question: any) => {
    setActiveQuestion(activeQuestion === question ? '' : question);
  };
  return (
    <div className=" w-5/6 mx-auto flex flex-col  py-8 text-justify items-center justify-center">
      <section className="mb-8 text-justify justify-center">
        {/* About */}
        <h1 className="text-4xl font-bold mb-4 uppercase text-center">
          <span className="border-b-2 gradient-border">About</span>
        </h1>
        <p className=" text-black/70 text-justify ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur illo
          accusantium veniam nulla illum impedit minus aperiam, suscipit autem
          modi alias molestiae sapiente tempore dolor quasi ducimus odit sint
          tempora placeat! Molestiae vitae facilis, rerum facere debitis harum
          modi incidunt perferendis omnis voluptatibus corrupti repellendus
          repellat accusantium quos commodi fugiat, iusto, consequuntur nemo
          veniam ipsam quae?
        </p>
      </section>
      <section className="mb-8">
        {/* Features */}
        <h1 className="text-4xl font-bold mb-4 uppercase text-center">
          Features
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium
          reprehenderit quaerat, sint in pariatur temporibus libero voluptatibus
          laborum obcaecati totam delectus doloribus quos cumque laboriosam
          voluptatem id accusantium? Impedit vel maiores perferendis, iure
          aperiam asperiores suscipit provident consequatur. Iure nostrum optio
          ducimus dolorum sequi vel sit doloribus, officia commodi maxime cum
          quos rerum vero distinctio laboriosam?
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
