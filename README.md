# To develop on site:
- Run `npm run build-sass:dev` then open index.html in src file

# To deploy: 
- Run `npm run build-prod` to build projection bundles
- Commit and push to feature branch
- Pull and merge into master branch travis will deploy the site to AWS

# Dependencies
1. [Sass](https://sass-lang.com/)
2. [Rollup](https://rollupjs.org/guide/en)(for simple bundling)
