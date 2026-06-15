<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class BusinessSalesAgent extends Pivot
{
    protected $table = 'business_sales_agent';

    public $incrementing = true;

    protected $fillable = [
        'business_id',
        'user_id',
        'commission_percentage',
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    public function salesAgent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
