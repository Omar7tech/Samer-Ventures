<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\ClientLogo;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Foundation\Auth\User as AuthUser;

class ClientLogoPolicy
{
    use HandlesAuthorization;

    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:ClientLogo');
    }

    public function view(AuthUser $authUser, ClientLogo $clientLogo): bool
    {
        return $authUser->can('View:ClientLogo');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:ClientLogo');
    }

    public function update(AuthUser $authUser, ClientLogo $clientLogo): bool
    {
        return $authUser->can('Update:ClientLogo');
    }

    public function delete(AuthUser $authUser, ClientLogo $clientLogo): bool
    {
        return $authUser->can('Delete:ClientLogo');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('DeleteAny:ClientLogo');
    }

    public function restore(AuthUser $authUser, ClientLogo $clientLogo): bool
    {
        return $authUser->can('Restore:ClientLogo');
    }

    public function forceDelete(AuthUser $authUser, ClientLogo $clientLogo): bool
    {
        return $authUser->can('ForceDelete:ClientLogo');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:ClientLogo');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:ClientLogo');
    }

    public function replicate(AuthUser $authUser, ClientLogo $clientLogo): bool
    {
        return $authUser->can('Replicate:ClientLogo');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:ClientLogo');
    }
}
