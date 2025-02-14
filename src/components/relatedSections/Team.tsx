import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { Image, ImageType } from "@yext/pages-components";

interface PersonProps {
  name: string;
  slug: string;
  headshot: ImageType;
  datePosted: string;
  shortDescriptionV2: any;
  bodyV2: any;
  id?: string;
  mainPhone?: string;
  emails?: string;
}
interface TeamProps {
  people: PersonProps[];
  parentEntityName?: string;
  title?: string;
}
const Team = ({ people, parentEntityName, title = "Our Team" }: TeamProps) => {
  return (
    <article className=" centered-container flex flex-col md:justify-center px-5  w-full mx-auto items-center ">
      <h2 className="sr-only">{title}</h2>
      <section className=" md:py-0 flex flex-col gap-4 md:gap-8">
        <article className="mx-auto md:grid md:grid-cols-3 md:gap-12">
          <aside className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-skin-base text-2xl md:text-4xl font-medium mx-auto">
              {title}
            </h2>
            <p className="mt-6 text-lg/8 text-skin-muted">
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </p>
          </aside>
          <ul
            role="list"
            className="mt-8 md:mt-0 mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 md:gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
          >
            {people.slice(0, 4).map((person) => (
              <li
                key={person.name}
                className=" focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 text-skin-muted"
              >
                <a href="#" className="focus:outline-none">
                  <Image
                    loading="lazy"
                    image={person.headshot}
                    className="!aspect-[3/2] !w-full rounded-2xl !object-cover"
                  />

                  <h3 className="mt-2 md:mt-6 text-lg/8 font-semibold text-skin-base">
                    {person.name}
                  </h3>
                  <p className="text-base/7 text-skin-base">Wealth manager</p>
                  <p className="md:mt-4 text-base/7 text-skin-muted">
                    Praesentium iure error aliquam voluptas ut libero. Commodi
                    placeat sit iure nulla officiis. Ut ex sit repellat tempora.
                    Qui est accusamus exercitationem natus ut voluptas. Officiis
                    velit eos ducimus.
                  </p>
                </a>
                <nav
                  aria-label={`${person.name}'s social media`}
                  className="md:mt-6"
                >
                  <ul role="list" className="flex gap-x-6">
                    <li>
                      <a
                        href={`tel:${person.mainPhone}`}
                        className="text-skin-base hover:text-skin-base/50"
                        aria-label="X"
                      >
                        <PhoneIcon className="!text-primary h-6 w-6" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${person.emails?.[0] || `contact@contact.com`}`}
                        className="text-skin-base hover:text-gray-500"
                        aria-label="LinkedIn"
                      >
                        <EnvelopeIcon className="!text-primary h-6 w-6" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </li>
            ))}
          </ul>
          {people.length >= 4 && (
            <a
              href={`/search.html?vertical=financial-professionals&query=${parentEntityName || ""}`}
              className={`col-span-3 w-full justify-center mx-auto font-medium flex gap-1 items-center hover:cursor-pointer hover:underline`}
            >
              Find more Professionals
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                ></path>
              </svg>
            </a>
          )}
        </article>
      </section>
    </article>
  );
};

export default Team;
