const { NAME } = process.env

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: `No worries, ${ NAME }, all is working fine!`
  })
}
