<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum DealStatus: string implements HasColor, HasLabel
{
    case ColdDeal = 'cold_deal';
    case FollowUp = 'follow_up';
    case Closed = 'closed';
    case Cancelled = 'cancelled';
    case Postponed = 'postponed';

    public function getLabel(): string
    {
        return match ($this) {
            self::ColdDeal => 'Cold Deal',
            self::FollowUp => 'Follow up',
            self::Closed => 'Closed',
            self::Cancelled => 'Cancelled',
            self::Postponed => 'Postponed',
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::ColdDeal => 'info',
            self::FollowUp => 'warning',
            self::Closed => 'success',
            self::Cancelled => 'danger',
            self::Postponed => 'gray',
        };
    }
}
