import { Image, ImageType } from "@yext/pages-components";
import { format_date } from "../../utils/reusableFunctions";
import ResponseComponent from "../ResponseComponent";

interface BlogsCardProps {
  name: string;
  slug: string;
  primaryPhoto: ImageType;
  datePosted: string;
  shortDescriptionV2: any;
  bodyV2: any;
  id?: string;
}

interface BlogsProps {
  linkedArticles: BlogsCardProps[];
  parentEntityName?: string;
  title?: string;
}

interface BlogCardProps {
  _data: BlogsCardProps;
  showImage?: boolean;
  lineClamp?: number;
}

const Blogs = ({
  linkedArticles,
  parentEntityName,
  title = "Blogs",
}: BlogsProps) => {
  if (linkedArticles.length === 0) {
    return null;
  }

  const _first: BlogsCardProps = linkedArticles[0];
  const _rest: BlogsCardProps[] = linkedArticles.slice(1, 4);

  return (
    <section className="centered-container flex flex-col gap-4 md:gap-8">
      <h2 className="sr-only">{title}</h2>
      <h2 className="text-skin-base text-2xl md:text-3xl font-medium mx-auto text-center">
        {title}
      </h2>
      <article className="hidden md:flex gap-8 text-skin-muted">
        <section className="flex flex-col gap-2 w-1/2">
          <BlogsCard _data={_first} showImage={true} lineClamp={4} />
        </section>
        <section className="flex flex-col gap-4 w-1/2">
          {_rest.map((item, index) => (
            <BlogsCard _data={item} key={index} lineClamp={3} />
          ))}
        </section>
      </article>
      <article className="flex gap-8">
        <section className="flex flex-col gap-4 w-full justify-between mx-auto md:hidden">
          {linkedArticles.map((item, index) => (
            <BlogsCard _data={item} key={index} lineClamp={3} />
          ))}
        </section>
      </article>
      <a
        href={`/search.html?vertical=blog&query=${parentEntityName || ""}`}
        className={`mx-auto font-medium flex gap-1 items-center hover:cursor-pointer hover:underline text-skin-base`}
      >
        Find more articles
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
    </section>
  );
};

export default Blogs;

const BlogsCard = ({ _data, showImage = false, lineClamp }: BlogCardProps) => {
  return (
    <article
      className="flex flex-col gap-2 md:gap-3"
      aria-labelledby={`blog-title-${_data.id}`}
    >
      {showImage && _data.primaryPhoto && (
        <Image
          loading="lazy"
          image={_data.primaryPhoto}
          className="!mb-4 w-full max-w-[700px] !aspect-video"
        />
      )}
      <time
        dateTime={_data.datePosted}
        className="text-sm text-gray-500"
        aria-label={`Posted on ${format_date(_data.datePosted)}`}
      >
        {format_date(_data.datePosted)}
      </time>
      <h3
        id={`blog-title-${_data.id}`}
        className="text-skin-base text-lg md:text-xl font-semibold"
      >
        {_data.name}
      </h3>
      <div
        aria-label="Text description"
        className={`w-80 md:w-full text-base !font-light ${
          lineClamp === 4 ? `line-clamp-4` : `line-clamp-3`
        }`}
      >
        <ResponseComponent response={_data.bodyV2} />
      </div>
      <a
        href={`/${_data.slug}`}
        className="text-skin-base font-medium hover:underline flex items-center"
      >
        Know more
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
      {!showImage && <hr />}
    </article>
  );
};
