import SectionContainer from "../common/SectionContainer"
import ImageUpload from "@/components/common/ImageUpload"
import CustomLink from "@/components/common/Link"
import Section2 from "./Section2"

const Section1 = () => {
  return (
    <SectionContainer>
      <div className="w-full overflow-hidden text-center">
        <p className="text-sm text-[#000000] py-4">
          Transforming multiple images?
          <CustomLink href="/batch_remove" className="text-[#000000] underline pl-2 font-bold">Try Batch Mode</CustomLink>
        </p>
        <div className="w-full pt-4">
          <ImageUpload showSampleImage={false} />
        </div>
      </div>
    </SectionContainer>
  )
}

export default Section1
