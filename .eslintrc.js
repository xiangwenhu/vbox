// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    'sourceType': 'module',
    'ecmaVersion': 6,
    'ecmaFeatures': {
      'arrowFunctions': true,
      'binaryLiterals': true,
      'blockBindings': true,
      'classes': true,
      'defaultParams': true,
      'destructuring': true,
      'forOf': true,
      'generators': true,
      'modules': true,
      'objectLiteralComputedProperties': true,
      'objectLiteralDuplicateProperties': true,
      'objectLiteralShorthandMethods': true,
      'objectLiteralShorthandProperties': true,
      'octalLiterals': true,
      'regexUFlag': true,
      'regexYFlag': true,
      'spread': true,
      'superInFunctions': true,
      'templateStrings': true,
      'unicodeCodePointEscapes': true,
      'globalReturn': true,
      'experimentalObjectRestSpread': true
    }
  },
  env: {
    'browser': true,
    'node': true,
    'commonjs': true,
    'es6': true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //警告
    'quotes': [
      1,
      'single'
    ],
    'semi': [
      1,
      'never'
    ],
    'no-unused-vars': [
      1,
      {
        'caughtErrorsIgnorePattern': '^next'
      }
    ],
    'no-extra-semi': 'error', //多余的分号
    'no-console': 'warn', //控制台
    'no-empty': 'warn', //块语句中的内容不能为空
    'default-case': 'error', //case 必须有 default
    //错误     
    'comma-dangle': [
      'error',
      'never'
    ], //定义数组或对象最后多余的逗号
    'no-catch-shadow': 'error', //禁止catch子句参数与外部作用域变量同名
    'no-cond-assign': 'error', //禁止在条件表达式中使用赋值语句
    'no-constant-condition': 'error', //禁止在条件中使用常量表达式 if(true) if(1)
    'no-dupe-keys': 'error', //在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-args': 'error', //函数参数不能重复
    'no-duplicate-case': 'error', //switch中的case标签不能重复
    'no-empty-character-class': 'error', //正则表达式中的[]内容不能为空
    'no-invalid-regexp': 'error', //无效的正则 
    'valid-typeof': 'error', //无效的类型判断
    'no-unexpected-multiline': 'error', //行尾缺少分号可能导致一些意外情况
    'no-sparse-arrays': 'error', //数组中多出逗号
    'no-shadow-restricted-names': 'error', //关键词与命名冲突
    'no-eval': 'error', //禁止使用eval
    'no-extend-native': 'error', //禁止扩展native对象
    'no-extra-parens': 'error', //禁止非必要的括号
    'no-func-assign': 'error', //禁止重复的函数声明
    'no-inline-comments': 'error', //禁止行内备注
    'no-redeclare': 'error', //禁止重复声明变量    
    'no-undef': 'error', //不能有未定义的变量
    'no-unreachable': 'error', //不能有无法执行的代码
    'no-with': 'error', //禁用with


    "space-before-function-paren": 'off',
    'eol-last': 'off',
    'no-trailing-spaces': 'off',


    //代码风格优化
    'no-else-return': 'warn', //在else代码块中return，else是多余的
    'no-multi-spaces': 'warn', //不允许多个空格
    'key-spacing': [
      'warn',
      {
        'beforeColon': false,
        'afterColon': true
      }
    ], //object直接量建议写法 : 后一个空格签名不留空格
    'block-scoped-var': 'error', //变量定义后未使用
    'consistent-return': 'warn', //函数返回值可能是不同类型
    'accessor-pairs': 'warn', //object getter/setter方法需要成对出现
    'dot-location': [
      'warn',
      'property'
    ], //换行调用对象方法  点操作符应写在行首
    'no-lone-blocks': 'error', //多余的{}嵌套
    'no-labels': 'error', //无用的标记      
    'no-floating-decimal': 'error', //浮点型需要写全 禁止.1 或 2.写法
    'no-loop-func': 'error', //禁止在循环体中定义函数
    'no-new-func': 'error', //禁止new Function(...) 写法
    'no-self-compare': 'error', //不允与自己比较作为条件
    'no-sequences': 'error', //禁止可能导致结果不明确的逗号操作符
    'no-throw-literal': 'error', //禁止抛出一个直接量 应是Error对象
    'no-return-assign': [
      'warn',
      'always'
    ], //不允return时有赋值操作        
    'no-unused-expressions': [
      'error',
      {
        'allowShortCircuit': true,
        'allowTernary': true
      }
    ], //未使用的表达式
    'no-useless-call': 'error', //无意义的函数call或apply
    'no-useless-concat': 'error', //无意义的string concat
    'no-void': 'error', //禁用void     
    'no-warning-comments': [
      'error',
      {
        'terms': [
          'todo',
          'fixme',
          'any other term'
        ],
        'location': 'anywhere'
      }
    ], //标记未写注释
    'curly': 'error', //if、else、while、for代码块用{}包围
    'camelcase':'warn' ,//骆驼命名
    'one-var':'off',
    'no-eval':'warn'
    
  }
}
