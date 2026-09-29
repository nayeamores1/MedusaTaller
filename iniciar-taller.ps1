$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$localPnpm = Join-Path (Split-Path $PSScriptRoot -Parent) '.workshop-tools\node_modules\.bin'
if (Test-Path -LiteralPath $localPnpm) {
    $env:PATH = "$localPnpm;$env:PATH"
}
$nodeVersion = & node --version
if ($nodeVersion -notmatch '^v22\.') {
    throw 'Este taller requiere Node 22. Ejecuta nvm use 22 antes de iniciar.'
}
Write-Host 'Admin: http://localhost:9000/app'
Write-Host 'Tienda: http://localhost:8000/ec/store'
function Test-TallerPort([int]$Port) {
    $connection = [System.Net.Sockets.TcpClient]::new()
    try {
        return $connection.ConnectAsync('127.0.0.1', $Port).Wait(500) -and $connection.Connected
    } catch {
        return $false
    } finally {
        $connection.Dispose()
    }
}
$backendUp = Test-TallerPort 9000
$storefrontUp = Test-TallerPort 8000
if ($backendUp -and $storefrontUp) {
    Write-Host 'Los puertos 9000 y 8000 ya están activos. Abre las direcciones de arriba.'
    exit 0
}
Write-Host 'Mantén esta ventana abierta. Ctrl+C detiene las aplicaciones.'
if ($backendUp) {
    & pnpm.cmd --filter '@dtc/storefront' dev
} elseif ($storefrontUp) {
    & pnpm.cmd --filter '@dtc/backend' dev
} else {
    & pnpm.cmd dev
}
exit $LASTEXITCODE
