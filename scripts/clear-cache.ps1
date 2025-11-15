<#
PowerShell cleanup script for Next.js / Node project
Runs destructive cleanup actions. Run from repository root (d:\kb)
Usage: Open PowerShell in the project root and run:
    .\scripts\clear-cache.ps1
The script will ask for confirmation before deleting anything.
#>

Write-Host "Project cleanup script — will remove build caches and reinstall dependencies" -ForegroundColor Cyan

$confirm = Read-Host "This will delete .next, node_modules, caches and reinstall dependencies. Continue? (y/n)"
if ($confirm -ne 'y' -and $confirm -ne 'Y') {
    Write-Host "Aborted by user." -ForegroundColor Yellow
    exit 0
}

# Stop any process listening on common dev ports (3000, 3001, 5173)
$ports = @(3000, 3001, 5173)
foreach ($p in $ports) {
    try {
        $procs = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -ErrorAction SilentlyContinue
        if ($procs) {
            foreach ($pid in $procs) {
                try { Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue; Write-Host "Stopped process $pid on port $p" -ForegroundColor Green } catch {}
            }
        }
    } catch {}
}

# Remove build/cache directories
$pathsToRemove = @('.next', 'node_modules\.cache', '.vite', '.cache', 'node_modules')
foreach ($p in $pathsToRemove) {
    if (Test-Path $p) {
        try {
            Remove-Item -Recurse -Force $p -ErrorAction SilentlyContinue
            Write-Host "Removed $p" -ForegroundColor Green
        } catch {
            Write-Host "Failed to remove $p: $_" -ForegroundColor Red
        }
    } else {
        Write-Host "$p not found, skipping" -ForegroundColor DarkGray
    }
}

# Optionally remove lockfiles? keep them by default
$removeLock = Read-Host "Remove lockfiles (package-lock.json / pnpm-lock.yaml)? (y/n)"
if ($removeLock -eq 'y' -or $removeLock -eq 'Y') {
    $locks = @('package-lock.json','pnpm-lock.yaml')
    foreach ($l in $locks) { if (Test-Path $l) { Remove-Item -Force $l -ErrorAction SilentlyContinue; Write-Host "Removed $l" -ForegroundColor Green } }
}

# Clear npm cache
Write-Host "Cleaning npm cache..." -ForegroundColor Cyan
npm cache clean --force

# If pnpm available, prune store
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    Write-Host "Pruning pnpm store..." -ForegroundColor Cyan
    pnpm store prune
}

# Reinstall dependencies using npm (safe default). If you use pnpm, run pnpm install afterwards yourself.
$installChoice = Read-Host "Install dependencies with npm or pnpm? (npm/pnpm/none)"
if ($installChoice -eq 'npm') {
    Write-Host "Running npm install..." -ForegroundColor Cyan
    npm install
} elseif ($installChoice -eq 'pnpm') {
    if (Get-Command pnpm -ErrorAction SilentlyContinue) { pnpm install } else { Write-Host "pnpm not available on PATH" -ForegroundColor Red }
} else {
    Write-Host "Skipping install step." -ForegroundColor Yellow
}

Write-Host "Cleanup complete. Next steps:" -ForegroundColor Cyan
Write-Host " - Start dev server: npm run dev" -ForegroundColor White
Write-Host " - Open an Incognito/Private window to verify changes" -ForegroundColor White
Write-Host " - If app uses a service worker, unregister it from browser DevTools (see comments below)" -ForegroundColor White

Write-Host "---- Browser Console snippet (paste into DevTools Console) ----" -ForegroundColor DarkGray
Write-Host "// Unregister all service workers and clear caches" -ForegroundColor DarkGray
Write-Host "navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));" -ForegroundColor DarkGray
Write-Host "caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));" -ForegroundColor DarkGray
Write-Host "------------------------------------------------------------" -ForegroundColor DarkGray

Write-Host "If your site still shows old content after this, check for a service worker in 'public/sw.js' or a custom caching plugin." -ForegroundColor Yellow
