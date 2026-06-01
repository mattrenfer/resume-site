<#
.SYNOPSIS
    Manual deploy of the static export to the Lightsail (Bitnami nginx) box.

.DESCRIPTION
    Builds the site and rsyncs out/ to the server. Use this for one-off manual
    pushes; normally the GitHub Action (.github/workflows/deploy.yml) handles
    deploys automatically on push to main.

    Requires: Node/npm, and an OpenSSH client with rsync available
    (Git Bash provides rsync on Windows).

.EXAMPLE
    ./scripts/deploy.ps1 -KeyPath ~/.ssh/lightsail.pem
#>
param(
    [string]$ServerHost = "matthewrenfer.com",
    [string]$User       = "bitnami",
    [string]$Target     = "/opt/bitnami/nginx/html",
    [Parameter(Mandatory = $true)][string]$KeyPath
)

$ErrorActionPreference = "Stop"

Write-Host "Building static export..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed" }

Write-Host "Deploying out/ -> ${User}@${ServerHost}:${Target}" -ForegroundColor Cyan
rsync -avz --delete -e "ssh -i `"$KeyPath`"" out/ "${User}@${ServerHost}:${Target}"
if ($LASTEXITCODE -ne 0) { throw "rsync failed" }

Write-Host "Deploy complete." -ForegroundColor Green
