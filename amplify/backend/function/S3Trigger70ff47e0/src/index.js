
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var ddb = new AWS.DynamoDB();

let imageTable = "Images-zos4gezxavdzdpcon7e57zhms4-dev";


/*
exports.handler = async function (event, callback) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);
};
*/
function removeImageS3(key, bucket) {
  let params = { Bucket: bucket, Key: key };
  s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      return false
    }
    else {
      console.log("Image deleted from s3")
      return true
    }
  });
}

function putImageDB(key) {
  let owner = key.split('/')[2]; // We put it here in the previous tutorial
  let name = key.split('/').pop();
  let online = true;
  let date = new Date().toISOString();
  let description = "Jakiś wymagany opis"
  var params = {
    TableName: imageTable,
    Item: {
      id: { S: key },
      owner: { S: owner },
      name: { S: name },
    }
    
  };
  console.log('Item: ' + params.Item.key + " " + params.Item.owner + " " + params.Item.name)
  // Call DynamoDB to add the item to the table
  return ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  }).promise();
}



exports.handler = async function(event, context, callback) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const eventName = event.Records[0].eventName;
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  let key = event.Records[0].s3.object.key.replace('%3A', ':'); //eslint-disable-line
  //const key = event.Records[0].s3.object.key;
  const imgSize = event.Records[0].s3.object.size;
  const maxSize = 5000000; // More that 5Mb images would be rejected
  const filename = key.split('.').slice(0, -1).join('.');

  if (process.env.ENV === 'master') {
    console.log("Prod env")
    imageTable = "Image-***-master";
  }
  
  if (eventName === "ObjectCreated:Put") {
    console.log("This is a put event")
  }
   
  // We don't want to add DB entry for thumbnails 
  if (filename.endsWith('-thumbnail')) {
    console.log('Image is a thumbnail')
    callback(null, "Image is a thumbnail")
    return
  }
   // Remove image if too big and return 
  else if (imgSize > maxSize) {
    removeImageS3(key, bucket); // To be implemented
    callback(Error("Fail: image too big"))
    return
  }
  else {
    console.log('oto klucz: ' + key)
    await putImageDB(key);
  }

};