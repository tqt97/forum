<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Http\Resources\DiscussionResource;
use App\Models\Discussion;
use Inertia\Response;

class DiscussionController extends Controller
{
    public function show(Discussion $discussion): Response
    {
        $discussion->load(['topic']);

        return inertia()->render('forum/show', [
            'discussion' => DiscussionResource::make($discussion),
        ]);
    }
}
