import SectionContainer from "../common/SectionContainer"
import ImageUpload from "@/components/common/ImageUpload"
import ImageSilder from "@/components/common/ImageSilder"
import CustomLink from "@/components/common/Link"

const Section1 = () => {
  return (
    <section className="pt-28 h-[100vh] flex flex-col items-center justify-center w-full bg-gradient-to-bl from-[#FFF6F2] via-[#FFF9EF] to-[#F0FFFD]">
      <SectionContainer>
        <div className="w-full overflow-hidden text-center min-h-[300px] 2xl:min-h-[400px]">
          <p className="text-sm text-[#000000] py-4">
            Transforming multiple images?
            <CustomLink href="/batch_remove" className="text-[#000000] underline pl-2 font-bold">Try Batch Mode</CustomLink>
          </p>
          <div className="w-full pt-4">
            <ImageUpload showSampleImage={false} />
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

export default Section1
