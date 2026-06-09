<?php

namespace Database\Seeders;

use App\Models\WhatWeDo;
use Illuminate\Database\Seeder;

class WhatWeDoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            'Sales Outsourcing',
            'Business Development',
            'Corporate Relations',
            'PR & Sponsorships',
            'Market Research',
        ];

        foreach ($items as $index => $title) {
            WhatWeDo::updateOrCreate(
                ['title' => $title],
                [
                    'sort_order' => $index,
                    'is_active' => true,
                ],
            );
        }
    }
}
