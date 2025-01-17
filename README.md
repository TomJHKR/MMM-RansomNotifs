# MMM-RansomNotifs

![image](https://github.com/user-attachments/assets/00da42cf-60c7-4c6b-852b-c2c13427b445)

This modules is used for tracking ransomware attacks from the Ransomware.Live website

## Installation
You will need to install [Flag-Icons](https://www.npmjs.com/package/flag-icons?activeTab=readme)

### Install

In your terminal, go to your [MagicMirror²][mm] Module folder and clone MMM-RansomNotifs:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/TomJHKR/MMM-RansomNotifs
npm install flag-icons
```

### Update

```bash
cd ~/MagicMirror/modules/MMM-RanomNotifs
git pull
```

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

```js
    {
        module: 'MMM-RansomNotifs',
        position: 'bottom_left'
    },
```

Or you could use all the options:

```js
    {
        module: 'MMM-RansomNotifs',
        position: 'Bottom_left',
        config: {
            maximumEntries: 10, // Amount of attacks to display
            fade: true, // fade the entries out or not
            fadePoint: 0.25, // fade point
            tableClass: "small",
            displayFlag: true, // Display flag icons or not
            refreshTime: 300000, // Time to refresh the data in milliseconds
            useColor: true, // display colors, else will be grayscaled
        }
    },
```

## Developer commands

- `npm install` - Install devDependencies like ESLint.
- `npm run lint` - Run linting and formatter checks.
- `npm run lint:fix` - Fix linting and formatter issues.

[mm]: https://github.com/MagicMirrorOrg/MagicMirror
