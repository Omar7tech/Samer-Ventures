<?php

namespace App\Enums;

use BackedEnum;
use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;
use Filament\Support\Icons\Heroicon;
use Illuminate\Contracts\Support\Htmlable;

enum DealStatus: string implements HasColor, HasIcon, HasLabel
{
    case ColdDeal = 'cold_deal';
    case FollowUp = 'follow_up';
    case Closed = 'closed';
    case Cancelled = 'cancelled';
    case Postponed = 'postponed';

    public function getLabel(): string|Htmlable|null
    {
        return match ($this) {
            self::ColdDeal => 'Cold Deal',
            self::FollowUp => 'Follow up',
            self::Closed => 'Closed',
            self::Cancelled => 'Cancelled',
            self::Postponed => 'Postponed',
        };
    }

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::ColdDeal => 'info',
            self::FollowUp => 'warning',
            self::Closed => 'success',
            self::Cancelled => 'danger',
            self::Postponed => 'gray',
        };
    }

    public function getIcon(): string|BackedEnum|Htmlable|null
    {
        return match ($this) {
            self::ColdDeal => Heroicon::OutlinedSparkles,
            self::FollowUp => Heroicon::OutlinedArrowPath,
            self::Closed => Heroicon::OutlinedCheckCircle,
            self::Cancelled => Heroicon::OutlinedXCircle,
            self::Postponed => Heroicon::OutlinedClock,
        };
    }
}
