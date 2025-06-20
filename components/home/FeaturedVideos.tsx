"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

export default function FeaturedVideos() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const videos = [
    {
      id: 1,
      title: "Yoga Mat Flow",
      description: "Perfect mat for your daily practice",
      thumbnail:
        "https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg",
      videoUrl:
        "https://d3olzcjcik4n3k.cloudfront.net/672b537589dc54d1f4983829/mp4-672b537589dc54d1f4983829/208201a1a7ea4288aab74dcad3c3c23e.mp4",
      category: "Yoga",
    },
    {
      id: 2,
      title: "Ayurvedic Supplement Guide",
      description: "Learn about our traditional supplements",
      thumbnail:
        "https://images.pexels.com/photos/6694546/pexels-photo-6694546.jpeg",
      videoUrl:
        "https://d3olzcjcik4n3k.cloudfront.net/672b537589dc54d1f4983829/mp4-672b537589dc54d1f4983829/208201a1a7ea4288aab74dcad3c3c23e.mp4",
      category: "Ayurveda",
    },
    {
      id: 3,
      title: "Herbal Tea Benefits",
      description: "Discover the healing effects of our teas",
      thumbnail:
        "https://images.pexels.com/photos/6693953/pexels-photo-6693953.jpeg",
      videoUrl:
        "https://d3olzcjcik4n3k.cloudfront.net/672b537589dc54d1f4983829/mp4-672b537589dc54d1f4983829/208201a1a7ea4288aab74dcad3c3c23e.mp4",
      category: "Tea",
    },
    {
      id: 4,
      title: "Mindful Brews",
      description: "Tea rituals for a mindful day",
      thumbnail:
        "https://images.pexels.com/photos/6693953/pexels-photo-6693953.jpeg",
      videoUrl:
        "https://d3olzcjcik4n3k.cloudfront.net/672b537589dc54d1f4983829/mp4-672b537589dc54d1f4983829/208201a1a7ea4288aab74dcad3c3c23e.mp4",
      category: "Tea",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Embla setup for mobile
  const [emblaRef] = useEmblaCarousel({
    align: "center",
    loop: true,
    slidesToScroll: 1,
  });

  return (
    <section className="container-custom" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-serif text-sage-800 mb-4">
          Watch and Shop
        </h2>
      </motion.div>
      {/* Mobile Carousel */}
      <div className="block sm:hidden mb-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 px-4 -mx-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-72 flex flex-col items-center"
              >
                <Link href={`/watch?id=${video.id}`} className="cursor-pointer">
                  <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden shadow-lg bg-gray-100 mb-3">
                    <video
                      src={video.videoUrl}
                      poster={video.thumbnail}
                      controls={false}
                      className="object-cover w-full h-full rounded-xl"
                      autoPlay
                      muted
                      loop
                      controlsList="nodownload"
                      playsInline
                      preload="auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-xs font-medium mb-2">
                        {video.category}
                      </span>
                    </div>
                  </div>
                </Link>
                <h4 className="font-medium text-gray-900 mb-1 text-lg">
                  {video.title}
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  {video.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Desktop Grid */}
      <motion.div
        className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {videos.map((video) => (
          <motion.div key={video.id} variants={itemVariants} className="group">
            <Link href={`/watch?id=${video.id}`} className="cursor-pointer">
              <div
                className="relative aspect-[9/16] rounded-xl overflow-hidden bg-gray-100 mb-3 shadow-lg group-hover:shadow-2xl transition-shadow"
                style={{ height: "533px", width: "100%" }}
              >
                <video
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  controls={false}
                  className="object-cover w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-300"
                  autoPlay
                  muted
                  loop
                  controlsList="nodownload"
                  playsInline
                  preload="auto"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-xs font-medium mb-2">
                    {video.category}
                  </span>
                </div>
              </div>
            </Link>
            <h4 className="font-medium text-gray-900 mb-1 text-lg">
              {video.title}
            </h4>
            <p className="text-sm text-gray-600">{video.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}