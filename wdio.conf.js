import 'dotenv/config';
export const config = {
  
    
    user : process.env.BROWSERSTACK_USERNAME,
    key : process.env.BROWSERSTACK_ACCESS_KEY,

    hostname : 'hub.browserstack.com',
    protocol : 'https',
    port : 443,

    specs: [
        // ToDo: define location for spec files here
        './app/android/test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UIAutomator2',
        'appium:app': "bs://cd47f70e15f85840bdda0e849b0315c9ba501d50",
        'appium:autoGrantPermissions': true,

        'bstack:options': {
            osVersion: '11.0',
            deviceName: 'Samsung Galaxy S21',
            projectName: 'MobileAutomation',
            buildName: 'Android build 1',
            sessionName: 'Basic Test'
        }
    }],

 
    logLevel: 'info',
    
    bail: 0,
  
    waitforTimeout: 10000,
   
    connectionRetryTimeout: 120000,
    
    connectionRetryCount: 3,
    
    services: ['browserstack'],

    
    framework: 'mocha',
    

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

}
