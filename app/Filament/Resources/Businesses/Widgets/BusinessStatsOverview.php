<?php

namespace App\Filament\Resources\Businesses\Widgets;

use App\Filament\Resources\Businesses\BusinessResource;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class BusinessStatsOverview extends StatsOverviewWidget
{
    public static function canView(): bool
    {
        return auth()->user()?->hasRole('super_admin') ?? false;
    }

    protected function getStats(): array
    {
        $total = BusinessResource::getEloquentQuery()->count();
        $withAgents = BusinessResource::getEloquentQuery()->whereHas('salesAgents')->count();
        $withProspects = BusinessResource::getEloquentQuery()->whereHas('prospects')->count();
        $unassigned = $total - $withAgents;

        return [
            Stat::make('Total businesses', $total)
                ->description('All businesses on record')
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('primary'),
            Stat::make('With sales agents', $withAgents)
                ->description($unassigned.' unassigned')
                ->descriptionIcon('heroicon-m-user-group')
                ->color($unassigned > 0 ? 'warning' : 'success'),
            Stat::make('With prospects', $withProspects)
                ->description('Businesses that have deals')
                ->descriptionIcon('heroicon-m-rectangle-stack')
                ->color('info'),
        ];
    }
}
