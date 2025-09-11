import HomeIcon1 from "@/assets/icon/HomeIcon1"
import SectionContainer from "../SectionContainer"
import ImageUpload from "./ImageUpload"
import ImageSilder from "./ImageSilder"
import { useState } from "react"

const cases = [
  {
    label: 'People',
    left: "https://picsum.photos/80/80",
    right: "https://placebear.com/80/80"
  },
  {
    label: 'Product',
    left: "https://picsum.photos/80/80",
    right: "https://placebear.com/80/80"
  },
  {
    label: 'Travel',
    left: "https://picsum.photos/80/80",
    right: "https://placebear.com/80/80"
  },
  {
    label: 'Logo',
    left: "https://picsum.photos/80/80",
    right: "https://placebear.com/80/80"
  },
  {
    label: 'Meme',
    left: "https://picsum.photos/80/80",
    right: "https://placebear.com/80/80"
  }
]

const Section1 = () => {
  const [caseIndex, setCaseIndex] = useState(0)

  return (
    <section className="pt-28 w-full bg-gradient-to-bl from-[#FFF6F2] via-[#FFF9EF] to-[#F0FFFD]">
      <SectionContainer>
        <section className="w-full overflow-hidden text-center">
          <div className="flex items-center justify-center">
            <span className="text-4xl pr-2">
              <HomeIcon1 />
            </span>
            <p className="text-sm text-[#000000AA]">
              Video removal is now available
              <a href="#" className="text-[#5B70F8] underline pl-2 font-normal">here</a>
            </p>
          </div>
          <h1 className="text-2xl font-bold">Free Watermark Remover Online - Remove Any Watermark with AI</h1>
          <p className="text-sm text-[#000000] py-4">Get high-quality, watermark-free photos instantly. No Photoshop or editing skills needed.</p>
          <ImageUpload />
          <h2 className="text-3xl font-bold pt-24">Remove Watermarks for Any Use Case</h2>
          <p className="text-[0.9rem] text-[#000000] py-1">Perfect for personal, business, and creative needs clean photos in seconds</p>

          <div className="flex items-center justify-center text-[0.8rem] pb-4 pt-10 gap-6">
            {cases.map((caseItem, index) => (
              <button
                key={index}
                onClick={() => setCaseIndex(index)}
                style={{
                  ...caseIndex === index && {
                    color: '#ffffff',
                    backgroundColor: '#5B70F8',
                  }
                }}
                className="text-[#000000] font-semibold w-[4rem] py-1.5 text-center rounded-[2rem] cursor-pointer"
              >
                {caseItem.label}
              </button>
            ))}
          </div>
          <div
            className="mx-auto max-w-2xl xl:max-w-3xl h-[22rem] sm:h-[24rem] p-2 my-6 border-primary-300 rounded-sm border-dashed border"
          >
            <ImageSilder
              left={cases[caseIndex].left}
              right={cases[caseIndex].right}
              largeLine
            />
          </div>
        </section>
      </SectionContainer>
    </section>
  )
}

export default Section1
