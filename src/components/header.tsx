import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Image } from "@yext/pages-components";
import { onSearchFunc, SearchBar } from "@yext/search-ui-react";
import { Fragment, useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";

interface headerProps {
  _site: any;
  hasBanner?: boolean;
}

interface headerType {
  name: string;
  link: string;
}

const Header = ({ _site, hasBanner = false }: headerProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currItem, setCurrItem] = useState<string>("");
  const [isSearchPage, setIsSearchPage] = useState<boolean>(false);
  const [navBg, setNavBg] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const changeNavBg = () => {
    window.scrollY >= 50 ? setNavBg(true) : setNavBg(false);
  };

  useEffect(() => {
    const currentPath = window.location.pathname + window.location.search;
    const matchedItem = _site.c_header.find(
      (item: any) => item.link === currentPath
    );
    if (matchedItem) setCurrItem(matchedItem.link);
  }, [_site.c_header]);

  useEffect(() => {
    setIsSearchPage(window.location.pathname.includes("search"));
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    window.location.href = `/search.html?query=${query}`;
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <header
        className={`hidden md:block w-full top-0 z-50 py-2 ${navBg
          ? `bg-skin-banner shadow-md fixed`
          : hasBanner
            ? `bg-transparent fixed`
            : ``
          }`}
      >
        <nav
          className="centered-container flex flex-col md:flex-row md:items-center justify-between"
          aria-label="Primary Navigation"
        >

          <a
            href="/"
            className="flex-shrink-0 md:block flex items-center transition-all duration-300 pr-48 w-[150px] md:w-[330px] h-[50px] md:h-[60px]"
            aria-label="Homepage"
          >
            <img
              src={
                !navBg && hasBanner
                  ? "https://a.mktgcdn.com/p/ug4G9IPlS2kCXEoRP2QLaySysIC6ey-xUkqw4lUAzIE/3804x629.png" // Uploaded image when transparent
                  : _site.c_image.url // Yext image when scrolled
              }
              alt="Logo"
              className="w-full h-full object-cover transition-all duration-300"
              loading="lazy"
            />
          </a>


          {/* Desktop Menu */}
          <ul className="hidden lg:flex lg:space-x-8 md:items-center">
            {_site.c_header.map((item: headerType) => (
              <li key={item.link}>
                <a
                  href={item.link}
                  onClick={() => setCurrItem(item.name)}
                  className={`inline-flex items-center border-b-4 font-bold text-[#39852E] ${!navBg && hasBanner ? `!text-skin-banner` : ``
                    } px-1 pt-1 text-lg ${item.name === currItem
                      ? "border-primary"
                      : "border-transparent"
                    }`}
                  aria-current={item.link === currItem ? "page" : undefined}
                >
                  {item.name}
                </a>
              </li>
            ))}
            {!isSearchPage && (
              <li className="ml-auto">
                <button
                  onClick={handleOpen}
                  aria-label="Open Search"
                  className="flex items-center"
                >
                  <MagnifyingGlassIcon
                    className={`h-6 w-6 ${!navBg && hasBanner
                      ? `fill-skin-banner`
                      : `fill-skin-base`
                      }`}
                  />
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {/* Mobile Header */}
      <header
        className={`md:hidden py-6 p-8 w-full flex justify-between top-0 z-50 ${navBg
          ? `bg-skin-banner shadow-md fixed`
          : hasBanner
            ? `bg-transparent fixed`
            : `bg-skin-accent`
          }`}
      >
        <a href="/" aria-label="Homepage">
          <Image
            image={_site.c_image}
            className="!w-[130px] !md:w-full !max-w-none"
            loading="lazy"
          />
        </a>
        <article className="flex gap-4">
          {!isSearchPage && (
            <button
              name="Open search"
              onClick={handleOpen}
              aria-label="Open Search"
              className="flex items-center"
            >
              <MagnifyingGlassIcon
                className={`h-6 w-6 ${!navBg && hasBanner ? `fill-skin-banner` : `fill-skin-base`
                  }`}
              />
            </button>
          )}
          <button
            name="Mobile menu buttons"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            className="flex items-center"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon
                className={`h-6 w-6 ${!navBg && hasBanner ? `fill-skin-banner` : `fill-skin-base`
                  }`}
              />
            )}
          </button>
        </article>
      </header>
      <Transition appear show={isMenuOpen} as={Fragment}>
        <Dialog
          as="aside"
          className="relative z-50"
          onClose={() => setIsMenuOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-transform ease-in-out duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform ease-in-out duration-500"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed inset-0 w-full bg-skin-banner text-skin-base">
              <nav aria-labelledby="mobile-menu-heading ">
                <h2 id="mobile-menu-heading" className="sr-only">
                  Mobile Menu
                </h2>
                <aside className="p-8 py-6 flex justify-between items-center border-b-2  border-skin-accent border-spacing-7">
                  <a href="/">
                    <Image
                      image={_site.c_image}
                      className="!w-[130px] !md:w-full !max-w-none"
                    />
                  </a>
                  <button
                    name="Close Menu"
                    className=" flex justify-end ml-auto"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    <XMarkIcon className={`h-6 w-6 fill-skin-base`} />
                  </button>
                </aside>
                <ul
                  className="pr-8 pl-4 flex flex-col gap-4 mt-4"
                  id="mobile-menu"
                >
                  {_site.c_header.map((item: headerType) => (
                    <li key={item.link}>
                      <a
                        href={item.link}
                        onClick={() => setIsMenuOpen(false)}
                        className={`${item.link === currItem
                          ? "border-skin-base font-semibold text-skin-base"
                          : "border-transparent font-base text-skin-muted"
                          } block border-l-4 py-2 pl-3 pr-4 text-lg  `}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
      {/* Search Modal */}
      {open && (
        <ModalComponent modalWidth={"1/3"} open={open} onClose={handleClose}>
          <SearchBar
            placeholder="Ask me a question..."
            onSearch={handleSearch}
            customCssClasses={{
              searchBarContainer:
                "!mb-0 ml-auto w-[95vw] md:w-full !h-full px-4 ",
            }}
          />
        </ModalComponent>
      )}
    </>
  );
};

export default Header;
