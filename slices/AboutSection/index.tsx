"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Image from "next/image";

export type AboutSectionProps = SliceComponentProps<Content.AboutSectionSlice>;

const AboutSection = ({ slice }: AboutSectionProps) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-7 pr-32 min-h-screen font-playfair ">
      <div className="relative w-full h-full">
        {slice.primary.main_image.url && (
          <Image
            src={slice.primary.main_image.url}
            alt={slice.primary.main_image.alt || "About Image"}
            fill
            style={{ objectFit: "cover" }}
            className=" shadow-lg"
          />
        )}
      </div>

      <div className="flex flex-col gap-6 justify-start h-full">
        <h2 className="text-6xl font-bold leading-tight pb-20 pt-10">
          {slice.primary.title}
        </h2>
        <div className="text-lg leading-relaxed text-gray-700">
          <PrismicRichText field={slice.primary.description} />
        </div>

        <div className="mt-8">
          <h3 className="text-4xl font-bold">{slice.primary.year}</h3>
          <div className="text-lg text-gray-700 mt-4">
            <PrismicRichText field={slice.primary.details} />
          </div>
        </div>

        {slice.primary.optionaldescription && (
          <div className="mt-8 text-lg text-gray-600">
            <PrismicRichText field={slice.primary.optionaldescription} />
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
