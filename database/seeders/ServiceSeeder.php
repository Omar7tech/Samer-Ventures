<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'title' => 'SV Growth',
                'subtitle' => 'Sales',
                'description' => 'SV Growth™ Helps Businesses Generate Opportunities, Acquire New Clients, And Build A Structured Sales Engine Without The Need To Hire A Full In-House Sales Department. We Support Companies In Identifying Prospects, Managing Outreach Efforts, Improving Follow-Up Processes, And Creating A More Consistent Path To Revenue Growth.',
                'bullet_points' => [
                    'Access Professional Sales Support Without Full-Time Hiring Costs',
                    'Focus Internal Resources On Operations While Growth Activities Are Supported Externally',
                    'Improve Lead Generation And Opportunity Management',
                    'Create Better Follow-Up And Communication Systems',
                    'Build A More Consistent Sales Process',
                    'Strengthen Client Acquisition Efforts',
                ],
                'process_steps' => ['Discovery', 'Planning', 'Activation', 'Optimization'],
                'tags' => [
                    'Sales Activity Planning',
                    'Prospect Identification',
                    'Sales Outreach Support',
                    'Growth Recommendations',
                    'Meeting Coordination',
                    'Opportunity Tracking',
                    'Follow-Up Support',
                ],
                'button_text' => "Let's Build Your Sales Engine",
                'button_url' => '/contact',
            ],
            [
                'title' => 'SV Development',
                'subtitle' => 'Technology',
                'description' => 'SV Development™ Provides Strategic Technology Solutions That Transform Business Operations And Digital Presence. We Build Custom Software, Web Applications, And Digital Platforms That Drive Efficiency, Enhance User Experience, And Support Long-Term Growth.',
                'bullet_points' => [
                    'Custom Software Development Tailored To Your Business Needs',
                    'Modern Web Applications With Seamless User Experience',
                    'Scalable Architecture For Future Growth',
                    'Integration With Existing Business Systems',
                    'Performance Optimization And Security Best Practices',
                    'Ongoing Technical Support And Maintenance',
                ],
                'process_steps' => ['Discovery', 'Design', 'Development', 'Deployment'],
                'tags' => [
                    'Web Development',
                    'Custom Software',
                    'API Integration',
                    'Database Design',
                    'Cloud Solutions',
                    'Mobile Applications',
                    'Technical Consulting',
                ],
                'button_text' => "Let's Build Your Solution",
                'button_url' => '/contact',
            ],
            [
                'title' => 'SV Insights',
                'subtitle' => 'Analytics',
                'description' => 'SV Insights™ Empowers Businesses To Make Data-Driven Decisions Through Advanced Analytics, Business Intelligence, And Strategic Market Research. We Transform Raw Data Into Actionable Intelligence That Drives Competitive Advantage.',
                'bullet_points' => [
                    'Comprehensive Market Analysis And Competitive Intelligence',
                    'Data Visualization And Interactive Dashboards',
                    'Predictive Analytics For Strategic Planning',
                    'Customer Behavior Analysis And Segmentation',
                    'Performance Metrics And KPI Tracking',
                    'Strategic Recommendations Based On Data',
                ],
                'process_steps' => ['Collection', 'Analysis', 'Visualization', 'Action'],
                'tags' => [
                    'Market Research',
                    'Business Intelligence',
                    'Data Analytics',
                    'Competitive Analysis',
                    'Customer Insights',
                    'Performance Tracking',
                    'Strategic Planning',
                ],
                'button_text' => "Let's Unlock Your Insights",
                'button_url' => '/contact',
            ],
            [
                'title' => 'SV Relations',
                'subtitle' => 'Partnerships',
                'description' => 'SV Relations™ Focuses On Building And Nurturing Strategic Partnerships That Drive Mutual Growth. We Connect Businesses With The Right Partners, Manage Relationship Development, And Create Collaborative Opportunities That Expand Market Reach.',
                'bullet_points' => [
                    'Strategic Partner Identification And Vetting',
                    'Partnership Development And Negotiation',
                    'Collaborative Program Design',
                    'Relationship Management And Communication',
                    'Co-Marketing And Joint Venture Opportunities',
                    'Long-Term Partnership Growth Strategies',
                ],
                'process_steps' => ['Identification', 'Engagement', 'Collaboration', 'Growth'],
                'tags' => [
                    'Partner Sourcing',
                    'Relationship Building',
                    'Negotiation Support',
                    'Alliance Management',
                    'Co-Marketing',
                    'Joint Ventures',
                    'Network Expansion',
                ],
                'button_text' => "Let's Build Your Network",
                'button_url' => '/contact',
            ],
        ];

        foreach ($services as $index => $service) {
            Service::updateOrCreate(
                ['title' => $service['title']],
                [
                    ...$service,
                    'sort_order' => $index,
                    'is_active' => true,
                ],
            );
        }
    }
}
