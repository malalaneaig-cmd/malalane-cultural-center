param(
    [string]$LocalDist = (Join-Path $PSScriptRoot "..\dist")
)

$envFile = Join-Path $PSScriptRoot "..\.env"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^#=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim().Trim('"').Trim("'")
            Set-Item -Path "env:$name" -Value $value
        }
    }
}

$ftpServer = $env:FTP_SERVER
$ftpUser = $env:FTP_USERNAME
$ftpPass = $env:FTP_PASSWORD

if (-not $ftpServer -or -not $ftpUser -or -not $ftpPass) {
    Write-Error "Missing FTP credentials. Copy .env.example to .env and fill in Spaceship FTP details."
    exit 1
}

$ftpBase = "ftp://$ftpServer"
$localDist = (Resolve-Path $LocalDist).Path

if (-not (Test-Path $localDist)) {
    Write-Error "dist/ not found. Run: npm run build"
    exit 1
}

[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
$cred = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

function EnsureFtpDir($remotePath) {
    try {
        $req = [System.Net.FtpWebRequest]::Create("$ftpBase/$remotePath/")
        $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        $req.Credentials = $cred
        $req.EnableSsl = $true
        $req.KeepAlive = $false
        $resp = $req.GetResponse()
        Write-Host "[mkdir] $remotePath"
        $resp.Close()
    } catch {
        Write-Host "[mkdir] $remotePath (already exists or skipped)"
    }
}

function UploadFile($localFile, $remotePath) {
    $uri = "$ftpBase/$remotePath"
    $req = [System.Net.FtpWebRequest]::Create($uri)
    $req.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $req.Credentials = $cred
    $req.EnableSsl = $true
    $req.UseBinary = $true
    $req.UsePassive = $true
    $req.KeepAlive = $false
    $req.Timeout = 600000
    $req.ReadWriteTimeout = 600000

    $bytes = [System.IO.File]::ReadAllBytes($localFile)
    $req.ContentLength = $bytes.Length

    $stream = $req.GetRequestStream()
    $stream.Write($bytes, 0, $bytes.Length)
    $stream.Close()

    $resp = $req.GetResponse()
    $size = [math]::Round($bytes.Length / 1024, 1)
    Write-Host "[upload] $remotePath  ($size KB)"
    $resp.Close()
}

Write-Host "FTP deploy to Spaceship starting..."
Write-Host "Server: $ftpBase"
Write-Host "Local:  $localDist"
Write-Host ""

EnsureFtpDir "assets"

$files = Get-ChildItem -Path $localDist -Recurse -File
foreach ($f in $files) {
    $relative = $f.FullName.Substring($localDist.Length + 1).Replace('\', '/')
    Write-Host "Uploading $relative ..."
    UploadFile $f.FullName $relative
}

Write-Host ""
Write-Host "Deploy complete."
