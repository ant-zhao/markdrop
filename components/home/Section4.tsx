import React from "react";
import SectionContainer from "@/components/common/SectionContainer";
import PlusIcon from "@/assets/icon/Plus";
import { Transition } from "@headlessui/react";

const faqData = [
  {
    question: "Can I try the watermark remover for free?",
    answer:
      "Yes! Every user can try it for free once, with full access to all features and the ability to download the cleaned image.",
  },
  {
    question: "Does the tool reduce the image quality after removing the watermark?",
    answer:
      "No. Our AI technology ensures lossless quality preservation. Your images remain sharp, clear, and in their original resolution without any pixelation or blurriness.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support a wide range of formats, including JPG, PNG, BMP, GIF, and more. You can upload almost any common image type, and the watermark will be removed instantly.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "Not at all. Our tool is 100% online—no downloads or installations required. Simply upload your photo, click remove, and download the clean image directly from your browser.",
  },
  {
    question: "How long does it take to remove a watermark?",
    answer:
      "It’s instant. Once you upload your photo, our AI automatically detects and removes the watermark in just a few seconds.",
  },
  {
    question: "Is my uploaded image safe and private?",
    answer:
      "Absolutely. Your images are processed securely, and we do not store or share any files. All uploads are automatically deleted after processing to guarantee your privacy.",
  },
];

export default function Section4() {
  const sectionId = React.useId().replace(/:/g, "-"); // 唯一 ID 防止冲突

  return (
    <section id={`faq-${sectionId}`} className="pt-24 w-full">
      <SectionContainer>
        {/* 标题区域 */}
        <div className="w-full overflow-hidden pt-2 text-center">
          <h2 className="text-3xl font-bold py-2">
            Frequently Asked Questions
          </h2>
          <p className="text-[0.9rem] text-[#000000] py-1">
            Find answers to the most common questions about our AI watermark remover
          </p>
        </div>

        {/* FAQ 列表 */}
        <div className="w-full pt-12" data-faq-container>
          {faqData.map((item, index) => (
            <div
              key={index}
              className="faq-item border-b border-gray-200 pt-4 pb-6"
              data-faq-index={index}
            >
              <button
                className="faq-toggle w-full flex justify-between items-center text-left cursor-pointer"
                data-faq-btn
              >
                <span className="font-bold">{item.question}</span>
                <span
                  className="faq-icon transition-transform duration-300"
                  data-faq-icon
                  style={{
                    transform: index === 0 ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <PlusIcon />
                </span>
              </button>
              <div
                className={`faq-content box-border text-black prose prose-sm max-w-none overflow-hidden transition-all duration-300 ease-in-out ${index === 0 ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                data-faq-content
              >
                <p className="pt-4 text-[0.8rem]">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 交互脚本 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                const root = document.getElementById("faq-${sectionId}");
                if(!root) return;
                const items = root.querySelectorAll("[data-faq-index]");
                items.forEach(item => {
                  const btn = item.querySelector("[data-faq-btn]");
                  const content = item.querySelector("[data-faq-content]");
                  const icon = item.querySelector("[data-faq-icon]");
                  btn.addEventListener("click", () => {
                    const isOpen = content.classList.contains("max-h-[200px]");
                    // 收起所有
                    items.forEach(i=>{
                      i.querySelector("[data-faq-content]")?.classList.remove("max-h-[200px]","opacity-100");
                      i.querySelector("[data-faq-content]")?.classList.add("max-h-0","opacity-0");
                      i.querySelector("[data-faq-icon]")?.style.setProperty("transform","rotate(0deg)");
                    });
                    // 展开当前
                    if(!isOpen){
                      content.classList.remove("max-h-0","opacity-0");
                      content.classList.add("max-h-[200px]","opacity-100");
                      icon.style.setProperty("transform","rotate(45deg)");
                    }
                  });
                });
              })();
            `,
          }}
        />
      </SectionContainer>
    </section>
  );
}
