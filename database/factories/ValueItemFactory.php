<?php

namespace Database\Factories;

use App\Models\ValueItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ValueItem>
 */
class ValueItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(15),
            'sort_order' => $this->faker->numberBetween(0, 100),
            'is_active' => true,
        ];
    }
}
