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
    protected const POSTS_PER_PAGE = 5;

    public function show(Request $request, Discussion $discussion): RedirectResponse|Response
    {
        $discussion->load(['topic', 'posts.discussion']);
        $discussion->loadCount('replies');

        if ($postId = $request->get('post')) {
            return redirect()->route('discussions.show', [
                'discussion' => $discussion,
                'page' => $this->getPageForPost($discussion, $postId),
                'postId' => $postId,
            ]);
        }

        return Inertia::render('forum/show', [
            'query' => $request->query(),
            'discussion' => DiscussionResource::make($discussion),
            'posts' => PostResource::collection(
                Post::whereBelongsTo($discussion)
                    ->with(['user', 'discussion'])
                    ->oldest()
                    ->paginate(self::POSTS_PER_PAGE)
            ),
            'postId' => (int) $request->postId,
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

    protected function getPageForPost(Discussion $discussion, $postId)
    {
        $index = $discussion->posts->search(fn ($post) => $post->id == $postId);
        $page = (int) ceil(($index + 1) / self::POSTS_PER_PAGE);

        return $page;
    }
}
