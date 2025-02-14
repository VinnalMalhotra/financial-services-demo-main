import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ResponseComponent from "../ResponseComponent";

interface FaqProps {
  question: string;
  answer: string;
}

interface FaqsProps {
  faqs: FaqProps[];
  title: string;
}

const Faqs = ({ faqs, title = "FAQs" }: FaqsProps) => {
  return (
    <section
      aria-labelledby="faqs-title"
      className="centered-container flex flex-col md:justify-start mx-auto items-start"
    >
      <header>
        <h2
          id="faqs-title"
          className="text-skin-base text-2xl md:text-4xl font-bold text-center"
        >
          {title}
        </h2>
      </header>

      <section className="w-full divide-y divide-gray-300">
        <ul>
          {faqs.map((item, index) => (
            <li key={index} className="py-4">
              <Disclosure
                as="article"
                aria-labelledby={`faq-question-${index}`}
                defaultOpen={false}
              >
                <header>
                  <DisclosureButton
                    className="text-skin-base group flex w-full items-center justify-between"
                    aria-expanded="false"
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3
                      id={`faq-question-${index}`}
                      className="text-left text-lg font-medium group-hover:opacity-80"
                    >
                      {item.question}
                    </h3>
                    <ChevronDownIcon
                      className={`size-5 fill-skin-base group-hover:fill-skin-base/50 group-data-[open]:rotate-180`}
                    />
                  </DisclosureButton>
                </header>

                <DisclosurePanel
                  id={`faq-answer-${index}`}
                  transition
                  className="mt-2 text-left flex flex-col text-secondary origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 text-skin-muted"
                >
                  <ResponseComponent response={item.answer} />
                </DisclosurePanel>
              </Disclosure>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Faqs;
