const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.get('/getRate', calculateRate);
app.listen(PORT, function() { 
  console.log('Listening on port', PORT);
});

function calculateRate(request, response) {
  var weight = parseInt(request.query.weight);
  var packageType = request.query.packageType;
  var postageCost = 0.0;

  if (packageType == "Letter-Stamped") {
    switch (weight) {
      case 1:
        postageCost = 0.55
        break;
      case 2:
        postageCost = 0.70
        break;
      case 3:
        postageCost = 0.85
        break;
      default:
        postageCost = 1.00
    }
  }
  else if (packageType == "Letter-Metered") {
    switch (weight) {
      case 1:
        postageCost = 0.50
        break;
      case 2:
        postageCost = 0.65
        break;
      case 3:
        postageCost = 0.80
        break;
      default:
        postageCost = 0.95
    }
  }

  else if (packageType == "Large-Envelope-Flat") {
    switch (weight) {
      case 1:
        postageCost = 1.00
        break;
      case 2:
        postageCost = 1.20
        break;
      case 3:
        postageCost = 1.40
        break;
      case 4: 
        postageCost = 1.60
        break;
      case 5:
        postageCost = 1.80
        break;
      case 6:
        postageCost = 2.00
        break;
      case 7:
        postageCost = 2.20; 
        break;
      case 8:
        postageCost = 2.40; 
        break;
      case 9:
        postageCost = 2.60;
        break;
      case 10:
        postageCost = 2.80; 
        break;
      case 11:
        postageCost = 3.00;
        break;
      case 12:
        postageCost = 3.20; 
        break;
      default:
        postageCost = 3.40;
    }
  }

  else if (packageType == "First-Class-Package-Service-Retail") {
    switch (weight) {
      case 1:
        postageCost = 3.80;
        break;
      case 2:
        postageCost = 3.80;
        break;
      case 3:
        postageCost = 3.80;
        break;
      case 4: 
        postageCost = 3.80;
        break;
      case 5:
        postageCost = 4.60;
        break;
      case 6:
        postageCost = 4.60;
        break;
      case 7:
        postageCost = 4.60;
        break;
      case 8:
        postageCost = 4.60; 
        break;
      case 9:
        postageCost = 5.30;
        break;
      case 10:
        postageCost = 5.30; 
        break;
      case 11:
        postageCost = 5.30;
        break;
      case 12:
        postageCost = 5.30; 
        break;
      default:
        postageCost = 5.90;
    }
  }
  const parameters = {weight: weight, package: packageType, cost: (postageCost).toFixed(2)};
  response.render('pages/rates', parameters);
}