<?php

namespace Database\Seeders;

use App\Models\ValueItem;
use Illuminate\Database\Seeder;

class ValueItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'title' => "Commercial\nGrowth Support",
                'description' => 'we help businesses access professional business development, sales support, partnerships, and market insights through flexible outsourced solutions designed for growing companies and SMEs.',
            ],
            [
                'title' => "Outsourced Business\nDevelopment Engine",
                'description' => 'access structured sales and business development support without the cost of hiring a full internal commercial department.',
            ],
            [
                'title' => "Built For SMEs &\nGrowing Businesses",
                'description' => 'helping small and medium enterprises create partnerships, opportunities, and scalable business relationships.',
            ],
            [
                'title' => "Market Research &\nData Collection",
                'description' => 'outsource surveys, customer feedback collection, and market insights to support smarter business and product decisions.',
            ],
            [
                'title' => "Sales Pitch Development\n& Team Support",
                'description' => 'helping companies structure stronger sales presentations, improve communication, and support internal sales teams with strategic guidance.',
            ],
            [
                'title' => "Strategic Relationship\nBuilding",
                'description' => 'create access to partnerships, networking opportunities, sponsorships, and business introductions that move your business forward.',
            ],
        ];

        foreach ($items as $index => $item) {
            ValueItem::updateOrCreate(
                ['title' => $item['title']],
                [
                    'description' => $item['description'],
                    'sort_order' => $index,
                    'is_active' => true,
                ],
            );
        }
    }
}
