<?php

namespace App\Filament\Resources\Businesses;

use App\Filament\Resources\Businesses\Pages\CreateBusiness;
use App\Filament\Resources\Businesses\Pages\EditBusiness;
use App\Filament\Resources\Businesses\Pages\ListBusinesses;
use App\Filament\Resources\Businesses\Pages\ManageBusinessMedia;
use App\Filament\Resources\Businesses\Pages\ViewBusiness;
use App\Filament\Resources\Businesses\Schemas\BusinessForm;
use App\Filament\Resources\Businesses\Schemas\BusinessInfolist;
use App\Filament\Resources\Businesses\Tables\BusinessesTable;
use App\Models\Business;
use BackedEnum;
use Filament\Pages\Enums\SubNavigationPosition;
use Filament\Resources\Pages\Page;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class BusinessResource extends Resource
{
    protected static ?string $model = Business::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBuildingOffice2;

    protected static ?SubNavigationPosition $subNavigationPosition = SubNavigationPosition::Start;

    protected static ?string $recordTitleAttribute = 'name';

    /**
     * A user who is only a sales agent has restricted, read-only access.
     */
    public static function isSalesAgent(): bool
    {
        $user = auth()->user();

        return (bool) ($user?->hasRole('sales_agent') && ! $user->hasRole('super_admin'));
    }

    /**
     * Sales agents only see the businesses they are assigned to.
     */
    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();

        if (static::isSalesAgent()) {
            $query->whereHas('salesAgents', fn (Builder $q) => $q->whereKey(auth()->id()));
        }

        return $query;
    }

    public static function canCreate(): bool
    {
        return ! static::isSalesAgent();
    }

    public static function canEdit(Model $record): bool
    {
        return ! static::isSalesAgent();
    }

    public static function canDelete(Model $record): bool
    {
        return ! static::isSalesAgent();
    }

    public static function canDeleteAny(): bool
    {
        return ! static::isSalesAgent();
    }

    public static function form(Schema $schema): Schema
    {
        return BusinessForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return BusinessInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BusinessesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getRecordSubNavigation(Page $page): array
    {
        return $page->generateNavigationItems([
            ViewBusiness::class,
            EditBusiness::class,
            ManageBusinessMedia::class,
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBusinesses::route('/'),
            'create' => CreateBusiness::route('/create'),
            'view' => ViewBusiness::route('/{record}'),
            'edit' => EditBusiness::route('/{record}/edit'),
            'media' => ManageBusinessMedia::route('/{record}/media'),
        ];
    }
}
