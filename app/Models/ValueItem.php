<?php

namespace App\Models;

use Database\Factories\ValueItemFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValueItem extends Model
{
    /** @use HasFactory<ValueItemFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
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
