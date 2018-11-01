let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let conf={
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, './dist'),
        filename:'main.js',
        publicPath:'dist/'
    },
    devServer:{
        overlay:true
    },
    module:{
        rules:[
        {
            test:/\.css$/,
            use: ExtractTextPlugin.extract({
             fallback: "style-loader",
             use: [
             {loader:"css-loader", options:{minimize:true}}
             ]
            })
        },
        {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
              {loader: "css-loader"},
              {
                  loader: "less-loader",
                  options: {
                      includePaths: ["./less/", "./public/css/"]
                  }
              },
          ]
        })
      }

        ]
    },
    plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};

module.exports=(env,options)=>{
    let production=options.mode==='production';
    conf.devtool = production
? false
:'eval-sourcemap';
return conf;
}
