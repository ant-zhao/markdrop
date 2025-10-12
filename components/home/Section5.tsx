
import Script from "next/script";
import SectionContainer from "@/components/common/SectionContainer";

// 评论数据（评分、标题、内容、用户头像、姓名、地区）
const reviews = [
  {
    rating: 5,
    title: "Perfect for My Online shop",
    content:
      "This tool helps me clean up product images for my e-commerce store. Saves me so much time! My listings look so much more professional now.",
    avatar: "https://picsum.photos/80/80", // 替换为实际头像路径
    name: "Emily R.",
    location: "Canada",
  },
  {
    rating: 5,
    title: "So Quick and Easy!",
    content:
      "Just upload, click remove, and it's done. Took less than 10 seconds for my photo. I didn’t even need any editing skills.",
    avatar: "https://picsum.photos/80/80",
    name: "Jason L.",
    location: "USA",
  },
  {
    rating: 5,
    title: "Saved My Travel Photos",
    content: "I thought my vacation pictures were ruined by big logos, but this tool cleaned them up perfectly. Now I can finally share them on social media.",
    avatar: "https://picsum.photos/80/80",
    name: "Sarah W.",
    location: "UK",
  },
  {
    rating: 5,
    title: "High Quality Results",
    content:
      "Didn’t expect the photo to stay this sharp. No blur, no pixelation—looks original. It's like the watermark was never there.",
    avatar: "https://picsum.photos/80/80",
    name: "Daniel K.",
    location: "USA",
  },
  {
    rating: 5,
    title: "No Downloads Needed",
    content:
      "Love that it works straight in the browser. Super convenient and supports all my file types. I can use it anywhere, even on my laptop at work.",
    avatar: "https://picsum.photos/80/80",
    name: "Monica T.",
    location: "Australia",
  },
  {
    rating: 5,
    title: "Safe and Secure",
    content:
      "I was worried about privacy, but knowing files auto-delete makes me feel comfortable using it. I can upload personal photos without stress.",
    avatar: "https://picsum.photos/80/80",
    name: "Alex G.",
    location: "USA",
  },
  {
    rating: 5,
    title: "Great for Business Use",
    content:
      "I use it for product shots on my online store. Looks professional and saves me hours of editing. My customers can focus on the products, not the watermarks.",
    avatar: "https://picsum.photos/80/80",
    name: "Kevin M.",
    location: "USA",
  },
  {
    rating: 5,
    title: "Instant Watermark Removal",
    content:
      "This is the fastest tool I’ve tried. Watermarks gone in seconds with zero quality loss. Honestly feels like magic every time I use it.",
    avatar: "https://picsum.photos/80/80",
    name: "Laura P.",
    location: "Canada",
  },
];

const allReviews = [...reviews, ...reviews];

// 星级组件（5 颗星）
const Stars = ({ rating = 5 }: { rating?: 0 | 1 | 2 | 3 | 4 | 5 }) => {
  const grayStars = 5 - rating;
  return (
    <div className="flex space-x-1">
      <div className="flex space-x-1 text-yellow-400">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <div className="flex space-x-1 text-gray-400">
        {[...Array(grayStars)].map((_, i) => (
          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

// 单个评论卡片
const ReviewCard = ({ review, small }: {
  review: typeof reviews[0],
  small?: boolean
}) => (
  <div className={`bg-white rounded-lg card-shadow flex-shrink-0 ${small ? "w-80 py-2 px-4" : "w-full p-6"}`}>
    <Stars />
    <h3 className="text-md font-medium mt-2">{review.title}</h3>
    <p className="text-gray-600 mt-2 text-[0.8rem] overflow-hidden text-ellipsis line-clamp-2">{review.content}</p>
    <div className="flex items-center flex-row-reverse mt-4">
      <p className="ml-3 text-gray-700 text-[0.8rem]">-- {review.name}, {review.location}</p>
      <img
        src={review.avatar}
        alt={review.name}
        className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300"
      />
    </div>
  </div>
);

function Section5() {
  return (
    <section className="pt-24 w-full">
      <SectionContainer>
        <div className="w-full overflow-hidden pt-2 text-center">
          <h2 className="text-3xl font-bold py-2">What Our Users Say</h2>
          <p className="text-[0.9rem] text-[#000000] py-1">
            Trusted by thousands of users worldwide, see how our AI watermark remover makes a difference
          </p>
        </div>

        <div className="w-full pt-6">
          <div className="relative overflow-auto py-6">
            {/* 大屏：横向滚动容器 */}
            <div className="hidden md:block relative w-full">
              <div
                id="scroll-container"
                className="py-6 overflow-x-auto w-full md:flex space-x-6 no-scrollbar"
              >
                {allReviews.map((review, index) => (
                  <div className="flex-shrink-0" key={"card-" + index}>
                    <ReviewCard review={review} small />
                  </div>
                ))}
              </div>

              {/* 左右遮罩 */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
            </div>

            {/* 小屏：纵向排列 */}
            <div className="md:hidden grid grid-cols-1 gap-6 px-4">
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 内联客户端逻辑（无 hooks） */}
      <Script id="section5-scroll" strategy="afterInteractive">
        {`
          (() => {
            const scrollSpeed = 20;
            let animationFrameId = null;
            let mouseEnter = false;
            const container = document.getElementById("scroll-container");
            if (!container) return;

            const handleScroll = () => {
              const gap = parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.25 * 6 / 2;
              if (container.scrollLeft >= container.scrollWidth / 2 + gap) {
                container.scrollLeft = 0;
              }
            };

            const animateScroll = () => {
              if (!container || container.style.display === "none" || mouseEnter) return;
              container.scrollLeft += scrollSpeed / 40;
              animationFrameId = requestAnimationFrame(animateScroll);
            };

            const updateMouseEnter = (e) => {
              mouseEnter = e.type === "mouseenter";
              if (mouseEnter) {
                cancelAnimationFrame(animationFrameId);
              } else {
                animationFrameId = requestAnimationFrame(animateScroll);
              }
            };

            container.addEventListener("scroll", handleScroll);
            container.addEventListener("mouseenter", updateMouseEnter);
            container.addEventListener("mouseleave", updateMouseEnter);

            animationFrameId = requestAnimationFrame(animateScroll);

            window.addEventListener("beforeunload", () => {
              cancelAnimationFrame(animationFrameId);
              container.removeEventListener("scroll", handleScroll);
              container.removeEventListener("mouseenter", updateMouseEnter);
              container.removeEventListener("mouseleave", updateMouseEnter);
            });
          })();
        `}
      </Script>
    </section>
  );
}
export default Section5;
