
$currentWorkingDirectory = $PSScriptRoot
Write-host "---- Automated Build script started ($currentWorkingDirectory) ----" -ForegroundColor Green

function Dev-All-Watch {
  Write-host "npm run dev-all"
  npm run dev-all
}

$isQuickBuild = Read-Host -Prompt 'Do you want to watch all(dev)? [y/n]'

if ($isQuickBuild -eq "y") {
  Dev-All-Watch
}

$isQuickBuild = Read-Host -Prompt 'Do you want to watch (dev)? [y/n]'

if ($isQuickBuild -eq "y") {
  npm run dev
}

$isQuickBuild = Read-Host -Prompt 'Do you want to run coverage once? [y/n]'

if ($isQuickBuild -eq "y") {
  npm run test
}

.\pbuild.ps1