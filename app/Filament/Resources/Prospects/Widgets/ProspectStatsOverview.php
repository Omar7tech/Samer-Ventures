<?php

namespace App\Filament\Resources\Prospects\Widgets;

use App\Enums\DealStatus;
use App\Models\Prospect;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Database\Eloquent\Builder;

class ProspectStatsOverview extends StatsOverviewWidget
{
    /**
     * Optionally scope the stats to a single business (used on the per-business page).
     */
    public ?int $businessId = null;

    protected function getStats(): array
    {
        $counts = $this->baseQuery()
            ->selectRaw('deal_status, count(*) as aggregate')
            ->groupBy('deal_status')
            ->pluck('aggregate', 'deal_status');

        $total = (int) $counts->sum();
        $closed = (int) $counts->get(DealStatus::Closed->value, 0);
        $active = (int) $counts->get(DealStatus::ColdDeal->value, 0)
            + (int) $counts->get(DealStatus::FollowUp->value, 0)
            + (int) $counts->get(DealStatus::Postponed->value, 0);
        $cancelled = (int) $counts->get(DealStatus::Cancelled->value, 0);

        $closeRate = $total > 0 ? round(($closed / $total) * 100) : 0;

        return [
            Stat::make('Total prospects', $total)
                ->description('All deals tracked')
                ->descriptionIcon('heroicon-m-rectangle-stack')
                ->color('primary'),
            Stat::make('Closed', $closed)
                ->description($closeRate.'% close rate')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),
            Stat::make('Active', $active)
                ->description('Cold, follow up & postponed')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('warning'),
            Stat::make('Cancelled', $cancelled)
                ->description('Deals that fell through')
                ->descriptionIcon('heroicon-m-x-circle')
                ->color('danger'),
        ];
    }

    /**
     * @return Builder<Prospect>
     */
    protected function baseQuery()
    {
        return Prospect::query()
            ->when($this->businessId, fn ($query) => $query->where('business_id', $this->businessId));
    }
}
