# Import checker

> JS|TS import statement report generator

## Why

This project was created to automate the analyzis of which component from `@blendle/lego` (react component library) is been used in all 4 web projects. With the all imports, an `csv` file is generated containing:

```csv
<file-path>;<component-name>;<project-name>
```

Later this data is used in a Google Sheets which shows us visually what's the most and less used component within the library.

## What's behind

In order to make this analyses, it uses:

- Typescript (just because it's nice to have types :p)
- nodeJS file system;
- `@babel/parser`: to create an **A**bstract **S**yntax **T**ree object and understand what's an import;
- `glob`: to get the absolute path of all desired files

## Workflow

It's a very simple workflow, where:

1. It's defined the absolute path of each project;
1. With that, it runs `glob` and get it back all files;
1. Each file is read by node fs and has its content analyzed babel parser;
1. It walks through the `AST` and filters only Statements type of `import` and which it's from `@blendle/lego`;
1. With the component name and file path, it creates a CSV record previously described;
1. With all CSV records, it generates the report file;

## How to run

First, clone this project.

Then, install the dependencies:

```bash
yarn
```

Then, run `report` command:

```bash
yarn report
```

A file `report.csv` will be created in the root folder with all data analized.
