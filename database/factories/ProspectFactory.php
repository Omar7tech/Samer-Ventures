<?php

namespace Database\Factories;

use App\Enums\DealStatus;
use App\Models\Business;
use App\Models\Prospect;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Prospect>
 */
class ProspectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'business_id' => Business::factory(),
            'business_name' => fake()->company(),
            'deal_description' => fake()->sentence(),
            'phone_number' => fake()->phoneNumber(),
            'owner_name' => fake()->name(),
            'quote' => 'SV-'.str_pad((string) fake()->unique()->numberBetween(1, 999), 3, '0', STR_PAD_LEFT),
            'deal_status' => fake()->randomElement(DealStatus::cases()),
            'created_by' => User::factory(),
        ];
    }
}
