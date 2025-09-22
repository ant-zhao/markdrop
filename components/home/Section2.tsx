import SectionContainer from "@/components/common/SectionContainer"
import FeatureRow from "@/components/home/FeatureRow"
import image1 from "@/assets/image/home/image_1.webp";


const Section2 = () => {
  const features = [
    {
      images: ["https://picsum.photos/80/80", "https://placebear.com/80/80"],
      title: (
        <>
          <span className="text-[#5B70F8]">Remove</span> All Types of
          <br />Complex Watermarks
        </>
      ),
      description: "No matter how tricky the watermark is-text, logos, patterns, or semi-transparentoverlays-our tool can handle it with precision. lt works for personal photos, productimages, travel pictures, and more, giving you a clean, natural resuit every time",
    },
    {
      images: ["https://picsum.photos/80/80", "https://placebear.com/80/80"],
      title: (
        <>
          <span className="text-[#5B70F8]">AI-Powered</span> Watermark <br />Detection
        </>
      ),
      description: "Advanced Al automatically detects the exact position and shape of watermarks. Yoldon't need to spend time manually erasing or editing our smart algorithm does thework for you, saving time while ensuring high accuracy",
    },
    {
      images: ["https://picsum.photos/80/80", "https://placebear.com/80/80"],
      title: (
        <>
          <span className="text-[#5B70F8]">Lossless Image Quality</span>{" "}
          <br />Preservation
        </>
      ),
      description: "We know image quality matters. That's why our tool keeps your photos sharp, detailedand in original resolution. Say goodbye to pixelated or blurry results every photostays clear and professional.",
    },
    {
      images: [image1],
      title: (
        <>
          <span className="text-[#5B70F8]">Easy Operation & Multiple</span>{" "}
          <br />Format Support
        </>
      ),
      description: "No complicated software or editing skills required. Just upload your photo, clickremove, and download the watermark-free image. it supports JPG, PNG, BMP GIFand more, making it perfect for any use case.",
    },
  ]

  return (
    <section className="pt-4 w-full">
      <SectionContainer>
        <div className="w-full overflow-hidden pt-2 text-center">
          <h2 className="text-3xl font-bold py-2">
            Powerful Features to <span className="text-[#5B70F8]">Remove Watermarks Perfectly</span>
          </h2>
          <p className="text-[0.9rem] text-[#000000] py-1">
            Advanced Al technology ensures cean, high-quality images with ease and speed
          </p>
        </div>
        <div className="w-full flex flex-col gap-32 py-24">
          {features.map((feature, index) => (
            <FeatureRow
              key={index}
              images={feature.images}
              title={feature.title}
              description={feature.description}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}

export default Section2;
