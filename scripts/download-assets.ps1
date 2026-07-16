$imagesDir = Join-Path $PSScriptRoot "..\public\images"
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir -Force | Out-Null
}

$assets = @{
    "logo.png" = "https://media.base44.com/images/public/69a93b29a4a5a09a87751ceb/cef442afb_image.png"
    "community-gathering.png" = "https://media.base44.com/images/public/69a93b29a4a5a09a87751ceb/ade06ae17_image.png"
}

foreach ($file in $assets.Keys) {
    $outPath = Join-Path $imagesDir $file
    Write-Host "Downloading $file ..."
    Invoke-WebRequest -Uri $assets[$file] -OutFile $outPath -UseBasicParsing
    Write-Host "Saved to $outPath"
}

Write-Host "Asset download complete."
