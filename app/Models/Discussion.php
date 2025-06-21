<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Discussion extends Model
{
    /** @use HasFactory<\Database\Factories\DiscussionFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'topic_id', 'title', 'slug', 'pinned_at'];

    protected function casts(): array
    {
        return [
            'pinned_at' => 'datetime',
        ];
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

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function post(): HasOne
    {
        return $this->hasOne(Post::class)
            ->whereNull('parent_id');
    }
}
