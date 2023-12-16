const express = require('express');
const bodyParser = require('body-parser');
const geoip = require('geoip-lite');
const dns = require('dns');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const ipinfoToken = 'apiinfo.io token'; 

app.all('/iplookup/:ip', async (req, res) => {
  const ipAddress = req.params.ip;

  try {
    
    const hostnames = await performReverseDNS(ipAddress);

    const geoData = geoip.lookup(ipAddress);

    if (!geoData || !geoData.city || !geoData.region || !geoData.country || !geoData.ll) {
      const apiData = await getIPInfoFromApi(ipAddress);

      
      const response = {
        ip: ipAddress,
        hostname: hostnames.length > 0 ? hostnames[0] : null,
        city: apiData.city || null,
        region: apiData.region || null,
        country: apiData.country || null,
        loc: apiData.loc || null,
        postal: apiData.postal || null,
        timezone: apiData.timezone || null,
      };


      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response, null, 2));
    } else {

      const response = {
        ip: ipAddress,
        hostname: hostnames.length > 0 ? hostnames[0] : null,
        city: geoData.city,
        region: geoData.region,
        country: geoData.country,
        loc: `${geoData.ll[0]},${geoData.ll[1]}`,
        postal: geoData.zip,
        timezone: geoData.timezone,
      };


      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response, null, 2));
    }
  } catch (error) {

    res.status(500).json({ error: 'Unable to fetch information for the IP address' });
  }
});

function performReverseDNS(ipAddress) {
  return new Promise((resolve, reject) => {
    dns.reverse(ipAddress, (err, hostnames) => {
      if (err) {
        reject(err);
      } else {
        resolve(hostnames || []);
      }
    });
  });
}

async function getIPInfoFromApi(ipAddress) {
  try {
    const url = `https://ipinfo.io/${ipAddress}?token=${ipinfoToken}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching IP information from ipinfo.io:', error.message);
    return {};
  }
}

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
