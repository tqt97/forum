<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Http\Resources\DiscussionResource;
use App\Models\Discussion;
use Inertia\Inertia;
use Inertia\Response;

class ForumController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('forum/index', [
            'discussions' => DiscussionResource::collection(
                Discussion::with(['topic'])
                    ->select('id', 'title', 'slug', 'topic_id', 'created_at')
                    ->latest()
                    ->paginate(10)
            ),
        ]);
    }
}
