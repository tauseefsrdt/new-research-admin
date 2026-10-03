import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface SliderItem {
  image: string;
  caption?: string;
  [key: string]: any;
}

interface MorphSliderProps {
  items?: SliderItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  className?: string;
  [key: string]: any;
}

const DEFAULT_ITEMS: SliderItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=1600&auto=format&fit=crop',
  },
  {
    image: 'https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=1600&auto=format&fit=crop',
  },
  {
    image: 'https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=1600&auto=format&fit=crop',
  },
  {
    image: 'https://images.unsplash.com/photo-1781242629922-6f39cc3671cd?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function MorphSlider({
  items = DEFAULT_ITEMS,
  autoplay = true,
  autoplayDelay = 3,
  loop = true,
  className = '',
}: MorphSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className={`group relative w-full h-full select-none overflow-hidden ${className}`}>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={800}
        loop={loop}
        autoplay={
          autoplay
            ? {
              delay: autoplayDelay * 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }
            : false
        }
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full h-full [&_.swiper-pagination-bullet]:bg-white/60 [&_.swiper-pagination-bullet-active]:bg-white [&_.swiper-pagination-bullet-active]:w-5 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover select-none object-left-top"
              loading={index === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Left Arrow Button */}
      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 -ml-0.5" />
      </button>

      {/* Custom Right Arrow Button */}
      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 -mr-0.5" />
      </button>
    </div>
  );
}