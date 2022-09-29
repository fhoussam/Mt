$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
Set-Location $dir\Mt.AngularFront\ClientApp
Write-host "starting angular app in $pwd"
cmd.exe /c "ng serve --proxy-config proxy.conf.json" 