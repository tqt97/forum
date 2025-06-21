<?php

namespace Database\Seeders;

use App\Models\Topic;
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
        Topic::factory(5)->create();

        User::factory()->create([
            'username' => 'test',
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
