<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $superAdminRole = Role::firstOrCreate(['name' => 'super_admin']);
        $salesAgent = Role::firstOrCreate(['name' => 'sales_agent']);
        $admin = User::updateOrCreate([
            'email' => 'admin@samerventures.com',
        ], [
            'name' => 'Samer Ventures',
            'password' => bcrypt('password'),
        ]);
        if (!$admin->hasRole('super_admin')) {
            $admin->assignRole('super_admin');
        }

        $this->call([
            WhatWeDoSeeder::class,
            ValueItemSeeder::class,
            TestimonialSeeder::class,
            ServiceSeeder::class,
        ]);
    }
}
