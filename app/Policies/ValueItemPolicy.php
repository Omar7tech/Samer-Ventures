<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\ValueItem;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Foundation\Auth\User as AuthUser;

class ValueItemPolicy
{
    use HandlesAuthorization;

    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:ValueItem');
    }

    public function view(AuthUser $authUser, ValueItem $valueItem): bool
    {
        return $authUser->can('View:ValueItem');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:ValueItem');
    }

    public function update(AuthUser $authUser, ValueItem $valueItem): bool
    {
        return $authUser->can('Update:ValueItem');
    }

    public function delete(AuthUser $authUser, ValueItem $valueItem): bool
    {
        return $authUser->can('Delete:ValueItem');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('DeleteAny:ValueItem');
    }

    public function restore(AuthUser $authUser, ValueItem $valueItem): bool
    {
        return $authUser->can('Restore:ValueItem');
    }

    public function forceDelete(AuthUser $authUser, ValueItem $valueItem): bool
    {
        return $authUser->can('ForceDelete:ValueItem');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:ValueItem');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:ValueItem');
    }

    public function replicate(AuthUser $authUser, ValueItem $valueItem): bool
    {
        return $authUser->can('Replicate:ValueItem');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:ValueItem');
    }
}
