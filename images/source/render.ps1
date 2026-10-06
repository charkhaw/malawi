param([string]$Name, [int]$W, [int]$H)
$sp = "C:\Users\ckhawaja\AppData\Local\Temp\claude\c--Users-ckhawaja-Desktop-tender-Malawi\f4044861-1ae7-45be-98ca-7e097c9c52d8\scratchpad"
node "$sp\$Name.js" | Out-Null
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$png = "$sp\$Name.png"
if (Test-Path $png) { Remove-Item $png -Confirm:$false }
$url = "file:///" + ($sp -replace '\\', '/') + "/$Name.html"
$p = Start-Process -FilePath $edge -ArgumentList @("--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2", "--window-size=$W,$H", "--user-data-dir=$sp\edge-profile", "--screenshot=$png", $url) -PassThru -WindowStyle Hidden
$null = $p.WaitForExit(60000)
Get-CimInstance Win32_Process -Filter "Name='msedge.exe'" | Where-Object { $_.CommandLine -match "edge-profile" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -Confirm:$false -ErrorAction SilentlyContinue }
Add-Type -AssemblyName System.Drawing
$i = [System.Drawing.Image]::FromFile($png)
"rendered {0}x{1}" -f $i.Width, $i.Height
$i.Dispose()
