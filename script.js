const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const input = require('./export.json')

let output = []//= JSON.parse('[]')
let recordsForCSV = []
let MfgId = ['D','0','0','0']
var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
var myChars = [...str]

input.forEach(account => {
  let digit
  account.mfgId = MfgId.toString().replace(/,/g,'')
  console.log(account)
  output.push(account)
  recordsForCSV.push({address: account.address, email: account.email, mfgId: account.mfgId})
  

  // pick last un-maxed digit
  for(let i = 3; i >= 1; i--) {
    if(MfgId[i] == myChars[61]) {
      MfgId[i] = '0' // reset digit value to 0 before moving to next digit
      continue // digit is maxed, so continue
    }
    digit = i
    break
  }

  // set given digit to next highest value
  for(let i = 0; i < myChars.length; i++) {
    if(MfgId[digit] == myChars[i]){ // find current myChars match
      MfgId[digit] = myChars[i+1]  // increment it
      break
    }
  }

})

const csvWriter = createCsvWriter({
  path: 'output/MfgOutput.csv',
  header: [
    {id: 'address', title: 'ADDRESS'},
    {id: 'email', title: 'EMAIL'},
    {id: 'mfgId', title: 'ID'}
  ]
})

csvWriter.writeRecords(recordsForCSV)

var json = JSON.stringify(output)

fs.writeFile('output/MfgOutput.json', json, 'utf8', function (err) {
    if (err) { return console.log(err) }
    console.log('json config file written!')
  })