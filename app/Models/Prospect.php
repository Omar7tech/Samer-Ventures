<?php

namespace App\Models;

use App\Enums\DealStatus;
use Database\Factories\ProspectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

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
        'updated_by',
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

            if (blank($prospect->code)) {
                $prospect->code = static::generateCode($prospect);
            }
        });

        static::saving(function (Prospect $prospect): void {
            if (auth()->check()) {
                $prospect->updated_by = auth()->id();
            }
        });
    }

    /**
     * Build a unique code in the form "SV-{PREFIX}-0001", where PREFIX is the first
     * letters of the parent business's name. The sequence increments per business, is
     * zero-padded to four digits, and continues normally once it passes 9999.
     */
    public static function generateCode(self $prospect): string
    {
        $businessName = $prospect->business()->value('name');

        $prefix = 'SV-'.static::codePrefix($businessName).'-';

        $highest = static::query()
            ->where('business_id', $prospect->business_id)
            ->pluck('code')
            ->map(fn (string $code): int => (int) Str::afterLast($code, '-'))
            ->max();

        $next = ($highest ?? 0) + 1;

        do {
            $code = $prefix.str_pad((string) $next, 4, '0', STR_PAD_LEFT);
            $next++;
        } while (static::query()->where('code', $code)->exists());

        return $code;
    }

    /**
     * The uppercase first letter of each word in the parent business's name
     * (e.g. "Facebook" => "F", "Face Book" => "FB", "Lorem Ipsum blabla" => "LIB").
     */
    protected static function codePrefix(?string $businessName): string
    {
        $initials = collect(preg_split('/\s+/', trim((string) $businessName)) ?: [])
            ->filter()
            ->map(fn (string $word): string => Str::upper(Str::substr($word, 0, 1)))
            ->implode('');

        return $initials !== '' ? $initials : 'X';
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function editor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
