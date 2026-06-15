<?php

namespace App\Models;

use Database\Factories\BusinessFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Business extends Model implements HasMedia
{
    /** @use HasFactory<BusinessFactory> */
    use HasFactory;

    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'representative_name',
        'representative_phone',
        'representative_email',
        'description',
        'service_id',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Sales agents assigned to this business, with their per-business commission.
     */
    public function salesAgents(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'business_sales_agent')
            ->withPivot('commission_percentage')
            ->withTimestamps();
    }

    /**
     * Pivot rows for sales-agent assignments (used by the form repeater).
     */
    public function businessSalesAgents(): HasMany
    {
        return $this->hasMany(BusinessSalesAgent::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('files');
    }
}
