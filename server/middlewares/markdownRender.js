var markdown = require( "markdown" ).markdown;

module.exports.render = function (mdData,callback) {
    var html = markdown.toHTML(mdData);
    callback(html);
};
