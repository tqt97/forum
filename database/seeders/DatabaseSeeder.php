<?php

namespace Database\Seeders;

use App\Models\Discussion;
use App\Models\Topic;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Topic::factory(5)->create();
        User::factory()->create([
            'username' => 'Admin',
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12341234'),
        ]);
        User::factory(20)->create();
        Discussion::factory(100)->create();
    }
}
