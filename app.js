const express = require('express')
const app = express()
const crypto = require("crypto");

app.use(express.json())

// This is Notify URL endpoint
app.post('/notify-url', (req, res) => {
  console.log('\nNotify Req Params\n', JSON.stringify(req.params))
  console.log('\nNotify Req Path\n', JSON.stringify(req.path))
  console.log('\nNotify Req URL\n', JSON.stringify(req.url))
  console.log('\nNotify Req BaseURL\n', JSON.stringify(req.baseUrl))
  console.log('\nNotify Req Headers\n', JSON.stringify(req.headers))
  console.log('\nNotify Req Body\n', JSON.stringify(req.body))
  return res.status(200).json({})
})

// This is Success URL endpoint
app.get('/success-url', (req, res) => {
  console.log('\n Success Req Params\n', JSON.stringify(req.params))
  console.log('\n Success Req Path\n', JSON.stringify(req.path))
  console.log('\n Success Req URL\n', JSON.stringify(req.url))
  console.log('\n Success Req BaseURL\n', JSON.stringify(req.baseUrl))
  console.log('\n Success Req Headers\n', JSON.stringify(req.headers))
  console.log('\n Success Req Body\n', JSON.stringify(req.body))
  return res.status(200).send({ msg: 'Payment captured successfully' })
})


// This is Cancel URL endpoint
app.get('/cancel-url', (req, res) => {
  return res.status(200).send({ msg: 'Payment has been cancelled' })
})


app.post('/generate-md5', (req, res) => {
  const data = generateSignature(req.body, 'Test12345678')
  return res.send(data)
})

const generateSignature = (data, passPhrase = null) => {
  let pfOutput = "";
  for (let key in data) {
    console.log('key', key)
    if (data.hasOwnProperty(key)) {
      if (data[key] !== "") {
        pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`
      }
    }
  }

  let getString = pfOutput.slice(0, -1);
  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
  }

  return crypto.createHash("md5").update(getString).digest("hex");
};

app.listen(8081, () => {
  console.log('app is running on 8081')
})