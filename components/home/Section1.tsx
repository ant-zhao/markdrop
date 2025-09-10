import HomeIcon1 from "@/assets/icon/HomeIcon1"
import SectionContainer from "../SectionContainer"
import ImageUpload from "./ImageUpload"

const Section1 = () => {
  return (
    <section className="pt-28 w-full bg-gradient-to-bl from-[#FFF6F2] to-[#F0FFFD]">
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
        </section>
      </SectionContainer>
    </section>
  )
}

export default Section1
