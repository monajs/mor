module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true,
        'shared-node-browser': true,
    },
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'classes': true,
            'jsx': true,
        },
        'ecmaVersion': 6,
        'sourceType': 'module',
    },
    'plugins': [],
    'rules': {
        'indent': ['error', 2],
        'no-multiple-empty-lines': 'warn',
        'no-debugger': 'warn',
    },
};
