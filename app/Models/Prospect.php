<?php

namespace App\Models;

use App\Enums\DealStatus;
use Database\Factories\ProspectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prospect extends Model
{
    /** @use HasFactory<ProspectFactory> */
    use HasFactory;

    protected $fillable = [
        'business_id',
        'business_name',
        'deal_description',
        'phone_number',
        'owner_name',
        'code',
        'deal_status',
        'created_by',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'deal_status' => DealStatus::class,
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Prospect $prospect): void {
            if ($prospect->created_by === null && auth()->check()) {
                $prospect->created_by = auth()->id();
            }
        });
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
