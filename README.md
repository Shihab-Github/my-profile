# my-profile
Profile app for Glints

This is the profile app for glints. It is hosted here https://myprofile-634ab.web.app/

To run this app locally, please follow the below steps: 
  - clone this repo
  - run npm install
  - run npm start
  
Since this is a pwa, so in order to check it locally we need to create a build version and then run it. To do so, execute the following command
  - npm run build
  - run npx serve -s build or serve -s build
  
This pwa follows the cache first strategy in order to cache static assets. There is also a rule written to cache api responses dynamically in service-worker.ts file. The cache name is 'profile-api-response'

This app uses firestore as backend.
