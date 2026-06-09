<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quote = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.';

        for ($i = 1; $i <= 5; $i++) {
            Testimonial::updateOrCreate(
                ['name' => "NAME {$i}"],
                [
                    'organization' => 'Organization',
                    'quote' => $quote,
                    'rating' => 5,
                    'sort_order' => $i,
                    'is_active' => true,
                ],
            );
        }
    }
}
