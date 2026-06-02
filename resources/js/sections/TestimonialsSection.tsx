import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TestimonialCard from '@/components/TestimonialCard';

interface Testimonial {
  id: number;
  rating?: number;
  quote: string;
  name: string;
  organization: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const TestimonialsSection = ({ testimonials = [] }: TestimonialsSectionProps) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="font-inter w-full py-12 md:py-16 bg-white">
      <div className="mx-auto max-w-[1700px]">

        {/* Section Header */}
        <h2 className="text-[32px] sm:text-5xl md:text-6xl font-bold text-primary leading-[1.1] md:leading-[0.95] tracking-tight mb-8 md:mb-12 px-4 md:px-20 lg:px-24">
          Trusted By
          <br />
          Growing Businesses
        </h2>

        {/* Carousel */}
        <div className="px-0 md:px-20 lg:px-24">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            breakpoints: {
              '(max-width: 767px)': {
                align: 'center',
              }
            }
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-4 md:pl-6 basis-[85%] sm:basis-[90%] md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <TestimonialCard
                  rating={testimonial.rating}
                  quote={testimonial.quote}
                  name={testimonial.name}
                  organization={testimonial.organization}
                  avatar={testimonial.avatar}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
