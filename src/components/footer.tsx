import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export interface FooterProps {
  _site?: any;
  logo?: string;
  paragraph?: string;
}

const currentTime = new Date();
const year = currentTime.getFullYear();

const navigation = {
  company: [
    { name: "Blog", href: "/search.html?vertical=blog" },
    { name: "Jobs", href: "/search.html?vertical=jobs" },
    { name: "FAQS", href: "/search.html?vertical=faqs" },
    { name: "Events", href: "/search.html?vertical=events" },
  ],
  legal: [
    {
      name: "Professionals",
      href: "/search.html?vertical=financial-professional",
    },
    { name: "Locations", href: "/search.html?vertical=locations" },
    { name: "Directory", href: "/locations.html" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <FaFacebook {...props} />,
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <FaInstagram {...props} />,
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <FaTwitter {...props} />,
    },
    {
      name: "GitHub",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <FaGithub {...props} />,
    },
    {
      name: "YouTube",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <FaYoutube {...props} />,
    },
  ],
};

const Footer = (props: FooterProps) => {
  const { paragraph } = props;

  return (
    <footer
      className="bg-gray-100 text-skin-base border border-skin-accent border-t"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <section className="mx-auto centered-container pt-4 pb-8 md:pt-8 md:space-y-10 space-y-4 bg-white">
        <nav
          aria-label="Company links"
          className="w-full md:gap-8 flex justify-center "
        >
          <section className="md:w-1/2 w-full">
            <ul
              role="list"
              className="w-full flex md:flex-row flex-col items-center md:gap-8 gap-2"
            >
              {navigation.company.map((item) => (
                <li
                  key={item.name}
                  className="border-b md:border-none border-skin-base/25 w-full text-center py-2 md:py-0"
                >
                  <a
                    href={item.href}
                    className="text-base leading-6 hover:underline text-[#39852E]"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              {navigation.legal.map((item) => (
                <li
                  key={item.name}
                  className="border-b md:border-none border-skin-base/25 w-full text-center py-2 md:py-0"
                >
                  <a
                    href={item.href}
                    className=" text-base leading-6 hover:underline text-[#39852E]"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </nav>
        <section className="space-y-8 w-full md:gap-8 flex justify-center py-2 md:py-0">
          <nav aria-label="Social media ">
            <ul className="flex space-x-6">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    style={{ color: "#39852E" }} // Custom green color applied
                    aria-label={item.name}
                  >
                    <item.icon
                      className="h-5 w-5 md:h-6 md:w-6"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>
        <section className="mt-16 border-t border-skin-base/10 pt-8 md:mt-24 w-full md:gap-8 flex justify-center">
          <p className="text-sm leading-5 text-skin-base">
            &copy; {year} Your Company, Inc. All rights reserved.
          </p>
        </section>
      </section>
    </footer>
  );
};

export default Footer;
