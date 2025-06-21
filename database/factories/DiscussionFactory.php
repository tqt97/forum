<?php

namespace Database\Factories;

use App\Models\Topic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Discussion>
 */
class DiscussionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $topicIds = Topic::pluck('id')->toArray();
        $userIds = User::pluck('id')->toArray();

        return [
            'title' => $title = $this->faker->sentence(),
            'slug' => Str::slug($title),
            'topic_id' => $this->faker->randomElement($topicIds),
            'user_id' => $this->faker->randomElement($userIds),
            'pinned_at' => $this->faker->randomElement([now(), null]),
        ];
    }
}
