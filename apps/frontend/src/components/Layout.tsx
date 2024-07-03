import { useState, useEffect, Fragment, ReactNode } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Transition } from "@headlessui/react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showNav, setShowNav] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (window.innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav} setShowNav={setShowNav} />
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms] ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 md:px-16">{children}</div>
      </main>
    </>
  );
}
