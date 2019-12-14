const Airtable = require('airtable')
const { AIRTABLE_API_KEY, AIRTABLE_BASE } = process.env

Airtable.configure({
  apiKey: AIRTABLE_API_KEY
})

exports.handler = function(event, context, callback) {

  const base = Airtable.base(AIRTABLE_BASE)
  const allRecords = []
  base('Playlist')
    .select()
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function(record) {
          allRecords.push({
            name: record.get('Name'),
            youtube: record.get('Youtube')
          })
        })
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          callback(err)
        } else {
          const body = JSON.stringify({ records: allRecords })
          const response = {
            statusCode: 200,
            body: body,
            headers: {
              'content-type': 'application/json',
              'cache-control': 'Cache-Control: max-age=60, public'
            }
          }
          callback(null, response)
        }
      }
    )
}
