'use client'
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import cx from 'classnames';
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks, { fixedPages } from '@/data/headerNavLinks'
import Logo from '@/components/Logo'
import Link from '@/components/common/Link'
import MobileNav from '@/components/MobileNav'
import UserState from '@/components/UserState'
import SectionContainer from "@/components/common/SectionContainer";

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > (headerRef.current?.clientHeight || 112)) { // 这里 50 可以改成你需要的滚动距离
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerRef]);

  let headerClass = 'w-full pt-2'
  if (siteMetadata.stickyNav || fixedPages.includes(pathname)) {
    headerClass += ' top-0 left-0 z-50'
  }
  if (fixedPages.includes(pathname)) {
    headerClass += ' fixed'
  }

  return (
    <header className={headerClass}>
      <SectionContainer>
        <div
          ref={headerRef}
          className={cx('flex items-center mx-auto flex-nowrap justify-between sm:rounded-[32px] py-2 gap-4 transition-[width,margin,padding] duration-500', {
            'bg-white/60 backdrop-blur-md shadow-md gap-12 py-3 w-max px-6': scrolled,
            'w-full sm:px-4': !scrolled
          })}
        >
          <Link href="/" aria-label={siteMetadata.headerTitle} className='flex-shrink-0'>
            <div className="flex items-center justify-between">
              <div className="mr-3 text-3xl">
                <Logo />
              </div>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="hidden h-6 text-2xl font-semibold sm:block">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
          <div className="no-scrollbar hidden items-center gap-x-4 overflow-x-auto sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-bold text-gray-900 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <UserState />
          <MobileNav />
        </div>
      </SectionContainer>
    </header>
  )
}

export default Header
