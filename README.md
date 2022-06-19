# Image Processing Project
## For Udacity

### Routes
```
GET /images								// get all images
GET /images/view/:id					// get specific image
GET /images/resize						// resize all images randomly
GET /images/resize/:id					// resize specific image randomly
GET /images/resize/:id/:width/:height	// resize specific image with given width and height
GET /images/monochrome					// make all images monochrome
GET /images/monochrome/:id				// make specific image monochrome
DELETE /images							// delete ALL images except the example "profile.jpeg"
```

### Example picture
The example picture is called profile.jpeg

### Road to awesome
```
npm i
npm start
```

### Other scripts
```
npm run test
npm run build
npm run lint
npm run prettier
```