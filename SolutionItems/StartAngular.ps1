$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
Set-Location $dir\..\Mt.Angular\ClientApp
Write-host "starting angular app in $pwd"
cmd.exe /c "ng serve"