<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <title>@yield('code') &middot; {{ config('app.name', 'Samer Ventures') }}</title>

    <style>
        :root {
            --background: #ffffff;
            --primary: #145f60;
            --card: #eef0ef;
            --border: #d9dedc;
            --muted: #5b6b6a;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html,
        body {
            height: 100%;
        }

        body {
            font-family: 'Manrope', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
            background: var(--background);
            color: var(--primary);
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
        }

        .page {
            position: relative;
            min-height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        /* Faint branded background mark — static, no animation */
        .page__mark {
            position: absolute;
            top: 50%;
            left: -10%;
            width: 60vw;
            max-width: 760px;
            transform: translateY(-50%);
            opacity: 0.04;
            filter: grayscale(1);
            pointer-events: none;
            user-select: none;
        }

        .header {
            position: relative;
            z-index: 1;
            padding: 40px clamp(24px, 6vw, 72px);
        }

        .header__logo {
            height: 34px;
            width: auto;
        }

        .main {
            position: relative;
            z-index: 1;
            flex: 1;
            display: flex;
            align-items: center;
            padding: 24px clamp(24px, 6vw, 72px) 64px;
        }

        .content {
            max-width: 620px;
        }

        .code {
            display: inline-flex;
            align-items: center;
            gap: 14px;
            font-size: clamp(64px, 14vw, 132px);
            font-weight: 800;
            line-height: 1;
            letter-spacing: -0.04em;
            color: var(--primary);
        }

        .code__rule {
            display: inline-block;
            width: 56px;
            height: 4px;
            border-radius: 999px;
            background: var(--primary);
            opacity: 0.25;
        }

        .title {
            margin-top: 28px;
            font-size: clamp(24px, 4vw, 34px);
            font-weight: 700;
            letter-spacing: -0.02em;
        }

        .message {
            margin-top: 16px;
            font-size: clamp(15px, 2.4vw, 18px);
            line-height: 1.6;
            color: var(--muted);
            max-width: 52ch;
        }

        .actions {
            margin-top: 40px;
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            padding: 0 26px;
            border-radius: 999px;
            font-size: 15px;
            font-weight: 600;
            text-decoration: none;
            border: 1px solid transparent;
            transition: background-color .15s ease, color .15s ease, border-color .15s ease;
        }

        .btn--primary {
            background: var(--primary);
            color: #ffffff;
        }

        .btn--primary:hover {
            background: #0f4a4b;
        }

        .btn--ghost {
            background: transparent;
            color: var(--primary);
            border-color: var(--border);
        }

        .btn--ghost:hover {
            background: var(--card);
        }

        .footer {
            position: relative;
            z-index: 1;
            padding: 0 clamp(24px, 6vw, 72px) 40px;
            font-size: 13px;
            color: var(--muted);
        }
    </style>
</head>

<body>
    <div class="page">
        <img class="page__mark" src="/logo/sv-icon.svg" alt="" aria-hidden="true">

        <header class="header">
            <a href="/" aria-label="{{ config('app.name', 'Samer Ventures') }}">
                <img class="header__logo" src="/logo/sv-logo.svg" alt="{{ config('app.name', 'Samer Ventures') }}">
            </a>
        </header>

        <main class="main">
            <div class="content">
                <div class="code">
                    <span>@yield('code')</span>
                    <span class="code__rule" aria-hidden="true"></span>
                </div>

                <h1 class="title">@yield('title')</h1>
                <p class="message">@yield('message')</p>

                <div class="actions">
                    <a class="btn btn--primary" href="/">Back to homepage</a>
                    @hasSection('secondary')
                        @yield('secondary')
                    @endif
                </div>
            </div>
        </main>

        <footer class="footer">
            &copy; {{ date('Y') }} {{ config('app.name', 'Samer Ventures') }}. All rights reserved.
        </footer>
    </div>
</body>

</html>
