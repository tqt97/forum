<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mention extends Model
{
    /** @use HasFactory<\Database\Factories\MentionFactory> */
    use HasFactory;

    protected $fillable = ['id', 'user_id', 'post_id'];
}
