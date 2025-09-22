
import SectionContainer from "@/components/common/SectionContainer";
import { useEffect, useRef } from "react";

// 评论数据（评分、标题、内容、用户头像、姓名、地区）
const reviews = [
  {
    rating: 5,
    title: "Perfect for My Online shop",
    content:
      "This tool helps me clean up product images for my ecommerce store.Saves me so much time",
    avatar: "https://picsum.photos/80/80", // 替换为实际头像路径
    name: "Lucas M.",
    location: "Canada",
  },
  {
    rating: 5,
    title: "Quick and Easy!",
    content:
      "I removed a huge logo from my travel photo in just afew seconds. The result looks so natural!",
    avatar: "https://picsum.photos/80/80",
    name: "Lucas M.",
    location: "Canada",
  },
  {
    rating: 5,
    title: "No Quality Loss at All",
    content:
      "I was worried the image would look blurry, but the AIkept everything crystal clear. Amazing!",
    avatar: "https://picsum.photos/80/80",
    name: "Sophie L.",
    location: "UK",
  },
  {
    rating: 5,
    title: "Better Than Expected",
    content:
      "I was worried about the outcome, but it exceeded my expectations. Super happy with the result!",
    avatar: "https://picsum.photos/80/80",
    name: "Emma T.",
    location: "USA",
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

const Section5 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const mouseEnterRef = useRef<boolean>(false);
  const scrollSpeed = 20; // 滚动速度 (像素/秒)


  // 处理滚动逻辑
  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const gap = parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.25 * 6 / 2;
    // 当滚动到原始内容末尾时，重置到起始位置
    if (container.scrollLeft >= container.scrollWidth / 2 + gap) {
      container.scrollLeft = 0;
    }
  };

  // 平滑滚动动画
  const animateScroll = () => {
    if (
      !containerRef.current ||
      containerRef.current.style.display === 'none' ||
      mouseEnterRef.current
    ) return;

    // 基于时间差计算滚动距离
    containerRef.current.scrollLeft += (scrollSpeed / 40);
    animationFrameRef.current = requestAnimationFrame(animateScroll);
  };

  const updateMouseEnter = (event: MouseEvent) => {
    mouseEnterRef.current = event.type === 'mouseenter';
    if (mouseEnterRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    } else {
      animationFrameRef.current = requestAnimationFrame(animateScroll);
    }
  };

  // 初始化和清理动画
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animateScroll);

    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
      containerRef.current.addEventListener('mouseenter', updateMouseEnter);
      containerRef.current.addEventListener('mouseleave', updateMouseEnter);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
        containerRef.current.removeEventListener('mouseenter', updateMouseEnter);
        containerRef.current.removeEventListener('mouseleave', updateMouseEnter);
      }
    };
  }, []);


  return (
    <section className="pt-24 w-full">
      <SectionContainer>
        <div className="w-full overflow-hidden pt-2 text-center">
          <h2 className="text-3xl font-bold py-2">
            What Our Users Say
          </h2>
          <p className="text-[0.9rem] text-[#000000] py-1">
            Trusted by thousands of users worldwide, see how our Al watermark remover makes a difference
          </p>
        </div>
        <div className="w-full pt-6">
          <div className="relative overflow-auto py-6">
            {/* 大屏：横向滚动容器 + 动画 */}
            <div className="hidden md:block relative w-full">
              <div
                ref={containerRef}
                className="py-6 overflow-x-auto w-full md:flex space-x-6 no-scrollbar"
              >
                {allReviews.map((review, index) => (
                  <div className="flex-shrink-0" key={'card-' + index}>
                    <ReviewCard review={review} small />
                  </div>
                ))}
              </div>
              {/* 左侧遮罩 */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />

              {/* 右侧遮罩 */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
            </div>

            {/* 小屏：纵向排列容器 */}
            <div className="md:hidden grid grid-cols-1 gap-6 px-4">
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>

  )
}

export default Section5;
