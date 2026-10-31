param([int]$Port = 8080, [switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'solar-atlas/dist'))
$listener = [Net.HttpListener]::new()
$url = "http://localhost:$Port/"
$listener.Prefixes.Add($url)
try {
    $listener.Start()
    Write-Host "Solar Atlas: $url"
    Write-Host 'Press Ctrl+C to stop the server.'
    if (-not $NoBrowser) { Start-Process $url }
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        try {
            $relative = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath).TrimStart('/')
            if (-not $relative) { $relative = 'index.html' }
            $path = [IO.Path]::GetFullPath((Join-Path $root $relative))
            if (-not $path.StartsWith($root + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
                $context.Response.StatusCode = 403
            } elseif (-not [IO.File]::Exists($path)) {
                $context.Response.StatusCode = 404
            } else {
                $types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='text/javascript; charset=utf-8'; '.jpg'='image/jpeg'; '.png'='image/png' }
                $mime = $types[[IO.Path]::GetExtension($path).ToLowerInvariant()]
                if (-not $mime) { $mime = 'application/octet-stream' }
                $context.Response.ContentType = $mime
                $bytes = [IO.File]::ReadAllBytes($path)
                $context.Response.ContentLength64 = $bytes.Length
                $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        } catch {
            $context.Response.StatusCode = 500
        } finally {
            $context.Response.Close()
        }
    }
} finally {
    $listener.Close()
}
