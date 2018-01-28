# npm-api-util
This module will fetch any NPM module details

Link : https://www.npmjs.com/package/npm-api-util

this module has two method:

* __`downloadInfo()`__ : it take module name as input and return  download information about that npm package
* __`packageInfo()`__ : it take module name as input and return  all information about that npm package


demo of `downloadInfo()` :
```js
const npmApi = require('npm-api-util');

npmApi.downloadInfo('utility-pro',(err,data)=>{
  if(err){
    console.error(err);
  }else{
    console.log(data);
  }
});

////// output //////

{ totalDailyDownloads: '36',
  totalWeeklyDownloads: '40',
  totalMonthlyDownloads: '78' }
  
//////////////////// 
```
demo of `packageInfo()` :
```js
const npmApi = require('npm-api-util');

npmApi.packageInfo('utility-pro',(err,data)=>{
  if(err){
    console.error(err);
  }else{
    console.log(data); // for all data or else check rest of console.log()
    
    console.log(data.packageName); // name of package
    console.log(data.packageDescription); // package Description
    console.log(data.packageVersions); // list of all package versions
    console.log(data.packageLatestDistTag); // latest dist tag of package
    console.log(data.packageMaintainers); // list of maintainers of package
    console.log(data.packageCreatedTime); // package created time
    console.log(data.packageHomepageUrl); // link of package's homepage
    console.log(data.packageAuthor); // name of package's author
    console.log(data.packageBugUrlLink); // link of package's bug reporting page
    console.log(data.packageLicenseType); // Type of licence used in package
  }
});
```
