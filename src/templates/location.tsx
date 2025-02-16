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
import {
  Address,
  AddressType,
  HoursStatus,
  Link,
  AnalyticsScopeProvider,
  MapboxMaps,
  Map,
} from "@yext/pages-components";
import LetsTalk from "../components/LetsTalk";
import {
  format_phone,
  getGoogleMapsLink,
  getRandomObjects,
} from "../utils/reusableFunctions";
import Cta from "../components/cta";
import { PhoneIcon } from "@heroicons/react/20/solid";
import { lazy, Suspense, useEffect, useState } from "react";
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Hours from "../components/hours";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import ScrollToTop from "../components/scrollToTop";
import { BlogsLoader, FaqsLoader, TeamLoader } from "../components/Skeletons";
import { MapPin } from "../components/directory/DirectoryMap";
import AnnouncementBanner from "../components/AnnouncementComponent/Announcement";
import Hero from "../components/HeroBannerComponent/hero";
import Promotion from "../components/PromotionComponent/promotion";
import { FeaturedProducts } from "../components/ProductsComponent/product";
import Business from "../components/BusinessGeocomponent/Business_temp";
import TeamSection from "../components/MyTeamComponent/myteam";
import ServiceTitleCarousel from "../components/ServiceTitleComponentCarousel/servicetitlecarousel";
import { FeaturedCarousels } from "../components/CarouselComponent/carousel";
// const LazyMap = lazy(() => import("../components/LocationBannerMap"));
const LazyBlogs = lazy(() => import("../components/relatedSections/Blogs"));
const LazyTeam = lazy(() => import("../components/relatedSections/Team"));
const LazyFaqs = lazy(() => import("../components/relatedSections/Faqs"));
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-location",
    fields: [
      "id",
      "uid",
      "slug",
      "name",
      "hours",
      "c_backgroundImage",
      "address",
      "mainPhone",
      "c_primaryCTA",
      "c_relatedProfessionals.id",
      "c_relatedProfessionals.name",
      "c_relatedProfessionals.mainPhone",
      "c_relatedProfessionals.emails",
      "c_relatedProfessionals.headshot",
      "c_relatedProfessionals.slug",
      "c_relatedProfessionals.c_relatedBlogs.id",
      "c_relatedProfessionals.c_relatedBlogs.name",
      "c_relatedProfessionals.c_relatedBlogs.primaryPhoto",
      "c_relatedProfessionals.c_relatedBlogs.emails",
      "c_relatedProfessionals.c_relatedBlogs.bodyV2",
      "c_relatedProfessionals.c_relatedBlogs.slug",
      "c_relatedProfessionals.c_relatedBlogs.datePosted",
      //** name, c_shortDescriptionV2, c_productCTA.name, primaryPhoto */
      "c_relatedProducts.name",
      "c_relatedProducts.c_shortDescriptionV2",
      "c_relatedProducts.c_productCTA.name",
      "c_relatedProducts.primaryPhoto",
      "description",
      "emails",
      "yextDisplayCoordinate",
      "specialities",
      "frequentlyAskedQuestions",
      "services",
      "languages",
      "photoGallery",
      "primaryPhoto",
    ],
    filter: {
      entityTypes: ["location"],
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
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
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
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    id,
    name,
    address,
    mainPhone,
    description,
    c_primaryCTA,
    c_relatedProfessionals,
    emails,
    _site,
    yextDisplayCoordinate,
    frequentlyAskedQuestions,
    hours,
    services,
    languages,
    __meta,
    c_backgroundImage,
    c_relatedProducts,
    photoGallery,
  } = document;

  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const email =
    (emails && emails.length >= 1 && emails[0]) || `contact@contact.com`;
  useEffect(() => {
    if (c_relatedProfessionals?.length) {
      const relatedBlogs = c_relatedProfessionals.flatMap(
        (item: any) => item.c_relatedBlogs || []
      );
      setRelatedBlogs(getRandomObjects(relatedBlogs));
    }
  }, [c_relatedProfessionals]);

  return (
    <PageLayout _site={_site} templateData={{ __meta, document }}>
      <AnnouncementBanner message = {true} position="left"/>
      <Hero backgroundImage={false} contentPosition="right" imageLeft={false} name={name} c_backgroundImage={c_backgroundImage}/>
      <section className="centered-container flex flex-col w-full mx-auto items-start text-skin-base py-8">
        {/* <article className="flex  flex-col md:flex-row gap-2 items-start md:items-center">
          <h1 className="text-2xl md:text-3xl font-medium">{name}</h1>
          <span className="hidden md:block">|</span>
          <HoursStatus hours={hours}></HoursStatus>
        </article> */}
        <address className="text-base mt-4 md:mt-0 mb-4 gap-4 not-italic flex flex-col md:flex-row justify-start items-start md:justify-start md:items-center w-full">
          {/* <span className="flex gap-1 text-start md:text-center items-start md:items-center">
            <MapPinIcon className="h-4 w-4" aria-hidden="true" />
            <Address
              address={address as AddressType}
              lines={[["line1", "city", ",", "region", "postalCode"]]}
            />{" "}
          </span> */}
          {/* <span className="hidden md:block">|</span> */}
          <AnalyticsScopeProvider name="ctas">
            {/* <span className="flex gap-1 text-center items-center hover:underline"> */}
              {/* <PhoneIcon className="h-4 w-4" aria-hidden="true" /> */}
              {/* <Link href={`tel:${mainPhone}`} eventName="call" amount={2}>
                {format_phone(mainPhone)}
              </Link> */}
              {/* {format_phone(mainPhone)} */}
            {/* </span> */}
          </AnalyticsScopeProvider>
          {/* {yextDisplayCoordinate && (
            <Cta
              cta={{
                label: "Get Directions",
                link: getGoogleMapsLink(yextDisplayCoordinate),
                linkType: "URL",
              }}
              ctaType="secondaryCta"
              aria-label="Secondary call to action"
              otherStyles="ml-auto mr-0 text-sm"
            />
          )} */}
        </address>
        {/* <article className="flex flex-col w-full  mx-auto items-start gap-4">
          <h2 className="sr-only">About {name}</h2>
          <h2 className="text-2xl md:text-3xl font-medium text-skin-base">
            About {name}
          </h2>
          <p className="text-skin-muted">{description}</p>
        </article> */}


        <article className="flex flex-col md:flex-row w-full mx-auto items-start gap-2 md:gap-4 justify-between bg-gray-100">
          {services && (
            <>
              <aside
                className="hidden md:flex w-1/3 flex-col pointer-events-none hover:cursor-default"
                aria-label="Services"
              >
                <Disclosure defaultOpen={true}>
                  {({ open }) => (
                    <>
                      <DisclosureButton
                        aria-expanded={open}
                        className="text-start flex w-full justify-between items-center"
                      >
                        <h3 className="font-medium mb-4 text-skin-base">
                          Services
                        </h3>
                        <ChevronDownIcon
                          className={`block md:hidden size-4 fill-skin-base group-hover:fill-skin-base/50 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </DisclosureButton>

                      <DisclosurePanel
                        transition
                        as="article"
                        className="grid grid-cols-1 md:grid-cols-2 text-skin-muted origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
                      >
                        {services.map((item: string, index: number) => (
                          <p key={index}>{item}</p>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </aside>
              <aside
                className="flex md:hidden w-full flex-col"
                aria-label="Services"
              >
                <Disclosure defaultOpen={true}>
                  {({ open }) => (
                    <>
                      <DisclosureButton
                        aria-expanded={open}
                        className=" text-start flex w-full justify-between items-center"
                      >
                        <h3 className="pb-4 font-medium  text-skin-base">
                          Services
                        </h3>
                        <ChevronDownIcon
                          className={`block md:hidden size-4 fill-skin-base group-hover:fill-skin-base/50 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </DisclosureButton>

                      <DisclosurePanel
                        transition
                        as="article"
                        className="grid grid-cols-1 md:grid-cols-2 text-skin-muted origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
                      >
                        {services.map((item: string, index: number) => (
                          <p key={index}>{item}</p>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </aside>
            </>
          )}
          {hours && (
            <Hours hours={hours} customclass="w-full md:w-1/3" title="Hours" />
          )}
          {languages && (
            <>
              <aside
                className="hidden md:flex w-1/3 flex-col pointer-events-none hover:cursor-default"
                aria-label="Languages"
              >
                <Disclosure defaultOpen={true}>
                  {({ open }) => (
                    <>
                      <DisclosureButton
                        aria-expanded={open}
                        className="text-start flex w-full justify-between items-center"
                      >
                        <h3 className="font-medium mb-4 text-skin-base">
                          Languages
                        </h3>
                        <ChevronDownIcon
                          className={`block md:hidden size-4 fill-skin-base group-hover:fill-skin-base/50 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </DisclosureButton>

                      <DisclosurePanel
                        transition
                        as="article"
                        className="grid grid-cols-1 md:grid-cols-2 text-skin-muted origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
                      >
                        {languages.map((item: string, index: number) => (
                          <p key={index}>{item}</p>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </aside>
              <aside
                className="flex md:hidden w-full flex-col"
                aria-label="Languages"
              >
                <Disclosure defaultOpen={false}>
                  {({ open }) => (
                    <>
                      <DisclosureButton
                        aria-expanded={open}
                        className="text-start flex w-full justify-between items-center"
                      >
                        <h3 className="pb-4 font-medium text-skin-base">
                          Languages
                        </h3>
                        <ChevronDownIcon
                          className={`block md:hidden size-4 fill-skin-base group-hover:fill-skin-base/50 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </DisclosureButton>

                      <DisclosurePanel
                        transition
                        as="article"
                        className="grid grid-cols-1 md:grid-cols-2 text-skin-muted origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
                      >
                        {languages.map((item: string, index: number) => (
                          <p key={index}>{item}</p>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </aside>
            </>
          )}
        </article>
        <article className=" flex justify-center gap-8 mx-auto mt-4 bg-gray-100">
          <Cta
            ctaType="primaryCta"
            cta={{ label: "Book appointment", linkType: "URL", link: "" }}
            hours={hours}
            name={name}
            otherStyles="w-full"
            isBookAnAppointment={true}
          />
        </article>

        {yextDisplayCoordinate && (
          <Map
            apiKey={import.meta.env.YEXT_PUBLIC_MAP_API_KEY}
            provider={MapboxMaps}
            bounds={
              yextDisplayCoordinate
                ? [
                    {
                      latitude: yextDisplayCoordinate.latitude,
                      longitude: yextDisplayCoordinate.longitude,
                    },
                  ]
                : undefined
            }
            className="h-64 w-full transition-all delay-300 my-4"
            providerOptions={{
              maxZoom: 6,
              scrollZoom: false,
              boxZoom: false,
              doubleClickZoom: false,
              zoomControl: false,
              showZoom: false,
            }}
          >
            <MapPin result={{ id, yextDisplayCoordinate }} />
          </Map>
        )}


<Promotion backgroundImage={false} contentPosition="center" imageLeft={true}/>

<FeaturedProducts _products={c_relatedProducts} gridCols={3}/>
<Business 
  name={name} 
  photoGallery={photoGallery} 
  description={description} 
  id={id} 
  c_primaryCTA={c_primaryCTA || "Learn More"} 
/>

      </section>

      <Suspense fallback={<FaqsLoader />}>
        {frequentlyAskedQuestions && (
          <section className="bg-gray-100 md:text-left w-full py-8">
            <LazyFaqs faqs={frequentlyAskedQuestions} title={"FAQs"} />
          </section>
        )}
      </Suspense>

      <TeamSection teamdata={c_relatedProfessionals}/>

      {/* <Suspense fallback={<TeamLoader />}>
        {c_relatedProfessionals && (
          <section className=" w-full py-8">
            <LazyTeam
              title={"Our Team"}
              people={c_relatedProfessionals}
              parentEntityName={`${address.city}, ${address.region}`}
            />
          </section>
        )}
      </Suspense> */}

      <Suspense fallback={<BlogsLoader />}>
        {relatedBlogs.length > 0 && (
          <article className="bg-gray-100 py-8 flex flex-col md:justify-center w-full mx-auto items-center ">
            <LazyBlogs
              linkedArticles={relatedBlogs}
              parentEntityName={name}
              title={"Insights"}
            />
          </article>
        )}
      </Suspense>

      <ServiceTitleCarousel gridCols={3} alignments={{ container: "items-center", text: "text-center" }}/>
      <FeaturedCarousels _carousel={c_relatedProducts} gridCols={3}/>

      <section className="md:text-left w-full py-8">
        <LetsTalk
          description={description}
          phone={mainPhone}
          email={email}
          geoCodedCoordinate={yextDisplayCoordinate}
          cta={c_primaryCTA}
        />
      </section>
      <ScrollToTop />
    </PageLayout>
  );
};

export default Location;
