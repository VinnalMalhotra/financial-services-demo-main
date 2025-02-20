/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static HTML page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  format_phone,
  getGoogleMapsLink,
  getRandomObjects,
} from "../utils/reusableFunctions";

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/pageLayout";
import { Image } from "@yext/pages-components";
import LetsTalk from "../components/LetsTalk";
import Cta from "../components/cta";
import Blogs from "../components/relatedSections/Blogs";
import Carousel from "../components/Carousel";
import ScrollToTop from "../components/scrollToTop";
import AnnouncementBanner from "../components/AnnouncementComponent/Announcement";
import FeaturedProducts from "../components/ProductFP.tsx/productfp";
import Promotion from "../components/PromotionComponent/promotion";
import BreadCrumbs from "../components/search/breadCrumbs"


/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-professional",
    fields: [
      "id",
      "uid",
      "slug",
      "name",
      "address",
      "mainPhone",
      "c_primaryCTA",
      "c_relatedBlogs.name",
      "c_relatedBlogs.bodyV2",
      "c_relatedBlogs.shortDescriptionV2",
      "c_relatedBlogs.primaryPhoto",
      "c_relatedBlogs.c_author",
      "c_relatedBlogs.datePosted",
      "c_educationDetails",
      "c_professionalRecord",
      "description",
      "emails",
      "headshot",
      "yearsOfExperience",
      "languages",
      "certifications",
      "yextDisplayCoordinate",
      "specialities",
      "hours",
      "c_relatedLocations.name",
      "c_relatedLocations.slug",
      "c_relatedLocations.address",
      "c_relatedLocations.mainPhone",
      "c_relatedLocations.hours",
      "c_relatedLocations.yextDisplayCoordinate",
      "c_relatedLocations.dm_directoryParents_fins_directory.name",
      "c_relatedLocations.dm_directoryParents_fins_directory.slug",
      "c_relatedLocations.dm_directoryParents_fins_directory.id",
      "c_relatedLocations.dm_directoryParents_fins_directory.c_addressRegionAbbreviation",
    ],
    filter: {
      entityTypes: ["financialProfessional"],
      savedFilterIds: ["1396278582"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${document.address.line1
    }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template component. The props passed in here are the direct stream document defined by `config`.
 */
const Professional: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    address,
    mainPhone,
    description,
    slug,
    c_primaryCTA,
    c_relatedBlogs,
    c_educationDetails,
    c_professionalRecord,
    emails,
    headshot,
    yearsOfExperience,
    _site,
    languages,
    certifications,
    specialities,
    yextDisplayCoordinate,
    hours,
    id,
    c_relatedLocations,
    __meta,
    dm_directoryParents_fins_directory,
  } = document;
  const professionalLocations = [
    {
      address: address,
      hours: hours,
      mainPhone: mainPhone,
      name: address.city,
      yextDisplayCoordinate: yextDisplayCoordinate,
    },
    ...(Array.isArray(c_relatedLocations)
      ? c_relatedLocations
      : [c_relatedLocations]),
  ];

  const email =
    (emails && emails.length >= 1 && emails[0]) || `contact@contact.com`;

  return (
    <PageLayout _site={_site} templateData={{ __meta, document }}>
      <AnnouncementBanner message={true} position="left" />
      <article className="centered-container !py-4 hidden md:block">
        <BreadCrumbs
          data={c_relatedLocations?.[0]?.dm_directoryParents_fins_directory} // Accessing the first item if it's an array
          currAddress={address?.line1}
        />
      </article>

      {/* <section className="centered-container flex flex-col w-full mx-auto items-start text-skin-base py-8">
        <article className="flex  flex-col md:flex-row gap-2 items-start md:items-center">
          <h1 className="text-2xl md:text-3xl font-medium">{name}</h1>
        </article>

        <article className="mt-4 flex flex-col md:flex-row w-full items-stretch shrink-0 mx-auto  gap-4">
          <article className="w-full md:w-3/4 flex flex-col md:flex-row gap-4">
            <figure className="w-full md:w-1/5">
              <Image image={headshot} loading="eager" />
            </figure>
            <section className=" flex-col flex gap-4 w-full md:w-4/5">
              <h2 className="sr-only">About me</h2>
              <h2 className="text-2xl md:text-3xl font-medium text-skin-base">
                About {name}
              </h2>
              <p className="text-skin-muted text-sm md:text-base">
                {description}
              </p>
            </section>
          </article>
          <aside className="w-1/5 h-auto hidden md:flex mx-auto flex-col justify-center text-center px-4 py-12 bg-skin-accent">
            <p>
              Need an expert financial guidance to help you achieve your goals?
            </p>
            <article className="md:flex gap-8  hidden">
              <Cta
                cta={{
                  label: "Book an appointment",
                  link: "#",
                  linkType: "URL",
                }}
                ctaType="primaryCta"
                otherStyles="w-full text-sm mt-4 mx-auto"
              />
            </article>
          </aside>
        </article>
        <article className="md:hidden flex justify-center gap-8 mx-auto mt-4">
          <Cta
            ctaType="primaryCta"
            cta={{ label: "Book appointment", linkType: "URL", link: "" }}
            hours={hours}
            name={name}
            otherStyles="w-full"
            isBookAnAppointment={true}
          />
        </article>
      </section> */}

      <section className="flex w-full items-center justify-between border border-gray-200 py-8 px-12">
        {/* Left Section: Business Info */}
        <div className="w-1/2 flex flex-col items-start gap-2 px-6">
          {/* Business Name */}
          <h1 className="text-lg font-semibold">Parkside Bank</h1>
          <h2 className="text-3xl md:text-4xl font-bold">{name}</h2>

          {/* Ratings Section */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-semibold">4.5</span>
            <span className="text-green-500">★★★★★</span>
            <span className="text-sm text-gray-500">(21 reviews)</span>
          </div>

          {/* CTA Buttons - Inline Layout */}
          <div className="flex gap-4 mt-4">
            {/* Get Directions (Primary CTA) */}

            {yextDisplayCoordinate && getGoogleMapsLink && (
              <a
                href={getGoogleMapsLink(yextDisplayCoordinate)}
                className="px-8 uppercase py-3 text-sm font-semibold bg-green-600 text-white border border-green-600 shadow-md hover:bg-green-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            )}
            {/* Book an Appointment (Secondary CTA) */}
            <Cta
              cta={{
                label: "Book an Appointment",
                link: "#",
                linkType: "URL",
              }}
              ctaType="secondaryCta"
              otherStyles="px-8 py-3 text-sm font-semibold bg-gray-100 text-gray-800 border border-gray-400 shadow-md hover:bg-gray-200 whitespace-nowrap"
            />
          </div>
        </div>
        {/* Right Section: Image */}
        <div className="w-1/2 flex items-center justify-center px-6">
          <img
            src={headshot?.url} // Ensure headshot image is correctly passed
            alt="Headshot"
            className="rounded-lg w-60 h-60 object-cover shadow-md"
            loading="eager"
          />
        </div>
      </section>


      {/* <section className="w-full py-8 bg-gray-100">
        <article className="centered-container flex flex-col w-full mx-auto items-center gap-4 md:gap-8">
          <h2 className="sr-only">Professional Details</h2>
          <h2 className="text-2xl font-bold text-black text-center">
            Professional Details
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <section className="flex flex-col gap-4">
              <section>
                <h3 className="text-xl font-bold mb-2">
                  Experience
                </h3>
                <p className="">{yearsOfExperience} Years</p>
              </section>
              {c_educationDetails && (
                <section>
                  <h3 className="text-xl font-bold mb-2">
                    Education Details
                  </h3>
                  <ul className=" flex flex-col gap-1 mt-2 ">
                    {c_educationDetails.map((item: any, index: number) => (
                      <li key={index}>
                        {item.degree} - {item.university}, {item.year}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {languages && (
                <section>
                  <h3 className="text-xl font-bold mb-2">
                    Languages
                  </h3>
                  <ul className=" flex flex-col gap-1 mt-2 ">
                    {languages.map((item: string[], index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
            </section>
            <section className="flex flex-col gap-4">
              {certifications && (
                <section>
                  <h3 className="text-xl font-bold mb-2">
                    Licenses and Certifications
                  </h3>
                  <ul className=" flex flex-col gap-1 mt-2 ">
                    {certifications.map((item: string[], index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
              {specialities && (
                <section>
                  <h3 className="text-xl font-bold mb-2">
                    Specialities
                  </h3>
                  <ul className=" flex flex-col gap-1 mt-2 ">
                    {specialities.map((item: string[], index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
            </section>
            {c_professionalRecord && (
              <section>
                <h3 className="text-xl font-bold mb-2">
                  Professional Journey
                </h3>
                <ul className=" flex flex-col gap-1 mt-2 ">
                  {c_professionalRecord.map((item: any, index: number) => (
                    <li className="flex" key={index}>
                      {item.position}
                      {item.organisation ? ` - ${item.organisation}` : ""},{" "}
                      {item.startYear && item.startYear}
                      {item.endYear && ` - ${item.endYear}`}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </section>
        </article>
      </section> */}


      <section className="w-full py-8 bg-gray-100">
        <article className="centered-container flex flex-col w-full mx-auto items-center gap-4 md:gap-8">
          <h2 className="sr-only">Professional Details</h2>
          <h2 className="text-skin-base text-2xl md:text-3xl font-medium mx-auto text-center">
            Professional Details
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <section className="flex flex-col gap-4">
              <section>
                <h3 className="text-xl font-bold  text-skin-base mb-2">Experience</h3>
                <ul className="list-disc pl-5 text-skin-base">
                  <li>{yearsOfExperience} Years</li>
                </ul>
              </section>
              {c_educationDetails && (
                <section>
                  <h3 className="text-xl font-bold mb-2 text-skin-base">Education Details</h3>
                  <ul className="list-disc pl-5 flex flex-col gap-1 mt-2 text-skin-base">
                    {c_educationDetails.map((item: any, index: number) => (
                      <li key={index}>
                        {item.degree} - {item.university}, {item.year}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {languages && (
                <section>
                  <h3 className="text-xl font-bold mb-2 text-skin-base">Languages</h3>
                  <ul className="list-disc pl-5 flex flex-col gap-1 mt-2 text-skin-base">
                    {languages.map((item: string[], index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
            </section>
            <section className="flex flex-col gap-4 text-skin-base">
              {certifications && (
                <section>
                  <h3 className="text-xl font-bold mb-2">
                    Licenses and Certifications
                  </h3>
                  <ul className="list-disc pl-5 flex flex-col gap-1 mt-2">
                    {certifications.map((item: string[], index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
              {specialities && (
                <section>
                  <h3 className="text-xl font-bold mb-2">Specialities</h3>
                  <ul className="list-disc pl-5 flex flex-col gap-1 mt-2">
                    {specialities.map((item: string[], index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
            </section>
            {c_professionalRecord && (
              <section>
                <h3 className="text-xl font-bold mb-2 text-skin-base">Professional Journey</h3>
                <ul className="list-disc pl-5 flex flex-col gap-1 mt-2 text-skin-base">
                  {c_professionalRecord.map((item: any, index: number) => (
                    <li key={index}>
                      {item.position}
                      {item.organisation ? ` - ${item.organisation}` : ""},{" "}
                      {item.startYear && item.startYear}
                      {item.endYear && ` - ${item.endYear}`}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </section>
        </article>
      </section>





      <Promotion backgroundImage={false} contentPosition="center" imageLeft={true} />

      <FeaturedProducts gridCols={3} alignments={{ container: "items-start", text: "text-start" }} />

      <article className="centered-container mt-16 flex flex-col md:flex-row w-full items-center mx-auto mb-16 gap-44">
        <figure className="w-full md:w-1/4 ml-24">
          <Image image={headshot} loading="eager" className="rounded-xl" />
        </figure>
        <section className="w-full  flex flex-col gap-4 md:w-1/2 p-6">
          <h2 className="text-2xl md:text-3xl font-medium text-skin-base">
            {/* <h2 className="sr-only">About me</h2> */}
            <h2 className="text-2xl md:text-3xl font-medium text-skin-base">
              About {name}
            </h2>
            {/* {name} */}
          </h2>
          <p className="text-skin-muted text-sm md:text-base">
            {description}
          </p>
        </section>
      </article>



      {c_relatedBlogs && (
        <article className="py-8 flex flex-col md:justify-center w-full mx-auto items-center bg-gray-100 ">
          <Blogs
            linkedArticles={c_relatedBlogs}
            parentEntityName={name}
            title={"Blogs"}
          />
        </article>
      )}
      <section className="bg-gray-50 w-full py-8">
        <article className="hidden md:block centered-container">
          <Carousel
            cardsToShow={{ desktop: 3, mobile: 1, tablet: 2 }}
            data={professionalLocations}
            title={"My Locations"}
            isLocation={true}
          />
        </article>
        <article className="block md:hidden">
          <Carousel
            cardsToShow={{ desktop: 3, mobile: 1, tablet: 2 }}
            data={professionalLocations}
            title={"My Locations"}
            isLocation={true}
          />
        </article>
      </section>
      {/* <section className="bg-skin-banner  md:text-center w-full py-8">
        <LetsTalk
          description={description}
          phone={mainPhone}
          email={email}
          geoCodedCoordinate={yextDisplayCoordinate}
          cta={c_primaryCTA}
        />
      </section> */}
      <ScrollToTop />
    </PageLayout>
  );
};

export default Professional;
