'use strict';

const cheerio = require('cheerio');
const http = require('http');
const https = require('https');

const typeCheck = module => typeof module === 'string';

const packageInfo = (module, cb) => {
  if (!typeCheck(module)) return cb(new Error('Enter proper module name'));
  let url = 'http://registry.npmjs.org/' + module;
  http.get(url, res => {
    let body = '';
    res.on('data', data => {
      body += data;
    }).on('end', () => {
      body = JSON.parse(body);
      let result = Object.assign({}, {
        packageName: body.name || '',
        packageDescription: body.description || '',
        packageVersions: body.versions || '',
        packageLatestDistTag: body['dist-tags'].latest || '',
        packageMaintainers: body.maintainers || '',
        packageCreatedTime: body.time.created || '',
        packageHomepageUrl: body.homepage || '',
        packageAuthor: body.author || '',
        packageBugUrlLink: body.bugs.url || '',
        packageLicenseType: body.license || ''
      });
      return cb(null, result);
    });
    res.on('error', err => {
      return cb(err);
    });
  });
};

const downloadInfo = (module, cb) => {
  if (!typeCheck(module)) return cb(new Error('Enter proper module name'));
  let url = 'https://www.npmjs.com/package/' + module;
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = '';
    res.on('data', data => {
      body += data;
    });
    res.on('end', () => {
      let $ = cheerio.load(body);
      let result = Object.assign({}, {
        totalDailyDownloads: $('.daily-downloads').text() || '',
        totalWeeklyDownloads: $('.weekly-downloads').text() || '',
        totalMonthlyDownloads: $('.monthly-downloads').text() || ''
      });
      return cb(null, result);
    });
    res.on('error', err => {
      return cb(err);
    });
  });
};

module.exports = {
  downloadInfo: downloadInfo,
  packageInfo: packageInfo
};