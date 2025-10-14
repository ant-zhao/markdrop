import Script from "next/script";
import SectionContainer from "@/components/common/SectionContainer";

export interface Section {
  id: string;
  title: string;
  content: React.ReactNode | string[];
}

interface AgreementLayoutProps {
  title: string;
  sections: Section[];
}

export default function AgreementLayout({ title, sections }: AgreementLayoutProps) {
  return (
    <SectionContainer>
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧目录 */}
        <aside className="md:w-64 flex-shrink-0 sticky top-24 h-fit self-start border-l pl-4">
          <h2 className="font-semibold mb-4 text-sm text-gray-600 uppercase">
            {title}
          </h2>
          <ul className="space-y-2">
            {sections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#agreement_section_${sec.id}`}
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {sec.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* 右侧正文 */}
        <article className="flex-1 space-y-16 pb-64">
          {sections.map((sec) => (
            <section key={sec.id} id={'agreement_section_' + sec.id} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4">{sec.title}</h2>
              {sec.content instanceof Array ? (
                <div className="text-gray-700 leading-relaxed">
                  {sec.content.map((item, index) => (
                    <p className="indent-[1rem] pb-2" key={index}>{item}</p>
                  ))}
                </div>
              ) : (
                <div className="text-gray-700 leading-relaxed">
                  {sec.content}
                </div>
              )}
            </section>
          ))}
        </article>
      </div>

      {/* ✅ 引入打包生成的独立 JS 文件 */}
      <Script
        id="agreement-scroll"
        strategy="afterInteractive"
      >
        {`
          (() => {
            const sections = Array.from(document.querySelectorAll("[id^='agreement_section_']")).map(
              (s) => s.id
            );

            const links = sections.map((id) => document.querySelector('a[href="#' + id + '"]'));
            function onScroll() {
              let activeId = sections[0];
              let minOffset = Infinity;

              for (const id of sections) {
                const el = document.getElementById(id);
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                const offset = Math.abs(rect.top - 120); // 离顶部 120px 最近的 section
                if (rect.top <= window.innerHeight/2 && offset < minOffset) {
                  minOffset = offset;
                  activeId = id;
                }
              }

              links.forEach((link) => {
                if (!link) return;
                if (link.getAttribute("href") === "#" + activeId) {
                  link.classList.add("text-indigo-600", "font-semibold");
                } else {
                  link.classList.remove("text-indigo-600", "font-semibold");
                }
              });
            }

            window.addEventListener("scroll", onScroll, { passive: true });
            onScroll();
          })();
        `}
      </Script>
    </SectionContainer>
  );
}
