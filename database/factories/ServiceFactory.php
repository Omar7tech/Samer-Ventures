<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => 'SV '.ucfirst($this->faker->unique()->word()),
            'subtitle' => ucfirst($this->faker->word()),
            'description' => $this->faker->paragraph(),
            'bullet_points' => $this->faker->sentences(4),
            'process_steps' => ['Discovery', 'Planning', 'Activation', 'Optimization'],
            'tags' => $this->faker->words(5),
            'button_text' => "Let's Talk",
            'button_url' => '/contact',
            'sort_order' => $this->faker->numberBetween(0, 100),
            'is_active' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes): array => [
            'is_active' => false,
        ]);
    }
}
