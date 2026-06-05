import { ArrowRight } from 'lucide-react';
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
        title: 'SV Growth™',
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
        title: 'SV Development™',
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
        title: 'SV Insights™',
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
        title: 'SV Relations™',
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

export default function ServicesAccordion() {
    return (
        <section className="py-24 px-5 md:px-10 lg:px-32">
            <div className="max-w-[1700px] mx-auto">
                <Accordion type="multiple">
                    {services.map((service) => (
                        <AccordionItem key={service.id} value={service.id}>
                            <AccordionTrigger
                                className="text-[clamp(1.5rem,4vw,3.5rem)] font-bold text-primary uppercase leading-tight"
                            >
                                {service.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="px-5 py-8 space-y-8">
                                    <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                                        {service.subtitle}
                                    </div>

                                    <p className="text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-primary/90 font-light max-w-full">
                                        {service.description}
                                    </p>

                                    <div>
                                        <h3 className="text-primary font-semibold mb-4 text-lg">
                                            The Value Of This Collaboration
                                        </h3>
                                        <ul className="list-inside list-disc space-y-2 marker:text-primary text-primary/80 text-[clamp(0.9rem,1.2vw,1rem)]">
                                            {service.bulletPoints.map((point) => (
                                                <li key={point}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        {service.processSteps.map((step, index) => (
                                            <div key={step} className="flex items-center">
                                                <span className="text-primary font-medium text-sm whitespace-nowrap">
                                                    {step}
                                                </span>
                                                {index < service.processSteps.length - 1 && (
                                                    <div className="mx-4 h-px w-12 bg-primary/30" />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {service.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-primary/30 bg-white px-4 py-2 text-sm font-light text-primary"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={service.buttonUrl}
                                        className="flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 font-medium text-white transition-all duration-300 hover:bg-primary/90"
                                    >
                                        {service.buttonText}
                                    </a>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
