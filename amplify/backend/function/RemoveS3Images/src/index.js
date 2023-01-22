var AWS = require('aws-sdk');
var s3 = new AWS.S3();

  function deleteFile(options) {
    return s3.deleteObjects(options, function(err, data){
        if(data){
            console.log("File successfully deleted");
        } else {
            console.log("Check with error message " + err);
        }
    }).promise();
  }

  exports.handler = async (event, context, callback) => {
    const bucketName = 'mzrezimages01124634-dev';
    const imagesFolder = 'protected/eu-central-1:7ad2b216-94e9-489d-96d2-8bba7de90032/';
    const fileName = 'dsc_0225-5959e640-1f41-4a3f-9f3d-739d711836ce.JPG';
    const destFolder = 'protected/dstImg/';
    var objects = [];

    if (event.Records[0].eventName == 'REMOVE') {

      const keysToDelete = event.Records[0].dynamodb.OldImage.images;

      keysToDelete.L.forEach(function(item) {
        const filename = item.S.toLowerCase().replace(/\.[^/.]+$/, "");
        const fileExtension = item.S.split('.').pop();
        const mainImgKey = imagesFolder + filename + '.' + fileExtension;
        const thumbnailImgKey = imagesFolder +filename + '-thumbnail.' + fileExtension;

        objects.push({Key : mainImgKey});
        objects.push({Key : thumbnailImgKey});
      });

      var options = {
        Bucket: 'mzrezimages01124634-dev',
        Delete: {
          Objects: objects
        }
      };

      try{
        // await copyFile().then(r => deleteFile());
        await deleteFile(options);
        console.log('All good');
      }
      catch(ex){ console.log(`Failed with the following exception : ${ex}`);
      }

    }
  };