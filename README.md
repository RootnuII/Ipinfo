
IP Lookup API
This Node.js application provides a simple API for looking up information related to a given IP address. It utilizes geoip-lite and if it cant grab the info it will default to ipinfo.io API, to gather details such as geographical location, hostname, city, region, country, and more.

Prerequisites
Before running this application, ensure you have the following dependencies installed:

Node.js
npm (Node Package Manager)
Installation
Clone this repository:


git clone https://github.com/your-username/ip-lookup-api.git

Navigate to the project directory:
cd ip-lookup-api

Install dependencies:
npm install

Configuration
set up your ipinfo.io API token by replacing 'apiinfo.io token' with your actual token in the ipinfoToken variable.

const ipinfoToken = 'your-ipinfo.io-token';

Usage
Start the API server by running:

npm start
The server will be accessible at http://localhost:3000 or http://yourip:3000 .

API Endpoint
IP Lookup
Endpoint: /iplookup/:ip
Method: ALL (Supports all HTTP methods)
Parameters:
:ip - The IP address you want to look up.
Response
The API responds with detailed information about the provided IP address, including:

IP Address
Hostname
City
Region
Country
Geographical Coordinates
Postal Code
Timezone
In case of any errors during the lookup process, a 500 Internal Server Error response is returned.

Examples
curl http://localhost:3000/iplookup/8.8.8.8
Response
```json
{
  "ip": "8.8.8.8",
  "hostname": "dns.google",
  "city": "Mountain View",
  "region": "California",
  "country": "US",
  "loc": "37.3860,-122.0838",
  "postal": "94035",
  "timezone": "America/Los_Angeles"
}

License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) 
