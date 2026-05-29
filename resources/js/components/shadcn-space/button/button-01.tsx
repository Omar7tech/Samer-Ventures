import { Link } from "@inertiajs/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnimatedButtonProps {
  text: string;
  href?: string;
  url?: string;
}

const AnimatedButton = ({ text, href, url }: AnimatedButtonProps) => {
  const destination = href || url;

  const buttonContent = (
    <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer bg-white text-primary hover:bg-white">
      <span className="relative z-10 transition-all duration-500">
        {text}
      </span>
      <div className="absolute right-1 w-10 h-10 bg-[#145f60] text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>
    </Button>
  );

  if (destination) {
    return <Link href={destination}>{buttonContent}</Link>;
  }

  return buttonContent;
};

export default AnimatedButton;
