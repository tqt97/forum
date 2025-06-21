<?php

namespace Database\Factories;

use App\Models\Discussion;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userIds = User::pluck('id')->toArray();
        $discussionIds = Discussion::pluck('id')->toArray();
        $postIds = Post::pluck('id')->toArray();

        return [
            'user_id' => $this->faker->randomElement($userIds),
            'discussion_id' => $this->faker->randomElement($discussionIds),
            'parent_id' => $this->faker->randomElement([null, $this->faker->randomElement($postIds)]),
            'body' => $this->faker->paragraphs(3, true),
        ];
    }
}
