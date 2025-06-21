<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Http\Resources\DiscussionResource;
use App\Http\Resources\PostResource;
use App\Models\Discussion;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class DiscussionController extends Controller
{
    public function show(Discussion $discussion): Response
    {
        $discussion->load(['topic']);
        $discussion->loadCount('replies');

        return Inertia::render('forum/show', [
            'discussion' => DiscussionResource::make($discussion),
            'posts' => PostResource::collection(
                Post::whereBelongsTo($discussion)
                    ->with(['user', 'discussion'])
                    ->oldest()
                    ->paginate(10)
            ),
        ]);
    }
}
