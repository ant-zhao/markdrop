// components/Footer.tsx
import { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaTiktok } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-12 py-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 md:justify-between">

        {/* LOGO + 社交 */}
        <div>
          <h2 className="font-bold text-lg mb-4">LOGO</h2>
          <div className="flex space-x-4 mb-6">
            <FaFacebookF className="w-5 h-5 cursor-pointer" />
            <FaInstagram className="w-5 h-5 cursor-pointer" />
            <FaYoutube className="w-5 h-5 cursor-pointer" />
            <FaPinterestP className="w-5 h-5 cursor-pointer" />
            <FaTiktok className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* HELP */}
        <div>
          <h3 className="font-semibold mb-4">HELP</h3>
          <ul className="space-y-2 text-sm">
            <li>Return & Warranty</li>
            <li>Shipping & Payment</li>
            <li>Terms Of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* 邮件订阅 */}
        <div className="md:pr-8">
          <h3 className="font-semibold mb-4">Receive Sacred Updates.</h3>
          <form className="flex bg-white text-black text-[0.8rem]">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 text-black font-medium focus:outline-none placeholder:text-black"
            />
            <button type="submit" className="px-2 py-2 cursor-pointer">
              →
            </button>
          </form>
        </div>

        {/* INFORMATION */}
        <div>
          <h3 className="font-semibold mb-4">INFORMATION</h3>
          <ul className="space-y-2 text-sm">
            <li>Contact Us</li>
            <li>Affiliate Program</li>
            <li>About Us</li>
            <li>Track Your Package</li>
            <li>Payment Method</li>
            <li>Wholesale</li>
          </ul>
        </div>

        {/* contact us */}
        <div>
          <h3 className="font-semibold mb-4">CONTACT US</h3>
          <ul className="space-y-2 text-sm">
            <li>service@HximaAura.com</li>
            <li>Mon - Fri 10:00 AM – 19:00 PM</li>
            <li>We aim to reply within 24–48 hours on business days</li>
          </ul>
        </div>
      </div>

      {/* 底部语言 + 版权 + 支付方式 */}
      <div className="mt-10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div>
          {/* 语言和货币选择 */}
          <div className="flex space-x-4">
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center px-4 leading-8 border-[0.5px] rounded-[2rem]">
                <span className="pr-2">English</span>
                <IoIosArrowDown />
              </MenuButton>
              <MenuItems anchor="top" modal={false} className="absolute mt-2 bg-white text-black rounded shadow">
                <MenuItem as={Fragment}>
                  {({ active }) => (
                    <button className={`block px-4 py-2 ${active && "bg-gray-100"}`}>
                      English
                    </button>
                  )}
                </MenuItem>
                <MenuItem as={Fragment}>
                  {({ active }) => (
                    <button className={`block w-full px-4 py-2 text-left ${active && "bg-gray-100"}`}>
                      中文
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>

            <Menu as="div" className="relative">
              <MenuButton className="flex items-center px-4 leading-8 border-[0.5px] rounded-[2rem]">
                <span className="pr-2">China (CNY ¥)</span>
                <IoIosArrowDown />
              </MenuButton>
              <MenuItems anchor="top" modal={false} className="absolute mt-2 bg-white text-black rounded shadow">
                <MenuItem as={Fragment}>
                  {({ active }) => (
                    <button className={`block px-4 py-2 ${active && "bg-gray-100"}`}>
                      China (CNY ¥)
                    </button>
                  )}
                </MenuItem>
                <MenuItem as={Fragment}>
                  {({ active }) => (
                    <button className={`block w-full px-4 py-2 text-left ${active && "bg-gray-100"}`}>
                      USD ($)
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>

          {/* 版权 */}
          <p className="text-sm py-8">© 2025 HimaAura Energy, All rights reserved.</p>
        </div>

        {/* 支付方式 (示意) */}
        <div className="flex space-x-2">
          <img src="/applepay.svg" alt="Apple Pay" className="h-6" />
          <img src="/visa.svg" alt="Visa" className="h-6" />
          <img src="/mastercard.svg" alt="MasterCard" className="h-6" />
        </div>
      </div>
    </footer>
  );
}
