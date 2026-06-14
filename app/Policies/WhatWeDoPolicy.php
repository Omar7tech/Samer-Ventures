<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\WhatWeDo;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Foundation\Auth\User as AuthUser;

class WhatWeDoPolicy
{
    use HandlesAuthorization;

    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:WhatWeDo');
    }

    public function view(AuthUser $authUser, WhatWeDo $whatWeDo): bool
    {
        return $authUser->can('View:WhatWeDo');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:WhatWeDo');
    }

    public function update(AuthUser $authUser, WhatWeDo $whatWeDo): bool
    {
        return $authUser->can('Update:WhatWeDo');
    }

    public function delete(AuthUser $authUser, WhatWeDo $whatWeDo): bool
    {
        return $authUser->can('Delete:WhatWeDo');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('DeleteAny:WhatWeDo');
    }

    public function restore(AuthUser $authUser, WhatWeDo $whatWeDo): bool
    {
        return $authUser->can('Restore:WhatWeDo');
    }

    public function forceDelete(AuthUser $authUser, WhatWeDo $whatWeDo): bool
    {
        return $authUser->can('ForceDelete:WhatWeDo');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:WhatWeDo');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:WhatWeDo');
    }

    public function replicate(AuthUser $authUser, WhatWeDo $whatWeDo): bool
    {
        return $authUser->can('Replicate:WhatWeDo');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:WhatWeDo');
    }
}
