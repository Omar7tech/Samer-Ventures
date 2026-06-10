import { useState, useEffect, useRef } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import type { Service } from '@/types';

interface ServicesAccordionProps {
    services?: Service[] | null;
}

function ProcessTimeline({ steps }: { steps: string[] }) {
    const [animated, setAnimated] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Per-index delays so the cascade scales with any number of steps
    const STEP_INTERVAL_MS = 600;
    const stepDelayStyle = (index: number): React.CSSProperties => ({
        transitionDuration: '500ms',
        transitionDelay: animated ? `${index * STEP_INTERVAL_MS}ms` : '0ms',
    });
    const lineDelayStyle = (index: number): React.CSSProperties => ({
        transitionDuration: '400ms',
        transitionDelay: animated ? `${200 + index * STEP_INTERVAL_MS}ms` : '0ms',
    });
    const dotDelayStyle = (index: number): React.CSSProperties => ({
        transitionDuration: '300ms',
        transitionDelay: animated ? `${550 + index * STEP_INTERVAL_MS}ms` : '0ms',
    });

    return (
        /* Wraps on every breakpoint so long step lists flow to the next line instead of clipping */
        <div ref={elementRef} className="flex flex-row flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-0 sm:gap-y-3 pt-4 select-none">
            {steps.map((step, index) => (
                <div key={`${step}-${index}`} className="flex items-center group/step">
                    <span
                        style={stepDelayStyle(index)}
                        className={`text-sm md:text-lg font-bold tracking-wide transition-colors ease-out ${
                            animated ? 'text-primary' : 'text-neutral-300'
                        }`}
                    >
                        {step}
                    </span>

                    {index < steps.length - 1 && (
                        /* UI FIX: Responsive margins (mx-2 on mobile scaling up to your pristine mx-5 on desktop) */
                        <div className="mx-2 md:mx-5 hidden sm:flex items-center">
                            <div className="h-[1.5px] w-8 md:w-14 bg-neutral-200 relative overflow-hidden rounded-full">
                                <div
                                    style={lineDelayStyle(index)}
                                    className={`absolute inset-0 bg-primary origin-left transition-transform ease-out ${
                                        animated ? 'scale-x-100' : 'scale-x-0'
                                    }`}
                                />
                            </div>

                            <div
                                style={dotDelayStyle(index)}
                                className={`h-1.5 w-1.5 rounded-full ml-0.5 transition-all ease-out ${
                                    animated
                                        ? 'bg-primary scale-100 opacity-100'
                                        : 'bg-neutral-300 scale-50 opacity-40'
                                }`}
                            />
                        </div>
                    )}

                    {/* UI FIX: Adds an inline micro-arrow wrapper visible strictly on mobile screen dimensions */}
                    {index < steps.length - 1 && (
                        <span className="inline-block sm:hidden text-neutral-300 font-bold text-xs ml-1 mr-1">→</span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default function ServicesAccordion({ services }: ServicesAccordionProps) {
    if (!services || services.length === 0) {
        return null;
    }

    return (
        <section className="py-24 px-5 md:px-10 lg:px-32 max-w-[1700px] mx-auto">
            <div>
                <Accordion type="multiple" defaultValue={[String(services[0].id)]}>
                    {services.map((service) => {
                        const bulletPoints = service.bulletPoints ?? [];
                        const processSteps = service.processSteps ?? [];
                        const tags = service.tags ?? [];

                        return (
                        <AccordionItem key={service.id} value={String(service.id)}>
                            <AccordionTrigger
                                className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium text-primary leading-tight tracking-tighter"
                            >
                                <span className="relative inline-block pr-10">
                                    {service.title}
                                    <span className="absolute top-0 right-0 text-[0.3em] font-bold uppercase tracking-normal select-none leading-none">
                                        TM
                                    </span>
                                </span>
                            </AccordionTrigger>

                            <AccordionContent>
                                {/* UI FIX: Scaled padding variables from standard phone displays through desktops */}
                                <div className="px-1 sm:px-5 py-4 md:py-8 space-y-6 md:space-y-10">

                                    {/* Category Pill */}
                                    {service.subtitle && (
                                        <div>
                                            {/* UI FIX: Transformed rigid right padding to conditional desktop scaling (pr-0 md:pr-36) so text doesn't fold awkwardly */}
                                            <span className="inline-block bg-[#f4f7f6] text-primary px-5 md:px-8 py-1.5 md:py-2.5 rounded-full text-sm md:text-4xl font-extrabold tracking-normal md:pr-36">
                                                {service.subtitle}
                                            </span>
                                        </div>
                                    )}

                                    {/* Description */}
                                    {/* UI FIX: Added a lighter, fluid typographic scaling foundation for smaller mobile states (text-base) */}
                                    {service.description && (
                                        <p className="text-base sm:text-xl md:text-2xl lg:text-[34px] text-primary font-medium tracking-tight leading-snug md:leading-tight">
                                            {service.description}
                                        </p>
                                    )}

                                    {/* Section Header & Bullet Points */}
                                    {bulletPoints.length > 0 && (
                                        <div className="space-y-4 md:space-y-6">
                                            <div>
                                                {/* UI FIX: Changed hardcoded padding to conditional layout scaling (pr-0 md:pr-20) */}
                                                <span className="inline-block bg-[#f4f7f6] text-primary px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs sm:text-lg md:text-3xl font-black tracking-normal md:pr-20">
                                                    The Value Of This Collaboration
                                                </span>
                                            </div>
                                            <ul className="space-y-2 md:space-y-3 pl-1 md:pl-2">
                                                {bulletPoints.map((point, index) => (
                                                    /* UI FIX: Bullet font-sizes adapt natively across mobile through ultra-wides */
                                                    <li key={index} className="flex items-start text-sm sm:text-xl font-medium tracking-normal leading-tight text-primary">
                                                        <span className="mr-2 md:mr-3 select-none text-primary">•</span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {(processSteps.length > 0 || tags.length > 0) && (
                                        <div className="px-0 md:px-3 lg:px-6 space-y-6 md:space-y-8">
                                            {/* Isolated Smart Processing Timeline */}
                                            {processSteps.length > 0 && (
                                                <ProcessTimeline steps={processSteps} />
                                            )}

                                            {/* Enhanced Tags Grid Layout */}
                                            {/* UI FIX: Lowered tag padding and typography size slightly on phones for ultra-dense packaging */}
                                            {tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                                                    {tags.map((tag, index) => (
                                                        <span
                                                            key={`${tag}-${index}`}
                                                            className="rounded-full border-[1.5px] border-primary/40 bg-transparent px-3 md:px-5 py-1 md:py-2 text-xs md:text-md font-normal text-primary tracking-wide select-none cursor-default transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary hover:border-primary hover:text-white hover:shadow-sm"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* CTA Action Button */}
                                    {service.buttonText && (
                                        <div className="pt-4 md:pt-6">
                                            <a
                                                href={service.buttonUrl || '/contact'}
                                                /* UI FIX: Handled padding safely without relying on unstable custom fractional classes (py-3.5 md:py-4.5) */
                                                className="flex w-full items-center justify-center rounded-full bg-primary py-3.5 md:py-4.5 font-medium text-white text-sm md:text-lg tracking-wide transition-all duration-300 hover:bg-[#083535]"
                                            >
                                                {service.buttonText}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </section>
    );
}
