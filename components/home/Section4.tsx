import { useState } from 'react';
import { Transition } from '@headlessui/react';
import SectionContainer from "@/components/SectionContainer";
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
    answer: '通常不会哦，我们的工具采用先进算法，在移除水印时会尽可能保持图像原本的质量，让你既能去掉水印，又能拥有清晰的画面。',
  },
  {
    question: 'What image formats are supported?',
    answer: '我们支持多种常见图像格式，像 JPG、PNG、WEBP 等都不在话下，满足你不同的图像格式需求，方便你上传各种类型的图片来进行水印移除操作。',
  },
  {
    question: 'Do I need to install any software?',
    answer: '不需要安装任何软件哦，这是一款在线工具，你只要有网络，通过浏览器访问我们的网站，就能直接使用水印移除功能，简单又方便。',
  },
  {
    question: 'How long does it take to remove a watermark?',
    answer: '移除水印的时间取决于图像的大小和复杂度，一般来说，简单的水印几秒到十几秒就能搞定，复杂一些的可能需要几十秒，但整体都能快速完成，不会让你等待太久。',
  },
  {
    question: 'Is my uploaded image safe and private?',
    answer: '你的上传图片是安全且私密的，我们会采取严格的安全措施，确保你的图片不会被泄露或非法使用，处理完成后，相关数据也会在一定时间后清除，保护你的隐私。',
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
