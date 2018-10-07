const readline = require('readline');
const {google} = require('googleapis');
const fs = require('fs');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    return new Promise((resolve, reject) => {
        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client).then(data => {
                return resolve(data);
            })
 
        });
        
    })

}
  
  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
function getNewToken(oAuth2Client, callback) {
    return new Promise((resolve) => {
        
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            resolve(callback(oAuth2Client));
          });
        });

    })
  }
  
  /**
   * Prints the names and majors of students in a sample spreadsheet:
   * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
   */
function listMajors(auth) {
    return new Promise((resolve, reject) => {
        
        const sheets = google.sheets({version: 'v4', auth});
        sheets.spreadsheets.values.get({
          spreadsheetId: '1MEgog9YuQ3TEuhI-MpF1mKoa4J3MXCnDX-XThY2sIiE',
          range: 'A2:C',
        }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          const rows = res.data.values;
    
          if (rows.length) {
              return resolve(rows);
          } else {
            console.log('No data found.');
            reject('No data found.');
          }
        });

    })
  }

  module.exports = {
    authorize,
    getNewToken,
    listMajors
  }