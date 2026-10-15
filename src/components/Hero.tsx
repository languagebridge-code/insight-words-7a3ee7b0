import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Link } from "@/lib/router-compat";

import heroStudentAmira from "@/assets/hero-student-amira-new.png";
import heroStudentAbdullah from "@/assets/hero-student-abdullah-new.png";
import heroStudentSophia from "@/assets/hero-student-sophia-new.png";
import Autoplay from "embla-carousel-autoplay";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const stories = [
  {
    name: "amira",
    image: heroStudentAmira,
    alt: "Amira, a middle school student wearing a black headscarf, smiling at her desk in a bright classroom with whiteboards and classmates behind her.",
    title: "Amira's Journey",
    caption: "Hover or focus to read Amira's story →",
    body: "Amira is an Afghan refugee who can't read Dari, her own language. Google Translate doesn't even support Dari audio. LanguageBridge reads her classroom content aloud in Dari so she can finally participate.",
  },
  {
    name: "abdullah",
    image: heroStudentAbdullah,
    alt: "Abdullah, a student in a black hoodie, smiling at his desk in front of a classroom whiteboard listing the day's objectives.",
    title: "Abdullah's Progress",
    caption: "Hover or focus to read Abdullah's story →",
    body: "Abdullah is learning English while keeping up with grade-level work. With Talk to Teacher, he can communicate directly with his teacher, ask questions, share concerns, and build trust without relying on a student interpreter.",
  },
  {
    name: "sophia",
    image: heroStudentSophia,
    alt: "Sophia, a student in a gray hoodie with long dark hair, smiling in her classroom with a whiteboard and world map behind her.",
    title: "Sophia's Breakthrough",
    caption: "Hover or focus to read Sophia's story →",
    body: "Sophia moved from Colombia and constantly translates two languages in her head. It made her feel \"not smart.\" With LanguageBridge, she highlights any text and the glossary generates word-to-word translations side by side.",
  },
];

export const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const benefits = [
    "Audio-first translation for preliterate learners",
    "FERPA-compliant & school-approved",
    "Works on any Chromebook instantly"
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 pt-24 pb-16">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Shooting stars */}
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Logo */}
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.05] tracking-tight fade-in-up delay-100">
              <span className="gradient-text">Every Student</span>
              <br />
              <span className="text-foreground">Deserves to</span>
              <br />
              <span className="gradient-text">Understand</span>
              <span className="sr-only">
                {" "}— LanguageBridge, audio-first language accessibility for preliterate ESL students
              </span>
            </h1>

            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 fade-in-up delay-200">
              The award-winning audio-first Chrome extension that helps preliterate English learners access classroom content, instantly.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 fade-in-up delay-300">
              <Button
                asChild
                size="xl"
                className="group gradient-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-lg px-8 py-6"
              >
                <Link to="/demo">
                  Request a Demo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="group border-2 hover:bg-muted/50 transition-all duration-300 text-lg px-8 py-6"
              >
                <a href="#demo">
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch the Demo
                </a>
              </Button>
            </div>

            {/* Benefits List */}
            <ul className="space-y-3 fade-in-up delay-400">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground/80 justify-center lg:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-base sm:text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Image Carousel */}
          <div className="fade-in-up delay-300 lg:pl-8">
            <h2 className="sr-only">Student stories from LanguageBridge classrooms</h2>

            <Carousel
              className="w-full"
              opts={{ loop: true }}
              setApi={setApi}
              aria-label="Student stories. Use the previous and next buttons, or the left and right arrow keys, to move between stories."
              tabIndex={0}
              plugins={[
                Autoplay({
                  delay: 6000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                  stopOnFocusIn: true,
                }),
              ]}
            >
              <CarouselContent>
                {stories.map((story, index) => (
                  <CarouselItem key={story.name} aria-label={`Story ${index + 1} of ${stories.length}: ${story.title}`}>
                    <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group aspect-[4/3] focus-within:ring-4 focus-within:ring-primary/40">
                      <img
                        src={story.image}
                        alt={story.alt}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-500 flex items-end p-6 lg:p-8">
                        <div className="text-primary-foreground space-y-3 transform translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-500">
                          <span className="inline-block px-3 py-1 bg-primary/90 rounded-full text-sm font-medium">Student Story</span>
                          <h3 className="text-2xl lg:text-3xl font-bold">{story.title}</h3>
                          <p className="text-base lg:text-lg leading-relaxed opacity-90 line-clamp-4">{story.body}</p>
                        </div>
                      </div>
                      {/* Always visible caption */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 lg:p-6 group-hover:opacity-0 group-focus-within:opacity-0 transition-opacity duration-500">
                        <p className="text-primary-foreground font-medium text-lg">{story.caption}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                aria-label="Previous student story"
                className="left-2 sm:left-3 h-11 w-11 bg-background/95 hover:bg-background shadow-lg border border-border text-foreground"
              />
              <CarouselNext
                aria-label="Next student story"
                className="right-2 sm:right-3 h-11 w-11 bg-background/95 hover:bg-background shadow-lg border border-border text-foreground"
              />
            </Carousel>

            {/* Slide indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {stories.map((story, index) => (
                <button
                  key={story.name}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Show ${story.title}`}
                  aria-current={current === index}
                  className={`h-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    current === index ? "w-8 bg-primary" : "w-3 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }`}
                />
              ))}
            </div>

            <p aria-live="polite" className="sr-only">
              {stories[current]?.title} — story {current + 1} of {stories.length}
            </p>

            {/* Carousel helper text */}
            <p className="text-center text-muted-foreground mt-3 text-sm">
              Real students. Real impact. Use the arrows or arrow keys to explore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
