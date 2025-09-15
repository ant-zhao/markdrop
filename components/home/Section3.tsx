import Image from "next/image";
import SectionContainer from "@/components/SectionContainer";
import image1 from "@/assets/image/home/Group69@2x.webp";
import image2 from "@/assets/image/home/Group70@2x.webp";
import image3 from "@/assets/image/home/Group71@2x.webp";
import image4 from "@/assets/image/home/Group72@2x.webp";

const Section3 = () => {
  const infos = [
    {
      icon: image1,
      title: 'Step 1 - Upload Your lmage',
      description: 'Simply drag and drop your photo or click "Upload" on this page. Our tool supports JPG, PNG, BMPand more.',
    },
    {
      icon: image2,
      title: 'Step 2 - Al Detects and Removes the Watermark',
      description: 'Once uploaded, our powerfu Al automatically identifes and removes the watermark. No manualediting is required, and the process starts instantly.',
    },
    {
      icon: image3,
      title: 'Step 3-Download and Use Anywhere for Free',
      description: 'Get your clean, watermark-free image in seconds. Download it for free and use it for work, personal projects,social media ,e-commerce,and more.',
    }
  ]

  return (
    <section className="pt-4 w-full">
      <SectionContainer>
        <div className="w-full overflow-hidden pt-2 text-center">
          <h2 className="text-3xl font-bold py-2">
            How to Use Our Al Watermark Remover
          </h2>
          <p className="text-[0.9rem] text-[#000000] py-1">
            Remove any watermark in just 3 simple steps-fast, easy, and completely free
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-2 pt-10">
          <div className="w-full md:w-3/5">
            {infos.map((info, index) => (
              <div className="flex items-center gap-4 pt-8">
                <Image
                  src={info.icon}
                  alt="feature"
                  className="w-[4rem] h-[4rem]"
                />
                <div key={index} className="flex-1 flex flex-col gap-2">
                  <h3 className="text-[1rem] font-bold">{info.title}</h3>
                  <p className="text-[0.7rem] text-[#000000] py-1 leading-tight">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-2/5">
            <Image
              src={image4}
              alt="feature"
              className="w-full h-auto"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

export default Section3;
