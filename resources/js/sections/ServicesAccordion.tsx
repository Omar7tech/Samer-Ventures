import { useState, useEffect, useRef } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface Service {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    bulletPoints: string[];
    processSteps: string[];
    tags: string[];
    buttonText: string;
    buttonUrl: string;
}

const services: Service[] = [
    {
        id: 'sv-growth',
        title: 'SV Growth',
        subtitle: 'Sales',
        description: 'SV Growth™ Helps Businesses Generate Opportunities, Acquire New Clients, And Build A Structured Sales Engine Without The Need To Hire A Full In-House Sales Department. We Support Companies In Identifying Prospects, Managing Outreach Efforts, Improving Follow-Up Processes, And Creating A More Consistent Path To Revenue Growth.',
        bulletPoints: [
            'Access Professional Sales Support Without Full-Time Hiring Costs',
            'Focus Internal Resources On Operations While Growth Activities Are Supported Externally',
            'Improve Lead Generation And Opportunity Management',
            'Create Better Follow-Up And Communication Systems',
            'Build A More Consistent Sales Process',
            'Strengthen Client Acquisition Efforts',
        ],
        processSteps: ['Discovery', 'Planning', 'Activation', 'Optimization'],
        tags: [
            'Sales Activity Planning',
            'Prospect Identification',
            'Sales Outreach Support',
            'Growth Recommendations',
            'Meeting Coordination',
            'Opportunity Tracking',
            'Follow-Up Support',
        ],
        buttonText: "Let's Build Your Sales Engine",
        buttonUrl: '/contact',
    },
    {
        id: 'sv-development',
        title: 'SV Development',
        subtitle: 'Technology',
        description: 'SV Development™ Provides Strategic Technology Solutions That Transform Business Operations And Digital Presence. We Build Custom Software, Web Applications, And Digital Platforms That Drive Efficiency, Enhance User Experience, And Support Long-Term Growth.',
        bulletPoints: [
            'Custom Software Development Tailored To Your Business Needs',
            'Modern Web Applications With Seamless User Experience',
            'Scalable Architecture For Future Growth',
            'Integration With Existing Business Systems',
            'Performance Optimization And Security Best Practices',
            'Ongoing Technical Support And Maintenance',
        ],
        processSteps: ['Discovery', 'Design', 'Development', 'Deployment'],
        tags: [
            'Web Development',
            'Custom Software',
            'API Integration',
            'Database Design',
            'Cloud Solutions',
            'Mobile Applications',
            'Technical Consulting',
        ],
        buttonText: "Let's Build Your Solution",
        buttonUrl: '/contact',
    },
    {
        id: 'sv-insights',
        title: 'SV Insights',
        subtitle: 'Analytics',
        description: 'SV Insights™ Empowers Businesses To Make Data-Driven Decisions Through Advanced Analytics, Business Intelligence, And Strategic Market Research. We Transform Raw Data Into Actionable Intelligence That Drives Competitive Advantage.',
        bulletPoints: [
            'Comprehensive Market Analysis And Competitive Intelligence',
            'Data Visualization And Interactive Dashboards',
            'Predictive Analytics For Strategic Planning',
            'Customer Behavior Analysis And Segmentation',
            'Performance Metrics And KPI Tracking',
            'Strategic Recommendations Based On Data',
        ],
        processSteps: ['Collection', 'Analysis', 'Visualization', 'Action'],
        tags: [
            'Market Research',
            'Business Intelligence',
            'Data Analytics',
            'Competitive Analysis',
            'Customer Insights',
            'Performance Tracking',
            'Strategic Planning',
        ],
        buttonText: "Let's Unlock Your Insights",
        buttonUrl: '/contact',
    },
    {
        id: 'sv-relations',
        title: 'SV Relations',
        subtitle: 'Partnerships',
        description: 'SV Relations™ Focuses On Building And Nurturing Strategic Partnerships That Drive Mutual Growth. We Connect Businesses With The Right Partners, Manage Relationship Development, And Create Collaborative Opportunities That Expand Market Reach.',
        bulletPoints: [
            'Strategic Partner Identification And Vetting',
            'Partnership Development And Negotiation',
            'Collaborative Program Design',
            'Relationship Management And Communication',
            'Co-Marketing And Joint Venture Opportunities',
            'Long-Term Partnership Growth Strategies',
        ],
        processSteps: ['Identification', 'Engagement', 'Collaboration', 'Growth'],
        tags: [
            'Partner Sourcing',
            'Relationship Building',
            'Negotiation Support',
            'Alliance Management',
            'Co-Marketing',
            'Joint Ventures',
            'Network Expansion',
        ],
        buttonText: "Let's Build Your Network",
        buttonUrl: '/contact',
    },
];

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

    const stepDelays = [
        'duration-500 delay-[0ms]',
        'duration-500 delay-[600ms]',
        'duration-500 delay-[1200ms]',
        'duration-500 delay-[1800ms]'
    ];

    const lineDelays = [
        'duration-[400ms] delay-[200ms]',
        'duration-[400ms] delay-[800ms]',
        'duration-[400ms] delay-[1400ms]'
    ];

    const dotDelays = [
        'duration-300 delay-[550ms]',
        'duration-300 delay-[1150ms]',
        'duration-300 delay-[1750ms]'
    ];

    return (
        /* UI FIX: Added flex-row flex-wrap sm:flex-nowrap so items don't split up into ugly separate lines on narrow widths */
        <div ref={elementRef} className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-x-3 gap-y-2 sm:gap-x-0 sm:gap-y-0 pt-4 select-none">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center group/step">
                    <span
                        className={`text-sm md:text-lg font-bold tracking-wide transition-colors ease-out ${
                            animated 
                                ? `text-primary ${stepDelays[index]}` 
                                : 'text-neutral-300'
                        }`}
                    >
                        {step}
                    </span>

                    {index < steps.length - 1 && (
                        /* UI FIX: Responsive margins (mx-2 on mobile scaling up to your pristine mx-5 on desktop) */
                        <div className="mx-2 md:mx-5 hidden sm:flex items-center">
                            <div className="h-[1.5px] w-8 md:w-14 bg-neutral-200 relative overflow-hidden rounded-full">
                                <div
                                    className={`absolute inset-0 bg-primary origin-left transition-transform ease-out ${
                                        animated 
                                            ? `scale-x-100 ${lineDelays[index]}` 
                                            : 'scale-x-0'
                                    }`}
                                />
                            </div>

                            <div
                                className={`h-1.5 w-1.5 rounded-full ml-0.5 transition-all ease-out ${
                                    animated
                                        ? `bg-primary scale-100 opacity-100 ${dotDelays[index]}`
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

export default function ServicesAccordion() {
    return (
        <section className="py-24 px-5 md:px-10 lg:px-32 max-w-[1700px] mx-auto">
            <div>
                <Accordion type="multiple" defaultValue={['sv-growth']}>
                    {services.map((service) => (
                        <AccordionItem key={service.id} value={service.id}>
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
                                    <div>
                                        {/* UI FIX: Transformed rigid right padding to conditional desktop scaling (pr-0 md:pr-36) so text doesn't fold awkwardly */}
                                        <span className="inline-block bg-[#f4f7f6] text-primary px-5 md:px-8 py-1.5 md:py-2.5 rounded-full text-sm md:text-4xl font-extrabold tracking-normal pr-0 md:pr-36">
                                            {service.subtitle}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    {/* UI FIX: Added a lighter, fluid typographic scaling foundation for smaller mobile states (text-base) */}
                                    <p className="text-base sm:text-xl md:text-2xl lg:text-[34px] text-primary font-medium tracking-tight leading-snug md:leading-tight">
                                        {service.description}
                                    </p>

                                    {/* Section Header & Bullet Points */}
                                    <div className="space-y-4 md:space-y-6">
                                        <div>
                                            {/* UI FIX: Changed hardcoded padding to conditional layout scaling (pr-0 md:pr-20) */}
                                            <span className="inline-block bg-[#f4f7f6] text-primary px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs sm:text-lg md:text-3xl font-black tracking-normal pr-0 md:pr-20">
                                                The Value Of This Collaboration
                                            </span>
                                        </div>
                                        <ul className="space-y-2 md:space-y-3 pl-1 md:pl-2">
                                            {service.bulletPoints.map((point, index) => (
                                                /* UI FIX: Bullet font-sizes adapt natively across mobile through ultra-wides */
                                                <li key={index} className="flex items-start text-sm sm:text-xl font-medium tracking-normal leading-tight text-primary">
                                                    <span className="mr-2 md:mr-3 select-none text-primary">•</span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="px-0 md:px-3 lg:px-6 space-y-6 md:space-y-8">
                                        {/* Isolated Smart Processing Timeline */}
                                        <ProcessTimeline steps={service.processSteps} />

                                        {/* Enhanced Tags Grid Layout */}
                                        {/* UI FIX: Lowered tag padding and typography size slightly on phones for ultra-dense packaging */}
                                        <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                                            {service.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full border-[1.5px] border-primary/40 bg-transparent px-3 md:px-5 py-1 md:py-2 text-xs md:text-md font-normal text-primary tracking-wide select-none cursor-default transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary hover:border-primary hover:text-white hover:shadow-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA Action Button */}
                                    <div className="pt-4 md:pt-6">
                                        <a
                                            href={service.buttonUrl}
                                            /* UI FIX: Handled padding safely without relying on unstable custom fractional classes (py-3.5 md:py-4.5) */
                                            className="flex w-full items-center justify-center rounded-full bg-primary py-3.5 md:py-4.5 font-medium text-white text-sm md:text-lg tracking-wide transition-all duration-300 hover:bg-[#083535]"
                                        >
                                            {service.buttonText}
                                        </a>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}