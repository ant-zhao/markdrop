import React from "react";
import HomeIcon1 from "@/assets/icon/HomeIcon1";
import SectionContainer from "@/components/common/SectionContainer";
import ImageUpload from "@/components/common/ImageUpload";
import ImageSilder from "@/components/common/ImageSilder";

const cases = [
  {
    label: "People",
    left: require("@/assets/image/sample/people-watermark.webp"),
    right: require("@/assets/image/sample/people-watermark-remover.webp"),
  },
  {
    label: "Product",
    left: require("@/assets/image/sample/products-watermark.webp"),
    right: require("@/assets/image/sample/products-watermark-remover.webp"),
  },
  {
    label: "Travel",
    left: require("@/assets/image/sample/travel-watermark.webp"),
    right: require("@/assets/image/sample/travel-watermark-remover.webp"),
  },
  {
    label: "Logo",
    left: require("@/assets/image/sample/logo-watermark.jpg"),
    right: require("@/assets/image/sample/logo-watermark-remover.webp"),
  },
  {
    label: "Emoji",
    left: require("@/assets/image/sample/emoji-watermark.webp"),
    right: require("@/assets/image/sample/emoji-watermark-remover.webp"),
  },
];

export default function Section1() {
  const sectionId = React.useId().replace(/:/g, "-"); // SSR 安全唯一 ID

  return (
    <section
      id={`section1-${sectionId}`}
      className="pt-28 w-full bg-gradient-to-bl from-[#FFF6F2] via-[#FFF9EF] to-[#F0FFFD]"
    >
      <SectionContainer>
        <div className="w-full overflow-hidden text-center">
          {/* 顶部标题 */}
          <div className="flex items-center justify-center">
            <span className="text-4xl pr-2">
              <HomeIcon1 />
            </span>
            <p className="text-sm text-[#000000AA]">
              Video removal is now available
              <a
                href="#"
                className="text-[#5B70F8] underline pl-2 font-normal"
              >
                here
              </a>
            </p>
          </div>

          <h1 className="text-2xl font-bold">
            Free Watermark Remover Online - Remove Any Watermark with AI
          </h1>
          <p className="text-sm text-[#000000] py-4">
            Get high-quality, watermark-free photos instantly. No Photoshop or
            editing skills needed.
          </p>

          <div className="w-full pt-16">
            <ImageUpload />
          </div>

          <h2 className="text-3xl font-bold pt-24">
            Remove Watermarks for Any Use Case
          </h2>
          <p className="text-[0.9rem] text-[#000000] py-1">
            Perfect for personal, business, and creative needs clean photos in
            seconds
          </p>

          {/* 分类按钮 */}
          <div
            className="flex items-center justify-center text-[0.8rem] pb-4 pt-10 gap-6"
            data-case-buttons
          >
            {cases.map((c, i) => (
              <button
                key={i}
                data-case-index={i}
                className={`case-btn text-[#000000] font-semibold w-[4rem] py-1.5 text-center rounded-[2rem] cursor-pointer ${i === 0 ? "bg-[#5B70F8] text-white" : ""
                  }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* 图片展示区 */}
          <div
            className="case-container mx-auto max-w-2xl xl:max-w-3xl p-2 my-8 border-primary-300 rounded-sm border-dashed border"
            data-case-container
          >
            {cases.map((c, i) => (
              <div
                key={i}
                data-case-item
                className={`case-item ${i === 0 ? "block" : "hidden"}`}
              >
                <ImageSilder left={c.left} right={c.right} largeLine />
              </div>
            ))}
          </div>
        </div>

        {/* 交互脚本 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                const root = document.getElementById("section1-${sectionId}");
                if(!root) return;
                const buttons = root.querySelectorAll("[data-case-index]");
                const items = root.querySelectorAll("[data-case-item]");
                let active = 0;
                buttons.forEach((btn, idx) => {
                  btn.addEventListener("click", () => {
                    if(active === idx) return;
                    // 切换按钮样式
                    buttons[active].classList.remove("bg-[#5B70F8]", "text-white");
                    buttons[active].classList.add("text-[#000000]");
                    btn.classList.add("bg-[#5B70F8]", "text-white");
                    // 切换内容
                    items[active].classList.add("hidden");
                    items[idx].classList.remove("hidden");
                    active = idx;
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
