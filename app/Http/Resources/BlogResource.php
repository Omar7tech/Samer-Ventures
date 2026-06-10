<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'image' => $this->getFirstMediaUrl('images', 'webp') ?: null,
            'content' => $this->content,
            'description' => $this->description,
            'created_at' => $this->created_at->toFormattedDateString(),
        ];
    }
}
