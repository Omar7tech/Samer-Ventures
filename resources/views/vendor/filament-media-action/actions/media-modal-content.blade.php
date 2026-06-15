<div class="w-full flex flex-col justify-center items-center h-full"
     x-data="{
            loading: true,
            autoplayed: false,

            init() {
                this.loading = true;
                let mediaElement = this.$refs.mediaFrame;

                if (!mediaElement) {
                    this.loading = false;
                    return;
                }

                if (mediaElement.tagName === 'VIDEO' || mediaElement.tagName === 'AUDIO') {
                    mediaElement.load();

                    mediaElement.onload = () => {
                        this.loading = false;
                    };
                    mediaElement.oncanplaythrough = () => {
                        this.loading = false;
                    };
                    mediaElement.onloadstart = () => {
                        this.loading = true;
                    };
                    mediaElement.onerror = () => {
                        this.loading = false;
                    };

                    if (mediaElement.readyState >= 3) {
                        this.loading = false;
                    }

                    // Autoplay logic
                    if (@js($autoplay) && mediaElement.play) {
                        this.autoplayed = true;
                        mediaElement.play().catch(() => {
                            console.log('Autoplay failed or was blocked.');
                        });
                    }
                } else {
                    this.loading = true;

                    mediaElement.onload = () => {
                        setTimeout(() => {
                            this.loading = false;
                        }, 200);
                    };
                    mediaElement.onerror = () => {
                        this.loading = false;
                    };
                }
            },

            resetAutoplay() {
                this.autoplayed = false;
            },

            // Pause/stop media when modal closes
            stopMedia() {
                const mediaElement = this.$refs.mediaFrame;
                if (!mediaElement) return;

                try {
                    const tag = mediaElement.tagName;
                    if (tag === 'AUDIO' || tag === 'VIDEO') {
                        if (typeof mediaElement.pause === 'function') mediaElement.pause();
                        // Reset the playback position to avoid audio continuing in background on some browsers
                        if ('currentTime' in mediaElement) mediaElement.currentTime = 0;
                    } else if (tag === 'IFRAME') {
                        // Try to pause YouTube embeds via postMessage API (requires enablejsapi=1)
                        mediaElement.contentWindow?.postMessage(JSON.stringify({
                            event: 'command',
                            func: 'pauseVideo',
                            args: []
                        }), '*');
                    }
                } catch (e) {
                    // Swallow any errors from cross-origin iframes or unsupported operations
                }
            }
        }"
     @open-modal.window="resetAutoplay"
     @close-modal.window="stopMedia()"
>

    <div class="flex h-full flex-col justify-center items-center" x-show="loading">
        <x-filament::loading-indicator class="h-10 w-10" />
        <span class="text-center font-bold">{{ __('filament-media-action::media-action.loading') }}</span>
    </div>

    <div class="mediaContainer w-full flex flex-col justify-center items-center h-full" x-show="!loading">
        @if ($mediaType === \Hugomyb\FilamentMediaAction\Actions\MediaAction::TYPE_YOUTUBE)
            @php
                $youtubeId = '';

                // Parse the URL to get components
                $parsedUrl = parse_url($media);

                if (isset($parsedUrl['host'])) {
                    // Check if it's a youtu.be short URL
                    if (str_contains($parsedUrl['host'], 'youtu.be')) {
                        $youtubeId = ltrim($parsedUrl['path'], '/');
                    }
                    // Check if it's a regular youtube.com URL
                    elseif (str_contains($parsedUrl['host'], 'youtube.com')) {
                        parse_str($parsedUrl['query'] ?? '', $queryParams);
                        $youtubeId = $queryParams['v'] ?? '';
                    }
                }
            @endphp

            @if ($youtubeId)
                <iframe x-ref="mediaFrame" class="rounded-lg" width="100%"
                        src="https://www.youtube.com/embed/{{ $youtubeId }}?enablejsapi=1{{ $autoplay ? '&autoplay=1' : '' }}"
                        frameborder="0"
                        style="aspect-ratio: 16 / 9;"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                ></iframe>
            @else
                <p>Invalid YouTube URL.</p>
            @endif

        @elseif ($mediaType === \Hugomyb\FilamentMediaAction\Actions\MediaAction::TYPE_AUDIO)
            <audio
                    x-ref="mediaFrame"
                    class="rounded-lg w-full"
                    style="width: 100%"
                    controls
                    @if($controlsList) controlsList="{{ $controlsList }}" @endif
                    @canplay="loading = false"
                    @loadeddata="loading = false"
                    @play="loading = false"
                    {{ $preload ? '' : 'preload="none"' }}
            >
                <source src="{{ $media }}" @if($mime && $mime !== 'unknown') type="{{ $mime }}" @endif>
                Your browser does not support the audio element.
            </audio>

        @elseif ($mediaType === \Hugomyb\FilamentMediaAction\Actions\MediaAction::TYPE_VIDEO)
            <video
                    x-ref="mediaFrame"
                    class="rounded-lg w-full"
                    width="100%"
                    style="aspect-ratio: 16 / 9;"
                    controls
                    playsinline
                    @if($controlsList) controlsList="{{ $controlsList }}" @endif
                    @canplaythrough="loading = false"
                    {{ $preload ? '' : 'preload="none"' }}
            >
                <source src="{{ $media }}" @if($mime && $mime !== 'unknown') type="{{ $mime }}" @endif>
                Your browser does not support the video tag.
            </video>

        @elseif ($mediaType === \Hugomyb\FilamentMediaAction\Actions\MediaAction::TYPE_IMAGE)

            <img x-ref="mediaFrame" class="rounded-lg" src="{{ $media }}" alt="Media Image"
                 style="max-width: 100%; height: auto;" @load="loading = false">

        @elseif ($mediaType === \Hugomyb\FilamentMediaAction\Actions\MediaAction::TYPE_PDF)

            <iframe x-ref="mediaFrame" class="rounded-lg w-full block"
                    style="width: 100%; min-height: 75vh; height: 75vh;"
                    src="{{ $media }}#view=FitH"
                    @load="loading = false"></iframe>

        @else
            @php
                $downloadName = pathinfo(parse_url($media, PHP_URL_PATH), PATHINFO_BASENAME);
                $extension = strtoupper(pathinfo($downloadName, PATHINFO_EXTENSION));
            @endphp
            <div class="flex w-full flex-col items-center justify-center gap-4 py-12 text-center">
                <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-500/10">
                    <x-filament::icon icon="heroicon-o-document-arrow-down" class="h-8 w-8 text-primary-500" />
                </div>
                <div>
                    <p class="text-base font-semibold text-gray-950 dark:text-white">
                        Preview isn't available for {{ $extension ?: 'this' }} files
                    </p>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Download the file to open it on your device.
                    </p>
                </div>
                <x-filament::button tag="a" href="{{ $media }}" download target="_blank" icon="heroicon-o-arrow-down-tray">
                    Download file
                </x-filament::button>
            </div>
        @endif
    </div>
</div>
