import { Star } from 'lucide-react';

interface TestimonialCardProps {
  rating?: number;
  quote: string;
  name: string;
  organization: string;
  avatar?: string;
}

const TestimonialCard = ({
  rating = 5,
  quote,
  name,
  organization,
  avatar,
}: TestimonialCardProps) => {
  return (
    <div className="bg-card rounded-[32px] p-6 md:p-8 flex flex-col justify-between min-h-[400px] md:min-h-[450px]">
      <div className="space-y-6">
        {/* Stars */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-8 h-8 ${
                index < rating
                  ? 'fill-[#9ca4a2] text-[#9ca4a2]'
                  : 'fill-transparent text-[#9ca4a2]'
              }`}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-[14px] md:text-[15px] leading-relaxed text-primary/80 font-light">
          {quote}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 mt-8">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#d9dedc] flex items-center justify-center overflow-hidden shrink-0">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#9ca4a2] font-semibold text-lg">
              {name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <p className="font-bold text-primary text-base md:text-lg">{name}</p>
          <p className="text-sm md:text-base text-primary/70 font-light">{organization}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
