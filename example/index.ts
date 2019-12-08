import {readdirSync} from 'fs';

// Parse npm run arguments
const args = JSON.parse(process.env.npm_config_argv).original;

// Find available files
const names = readdirSync('./example')
    .filter((f) => f !== 'index.ts' && f.substring(f.length - 3) === '.ts')
    .map((f) => f.substring(0, f.length - 3));

// Help text
const printHelp = () => {
    console.log('Please specify a valid example:');
    console.log('  - npm run example <name>');
    console.log('  - yarn run example <name>');
    console.log(`Options: ${names.join(', ')}`);
};

// Check if there are enough arguments
if (args.length <= args.indexOf('example') + 1) {
    printHelp();
} else {
    const name = args[args.indexOf('example') + 1];
    if (!names.includes(name)) {
        printHelp();
    } else {
        console.log(`Running example ./example/${name}.ts`);

        // Execute the file
        import(`./${name}.ts`);

    }
}
