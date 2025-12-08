// karma.conf.js - Configuración de Karma con cobertura y Webpack
module.exports = function(config) {
  config.set({
    
    // Base path
    basePath: '',

    // Frameworks a usar
    frameworks: ['jasmine'],

    // Archivos a incluir
    files: [
      'src/__tests__/**/*.spec.js',
      'src/services/**/*.js'
    ],

    // Excluir
    exclude: [],

    // Preprocesadores - Usar webpack para todos los archivos
    preprocessors: {
      'src/__tests__/**/*.spec.js': ['webpack'],
      'src/services/**/*.js': ['webpack', 'coverage']
    },

    // Configuración de Webpack
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js']
      }
    },

    // Para evitar logs excesivos de webpack
    webpackMiddleware: {
      stats: 'errors-only'
    },

    // Reportes
    reporters: ['progress', 'coverage'],

    // Configuración del reporte de cobertura
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly', subdir: '.' }
      ]
    },

    // Puerto
    port: 9876,

    // Colores
    colors: true,

    // Nivel de logging
    logLevel: config.LOG_INFO,

    // Auto-watch
    autoWatch: false,

    // Navegadores
    browsers: ['ChromeHeadless'],

    // Single run
    singleRun: true,

    // Concurrencia
    concurrency: Infinity,

    // Timeouts
    browserNoActivityTimeout: 30000,
    captureTimeout: 60000,

    // Cliente
    client: {
      clearContext: false,
      jasmine: {
        random: false
      }
    }
  });
};