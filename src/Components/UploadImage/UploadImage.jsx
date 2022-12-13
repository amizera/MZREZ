import React, { Component } from 'react';
import { Amplify, Storage, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './UploadImage.css';

import { formFields } from '../../Config/AuthConfig';
import AddButton from '../../Components/AddButton/AddButton'
import { Container, Typography} from '@mui/material';
import { v4 as uuid } from 'uuid';

class UploadImage extends Component {

    constructor() {
        super()
        this.handleAdd = this.handleAdd.bind(this)
    };

    state = {
        uploading: false,
        imgToUpload: 0,
        imgUploaded: 0,
    }

    getCurrentUsername() {
        return new Promise((resolve, reject) => {
            Auth.currentAuthenticatedUser()
            .then(user => {
                if (user.username) {
                    resolve(user.username)
                } else {
                    resolve(null)
                }
            })
            .catch(err => {
                console.log(err)
                resolve(null)
            });
        })
    }

    readFileAsync(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        })
    }

    loadImgAsync(imgSrc) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                resolve(img);
            };
            img.onerror = reject;
            img.src = imgSrc;
        })
    }
    
    imgToBlobAsync(img, canvas) {
        return new Promise((resolve, reject) => {
            const ctxMain = canvas.getContext('2d');
            ctxMain.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctxMain.canvas.toBlob(async (blob) => {
                resolve(blob)
            }, 'image/*');
        })
    }

    createCanvas(img, maxSize) {
        const canvas = document.createElement('canvas');
        if (img.width > img.height) {
         const widthMain = maxSize;
         const scaleFactorMain = widthMain / img.width;
         canvas.width = widthMain;
         canvas.height = img.height * scaleFactorMain;
        } else {
         const heightMain = maxSize;
         const scaleFactorMain = heightMain / img.height;
         canvas.width = img.width * scaleFactorMain;
         canvas.height = heightMain;
        }
        return canvas
    }
 
    async pushImgToS3(uri, filename) {
        if (uri === null) return
        await Storage.put(filename, uri, {
            level: 'protected',
            contentType: 'image/*',
            progressCallback(progress) {
                console.log(`Uploaded: ${progress.loaded}/${progress.total} or % ${(progress.loaded/progress.total)*100}`);
            }
        })
            .then(result => console.log(result.key))
            .catch(err => console.log(err));
    }

    handleAdd = async (event) => {

        event.persist();
        // Check there is some files to upload
        if (!event || !event.target || !event.target.files) return
        const filesLength = event.target.files.length;
        const username = await this.getCurrentUsername();
        
        this.setState({
            uploading: true,
            imgToUpload: filesLength,
        })
    
        // Loop through all selected files 
        for (let i = 0; i < filesLength; i++) {
            this.setState({ imgUploaded: i })
            
            const file = event.target.files[i];
            const filename = file.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const fileExtension = file.name.split('.').pop();
            // Define the image name
            const rootName = /* username + '/' +*/ filename + '-' + uuid();
            //let mainImgName = filename + '-' + uuid() + '.' + fileExtension;
            let mainImgName = rootName + '.' + fileExtension;
            let thumbnailImgName = rootName + '-thumbnail.' + fileExtension;
            
            // Read the image
            const imgSrc = await this.readFileAsync(file);
            const img = await this.loadImgAsync(imgSrc);
    
            // From the image and a canvas (for the resize), 
            // generate a blob to be uploaded
            const canvas = this.createCanvas(img, 1000);
            const imgBlob = await this.imgToBlobAsync(img, canvas);

            // Same with the thumbnail
            const canvasThumb = this.createCanvas(img, 100)
            const imgBlobThumb = await this.imgToBlobAsync(img, canvasThumb)
            
            // Create a file from the blob
            const fileMain = new File([imgBlob], filename, {
                type: 'image/*',
            lastModified: Date.now()
            })

            const fileThumb = new File([imgBlobThumb], filename, {
                type: 'image/*',
               lastModified: Date.now()
            });

            // Push the image to S3
            await this.pushImgToS3(fileThumb, thumbnailImgName)
            await this.pushImgToS3(fileMain, mainImgName)
        }
        this.setState({
            uploading: false,
            imgToUpload: 0,
            imgUploaded: 0,
        })
    }   

    render() {

        const child = this.props.children
        const { uploading, imgToUpload, imgUploaded } = this.state
        const uploadFile = this.handleAdd
        //const 
        //console.log(this.props.render)

    return (
        React.Children.map(child, (child) => {
            return React.cloneElement(child, {
              onChange: uploadFile,
              uploading: uploading,
              imgToUpload: imgToUpload,
              imgUploaded: imgUploaded
            });
        })
    );
}}

export default UploadImage