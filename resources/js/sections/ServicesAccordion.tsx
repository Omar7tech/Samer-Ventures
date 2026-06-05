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

// Reusable animated wrapper to control individual process tracks independently
function ProcessTimeline({ steps }: { steps: string[] }) {
    const [animated, setAnimated] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimated(true);
                    observer.disconnect(); // Runs strictly once on first layout intersection
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Exact premium stagger configuration maps (4 items supported perfectly)
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
        <div ref={elementRef} className="flex flex-wrap items-center gap-y-4 pt-4 select-none">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center group/step">
                    {/* Step Title Label */}
                    <span
                        className={`text-lg font-bold tracking-wide transition-colors ease-out ${
                            animated 
                                ? `text-primary ${stepDelays[index]}` 
                                : 'text-neutral-300'
                        }`}
                    >
                        {step}
                    </span>

                    {/* Connector Line and End Dot */}
                    {index < steps.length - 1 && (
                        <div className="mx-5 hidden sm:flex items-center">
                            {/* Inner horizontal filler axis */}
                            <div className="h-[1.5px] w-14 bg-neutral-200 relative overflow-hidden rounded-full">
                                <div
                                    className={`absolute inset-0 bg-primary origin-left transition-transform ease-out ${
                                        animated 
                                            ? `scale-x-100 ${lineDelays[index]}` 
                                            : 'scale-x-0'
                                    }`}
                                />
                            </div>

                            {/* Minimal terminal circle dot */}
                            <div
                                className={`h-1.5 w-1.5 rounded-full ml-0.5 transition-all ease-out ${
                                    animated
                                        ? `bg-primary scale-100 opacity-100 ${dotDelays[index]}`
                                        : 'bg-neutral-300 scale-50 opacity-40'
                                }`}
                            />
                        </div>
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
                                <div className="px-5 py-8 space-y-10">
                                    {/* Category Pill */}
                                    <div>
                                        <span className="inline-block bg-[#f4f7f6] text-primary px-8 py-2.5 rounded-full text-lg md:text-4xl font-extrabold tracking-normal pr-36">
                                            {service.subtitle}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-xl md:text-2xl lg:text-[34px] text-primary font-medium tracking-tight leading-tight">
                                        {service.description}
                                    </p>

                                    {/* Section Header & Bullet Points */}
                                    <div className="space-y-6">
                                        <span className="inline-block bg-[#f4f7f6] text-primary px-6 py-2 rounded-full text-lg md:text-3xl font-black tracking-normal pr-20">
                                            The Value Of This Collaboration
                                        </span>
                                        <ul className="space-y-3 pl-2">
                                            {service.bulletPoints.map((point, index) => (
                                                <li key={index} className="flex items-start text-xl font-medium tracking-normal leading-tight text-primary">
                                                    <span className="mr-3 select-none text-primary">•</span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className='px-0 md:px-3 lg:px-6 space-y-8'>
                                        {/* Isolated Smart Processing Timeline */}
                                        <ProcessTimeline steps={service.processSteps} />

                                        {/* Enhanced Tags Grid Layout */}
                                        <div className="flex flex-wrap gap-3 pt-2">
                                            {service.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full border-[1.5px] border-primary/40 bg-transparent px-5 py-2 text-md font-normal text-primary tracking-wide select-none cursor-default transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary hover:border-primary hover:text-white hover:shadow-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA Action Button */}
                                    <div className="pt-6">
                                        <a
                                            href={service.buttonUrl}
                                            className="flex w-full items-center justify-center rounded-full bg-primary py-4.5 font-medium text-white text-lg tracking-wide transition-all duration-300 hover:bg-[#083535]"
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