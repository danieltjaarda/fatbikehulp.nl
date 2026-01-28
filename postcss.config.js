module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Only add prefixes for our target browsers
      overrideBrowserslist: [
        'Chrome >= 90',
        'Firefox >= 88',
        'Safari >= 14',
        'Edge >= 90'
      ]
    },
    // Optimize CSS in production
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          // Optimize for modern browsers
          colormin: true,
          reduceIdents: true,
          mergeRules: true,
        }]
      }
    } : {})
  },
}







