$sala = "sala-nr"
$pc_name = Get-ComputerInfo | % CsDNSHostName
$mac_data = Get-WmiObject win32_networkadapterconfiguration | Select-Object -Property @{
     Name = 'IPAddress'
     Expression = {($PSItem.IPAddress[0])} 
},MacAddress | Where IPAddress -NE $null
$new_table = @{sala=$sala; ip=$mac_data.IPAddress; mac=$mac_data.MacAddress; pc_name=$pc_name}
Invoke-WebRequest -Method 'Post' -Uri http://localhost:3000/add_mac -Body ($new_table|ConvertTo-Json) -ContentType "application/json" -UseBasicParsing | % RawContent
