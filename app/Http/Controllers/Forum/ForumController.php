<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Http\QueryFilters\MineQueryFilter;
use App\Http\QueryFilters\NoRepliesQueryFilter;
use App\Http\QueryFilters\ParticipatingQueryFilter;
use App\Http\QueryFilters\SolvedQueryFilter;
use App\Http\QueryFilters\TopicQueryFilter;
use App\Http\QueryFilters\UnsolvedQueryFilter;
use App\Http\Resources\DiscussionResource;
use App\Models\Discussion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ForumController extends Controller
{
    public function __invoke(Request $request): Response
    {

        return Inertia::render('forum/index', [
            'query' => (object) $request->query(),
            'discussions' => DiscussionResource::collection(
                QueryBuilder::for(Discussion::class)
                    ->allowedFilters($this->allowedFilters())
                    ->with(['topic', 'post', 'latestPost.user', 'participants'])
                    ->withCount('replies')
                    ->orderByPinned()
                    ->orderByLastPost()
                    ->paginate(10)
                    ->appends($request->query())
            ),
        ]);
    }

    protected function allowedFilters()
    {
        return [
            AllowedFilter::custom('noreplies', new NoRepliesQueryFilter),
            AllowedFilter::custom('topic', new TopicQueryFilter),

            AllowedFilter::custom('mine', new MineQueryFilter),
            AllowedFilter::custom('participating', new ParticipatingQueryFilter),

            AllowedFilter::custom('solved', new SolvedQueryFilter),
            AllowedFilter::custom('unsolved', new UnsolvedQueryFilter),
        ];
    }
}
