import React, { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import offerImage from "@assets/offer edits_imresizer_1750318140082.jpg";
import upiDiscountImage from "@assets/upi dis 1_imresizer_1750318149804.jpg";
import bulkOrderImage from "@assets/From Cart to Doorste..._imresizer_1750318162646.jpg";
import newArrivalsImage from "@assets/new arrivals_imresizer_1750318186866.jpg";

interface SlideProps {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const slides: SlideProps[] = [
  {
    id: 1,
    title: "Document Organizer Bag",
    description: "Special Offer - Up to 50% off on document organizer bags",
    image: offerImage,
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    id: 2,
    title: "UPI Payment Discount",
    description: "Get 1% off on online payment & 5% off on purchase of 1K or above",
    image: upiDiscountImage,
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    id: 3,
    title: "Order in Bulk - Wholesale",
    description: "Contact us: 8709144545 @ Cheap Rate",
    image: bulkOrderImage,
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    id: 4,
    title: "New Arrivals",
    description: "Check out our latest document organizer bags collection",
    image: newArrivalsImage,
    buttonText: "Explore New",
    buttonLink: "/shop?filter=new",
  },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative min-w-full"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-auto object-contain"
                loading={slide.id === 1 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                <div className="text-white p-6 md:p-12 max-w-xl">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-base mb-4">
                    {slide.description}
                  </p>
                  <Link href={slide.buttonLink}>
                    <Button className="bg-accent hover:bg-accent-dark text-white py-2 px-6 rounded-md font-medium transition-colors">
                      {slide.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors md:flex hidden"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors md:flex hidden"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slider Nav dots */}
      <div className="absolute bottom-3 left-0 right-0">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
