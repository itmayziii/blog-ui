// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    apiVersion: 'v1',
    apiUri: 'http://api.fullheapdeveloper.local:8080',
    appUri: 'http://www.fullheapdeveloper.local:4200'
};
