import cx from 'classnames';
import siteMetadata from '@/data/siteMetadata'
import Image from "next/image";
import headerNavLinks, { roundedHeaderPages } from '@/data/headerNavLinks'
import Link from '@/components/common/Link'
import MobileNav from '@/components/MobileNav'
import UserState from '@/components/UserState'
import SectionContainer from "@/components/common/SectionContainer";
import HeaderScript from './HeaderScript';
import Logo from '../assets/image/logo.png';
import LogoMini from '../assets/image/logo_mini.png';

export default async function Header({
  customClass,
  containerId = 'header-inner',
  pathname = '',
}: {
  customClass?: string;
  containerId?: string;
  pathname?: string;
}) {
  const isFixed = !!roundedHeaderPages.find((p) => pathname.includes(p));
  const isSticky = siteMetadata.stickyNav || isFixed;

  let headerClass = "w-full";
  if (containerId === 'header-inner') {
    headerClass += " py-2";
  } else {
    headerClass += " py-1";
  }
  if (isFixed) headerClass += " fixed";
  if (isSticky) headerClass += " top-0 left-0 z-100";

  return (
    <header className={headerClass + `${customClass ? " " + customClass : ""}`}>
      <SectionContainer>
        <div
          id={containerId}
          className={cx(
            "flex items-center mx-auto flex-nowrap justify-between sm:rounded-[32px] py-2 gap-4 transition-[width,margin,padding] duration-500 w-full sm:px-4"
          )}
        >
          <Link href="/" aria-label={siteMetadata.headerTitle} className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className='sm:h-16 h-10'>
                <Image
                  alt='logo'
                  className="hidden sm:block h-full w-fit"
                  src={Logo}
                />
                <Image
                  alt='logo'
                  className="block sm:hidden h-full w-fit"
                  src={LogoMini}
                />
              </div>
            </div>
          </Link>

          <div className="no-scrollbar hidden items-center gap-x-4 overflow-x-auto sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== "/")
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={cx(
                    "hover:text-primary-500 dark:hover:text-primary-400 m-1 font-bold text-gray-900 dark:text-gray-100",
                    {
                      "text-primary-500": pathname.includes(link.href),
                    }
                  )}
                >
                  {link.title}
                </Link>
              ))}
          </div>

          <UserState />
          <MobileNav />
        </div>
      </SectionContainer>
      <HeaderScript />
    </header>
  );
}
