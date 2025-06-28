<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'discussion_id',
        'parent_id',
        'body',
    ];

    protected static function booted()
    {
        static::created(function ($post) {
            preg_match_all('(\@(?P<username>[a-zA-Z\-\_]+))', $post->body, $mentions, PREG_SET_ORDER);

            $post->mentions()->sync(
                User::whereIn('username', collect($mentions)->pluck('username'))->pluck('id')
            );
        });
    }

    public function discussion(): BelongsTo
    {
        return $this->belongsTo(Discussion::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Post::class, 'parent_id');
    }

    public function mentions(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'mentions', 'post_id')
            ->withTimestamps();
    }
}
