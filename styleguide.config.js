const path = require('path');
const webpack = require('webpack');
const { name, version, url } = require('./package.json');

let sections = [
  {
    name: 'README',
    content: 'README.md',
  },
  {
    name: 'Notepad Block',
    components: ['src/components/Redactor/Redactor.js'],
  },
  {
    name: 'RedactorTools',
    content: 'src/components/Redactor/RedactorTools.md',
  },
  {
    name: 'Hooks',
    components: [
      'src/components/ListOfNotes/useData.jsx',
      'src/components/Redactor/useRtlDirection.jsx',
    ],
  },
  {
    name: 'Getting a list of notes Block',
    components: [
      'src/components/ListOfNotes/ListOfNotes.js',
      'src/components/TreeView/TreeView.js',
      'src/components/TreeView/ContextMenu.js',
    ],
  },
];

module.exports = {
  components: 'src/components/**/[A-Z]*.js',
  ribbon: {
    url,
    text: 'Open on GitHub',
  },
  title: `${name} v${version}`,
  template: {
    head: {
      meta: [
        {
          name: 'description',
          content: 'React component library for note taking',
        },
      ],
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Fira+Sans:400,600',
        },
      ],
      scripts: [
        {
          src: 'https://cdn.tailwindcss.com',
        },
      ],
    },
  },
  moduleAliases: { [name]: path.resolve(__dirname, 'src') },
  skipComponentsWithoutExample: true,
  sections,
  styles: {
    ComponentsList: {
      isSelected: {
        fontWeight: 'normal',
        '&>a': {
          fontWeight: 'bold !important',
        },
      },
    },
  },
  theme: {
    color: {
      link: '#4B4E6A',
      linkHover: '#2B3847',
      baseBackground: '#fff',
      border: '#D0DAE4',
      sidebarBackground: '#fff',
    },
    fontFamily: {
      base: '"Fira Sans", sans-serif',
    },
  },
  exampleMode: 'collapse', // is responsible for displaying the code
  usageMode: 'collapse', // responsible for displaying PROPS & METHODS
  pagePerSection: true,
  getComponentPathLine(componentPath) {
    const componentName = path.basename(componentPath, '.js').split('.')[0];
    return `import { ${componentName} } from '${name}';`;
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        process: { env: {} },
      }),
    ],
  },
};
