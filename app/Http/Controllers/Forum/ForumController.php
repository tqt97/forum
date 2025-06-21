<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ForumController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('forum/index');
    }
}
