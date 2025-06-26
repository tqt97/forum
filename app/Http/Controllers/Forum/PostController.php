<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostStoreRequest;
use App\Models\Discussion;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;

class PostController extends Controller
{
    public function store(PostStoreRequest $request, Discussion $discussion): RedirectResponse
    {
        // dd($discussion);
        $post = Post::make($request->validated());

        $post->user()->associate($request->user());
        $post->discussion()->associate($discussion);
        $post->parent()->associate($discussion->post);

        $post->save();

        // return redirect()->route('discussions.show', $discussion);
        return redirect(route('discussions.show', $discussion).'?post='.$post->id);
    }
}
