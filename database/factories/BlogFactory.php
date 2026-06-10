<?php

namespace Database\Factories;

use App\Models\Blog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => rtrim($this->faker->sentence(4), '.'),
            'content' => $this->faker->randomHtml(5, 5),
            'description' => $this->faker->sentence(20),
            'active' => $this->faker->boolean(80),
        ];
    }
}
