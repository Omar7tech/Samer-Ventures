<?php

namespace App\Models;

use Database\Factories\WhatWeDoFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WhatWeDo extends Model
{
    /** @use HasFactory<WhatWeDoFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }
}
