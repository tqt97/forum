<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Discussion extends Model
{
    /** @use HasFactory<\Database\Factories\DiscussionFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'topic_id', 'title', 'slug', 'pinned_at', 'solution_post_id'];

    protected static function booted()
    {
        static::created(function ($discussion) {
            $discussion->update(['slug' => $discussion->title]);
        });
    }

    protected function casts(): array
    {
        return [
            'pinned_at' => 'datetime',
        ];
    }

    public function setSlugAttribute($value)
    {
        $this->attributes['slug'] = $this->id.'-'.Str::slug($value);
    }

    public function scopeOrderByPinned($query)
    {
        $query->orderBy('pinned_at', 'desc');
    }

    public function isPinned(): bool
    {
        return ! is_null($this->pinned_at);
    }

    public function topic(): BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * All posts in the discussion.
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function solution(): BelongsTo
    {
        return $this->belongsTo(Post::class, 'solution_post_id');
    }

    /**
     * The original post in the discussion.
     *
     * This is the first post in the discussion and is the parent
     * of all other posts in the discussion.
     */
    public function post(): HasOne
    {
        return $this->hasOne(Post::class)
            ->whereNull('parent_id');
    }

    /**
     * All replies in the discussion.
     *
     * A reply is a post that is not the original post in the discussion.
     */
    public function replies(): HasMany
    {
        return $this->hasMany(Post::class)
            ->whereNotNull('parent_id');
    }

    /**
     * The latest post in the discussion.
     */
    public function latestPost(): HasOne
    {
        return $this->hasOne(Post::class)
            ->latestOfMany();
    }

    /**
     * The users who have posted in the discussion.
     *
     * @return HasManyThrough<\App\Models\User>
     */
    public function participants(): HasManyThrough
    {
        return $this->hasManyThrough(User::class, Post::class, 'discussion_id', 'id', 'id', 'user_id')
            ->distinct();
    }

    public function scopeOrderByLastPost($query)
    {
        $query->orderBy(
            Post::select('created_at')
                ->whereColumn('posts.discussion_id', 'discussions.id')
                ->latest()
                ->take(1),
            'desc'
        );
    }

    public function scopeNoReplies($query)
    {
        $query->when(request()->has('noreplies'), fn ($query) => $query->has('posts', '=', 1));
    }
}
