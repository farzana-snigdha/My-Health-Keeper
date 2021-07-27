from zeep import Client
import sys
url = 'https://api2.onnorokomsms.com/sendsms.asmx?WSDL'
client = Client(url)
userName = '01771794998'
password = 'e4855a4a8a'
recipientNumber = '01716760114'
smsText = 'Hello Python'
smsType = 'TEXT'
maskName = ''
campaignName = ''

client.service.OneToOne(userName,password,recipientNumber,smsText,smsType,maskName,campaignName)

# print(str(sys.argv[1]))