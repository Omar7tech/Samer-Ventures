<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::updateOrCreate([
            'email' => 'admin@samerventures.com',
        ], [
            'name' => 'Samer Ventures',
            'password' => bcrypt('password'),
        ]);

        $this->call(WhatWeDoSeeder::class);
        $this->call(ValueItemSeeder::class);
        $this->call(TestimonialSeeder::class);
        $this->call(BlogSeeder::class);
    }
}
