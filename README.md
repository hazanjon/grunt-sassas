# grunt-sassas

> Grunt plugin to take advantage of the SASSAS Direct Conversion API to remove the need to have SASS installed on the local machine

## Getting Started
This plugin requires Grunt `~0.4.5`

You may install this plugin with this command:

```shell
npm install grunt-sassas --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sassas');
```

## The "sassas" task

### Overview
In your project's Gruntfile, add a section named `sassas` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sassas: {
    dev: {
      files: {
        'css/main.css': 'scss/main.scss'
      }
    }
  },
});
```
