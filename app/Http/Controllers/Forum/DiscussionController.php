<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDiscussionRequest;
use App\Http\Resources\DiscussionResource;
use App\Http\Resources\PostResource;
use App\Models\Discussion;
use App\Models\Post;
use App\Models\Topic;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class DiscussionController extends Controller
{
    public function show(Request $request, Discussion $discussion): Response
    {
        $discussion->load(['topic']);
        $discussion->loadCount('replies');

        return Inertia::render('forum/show', [
            'query' => $request->query(),
            'discussion' => DiscussionResource::make($discussion),
            'posts' => PostResource::collection(
                Post::whereBelongsTo($discussion)
                    ->with(['user', 'discussion'])
                    ->oldest()
                    ->paginate(10)
            ),
        ]);
    }

    public function store(StoreDiscussionRequest $request): RedirectResponse
    {
        // Gate::authorize('create', Discussion::class);
        $data = $request->validated();
        $discussion = Discussion::make([
            'title' => $data['title'],
        ]);

        $discussion->user()->associate($request->user());
        $discussion->topic()->associate(Topic::find($data['topic_id']));

        $discussion->save();

        $post = Post::make([
            'body' => $data['body'],
        ]);

        $post->user()->associate($request->user());

        $discussion->posts()->save($post);

        return redirect()->route('discussions.show', $discussion);
    }
}
