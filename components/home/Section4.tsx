import { useState } from 'react';
import { Transition } from '@headlessui/react';
import SectionContainer from "@/components/common/SectionContainer";
import PlusIcon from "@/assets/icon/Plus";

const FAQItem = ({ question, answer, index }: {
  question: string;
  answer: string;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="border-b border-gray-200 pt-4 pb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left cursor-pointer"
      >
        <span className="font-bold">{question}</span>
        <PlusIcon isOpen={isOpen} />
      </button>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 h-0"
        enterTo="opacity-100 h-auto"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100 h-auto"
        leaveTo="opacity-0 h-0"
      >
        <div className="box-border text-black prose prose-sm max-w-none overflow-hidden">
          <p className="pt-4 text-[0.8rem]">{answer}</p>
        </div>
      </Transition>
    </div>
  );
};

const faqData = [
  {
    question: 'Can I try the watermark remover for free?',
    answer: 'Yes! Every user can try it for free once, with full access to all features and the ability to download the cleaned image',
  },
  {
    question: 'Does the tool reduce the image quality after removing the watermark?',
    answer: 'No. Our AI technology ensures lossless quality preservation. Your images remain sharp, clear, and in their original resolution without any pixelation or blurriness.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'We support a wide range of formats, including JPG, PNG, BMP, GIF, and more. You can upload almost any common image type, and the watermark will be removed instantly.',
  },
  {
    question: 'Do I need to install any software?',
    answer: 'Not at all. Our tool is 100% online—no downloads or installations required. Simply upload your photo, click remove, and download the clean image directly from your browser.',
  },
  {
    question: 'How long does it take to remove a watermark?',
    answer: 'It’s instant. Once you upload your photo, our AI automatically detects and removes the watermark in just a few seconds.',
  },
  {
    question: 'Is my uploaded image safe and private?',
    answer: 'Absolutely. Your images are processed securely, and we do not store or share any files. All uploads are automatically deleted after processing to guarantee your privacy.',
  },
];


const Section4 = () => {
  return (
    <section className="pt-24 w-full">
      <SectionContainer>
        <div className="w-full overflow-hidden pt-2 text-center">
          <h2 className="text-3xl font-bold py-2">
            Frequently Asked Questions
          </h2>
          <p className="text-[0.9rem] text-[#000000] py-1">
            Find answers to the most common questions about our Al watermark remover
          </p>
        </div>
        <div className="w-full pt-12">
          {faqData.map((item, index) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              index={index}
            />
          ))}
        </div>
      </SectionContainer>
    </section>

  )
}

export default Section4;
