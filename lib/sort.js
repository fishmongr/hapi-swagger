const Utilities = require('../lib/utilities');

const sort = module.exports = {};



/**
 * sort routes by path then method
 *
 * @param  {String} sortType
 * @param  {Array} routes
 * @return {Array}
 */
sort.paths = function (sortType, routes) {
    if (sortType === 'path-method') {
        //console.log('path-method')
        routes.sort(
            Utilities.firstBy('path').thenBy('method')
        );
    }
    return routes;
};

/**
 * Custom sort added by Mark to leverage hapi-swagger sortEndpoints: 'ordered' when generating swagger.json. The project's default implementation relies on this sort being done in SwaggerUI so that is not compatible with ReDoc. 
 * We also could not work around by using an 'unordered' sort since hapi-swagger builder.js relies on Hapi's server.table() to retrieve the master route list, and Hapi applies it's own internally optimized sort to that list with no way to retrieve the list of routes in the original order added. 
 */
sort.endpoints = function (sortType, routes) {
    if (sortType === 'ordered') {
      routes.sort(function(a, b){
        let customOrderA = (a.settings.plugins['hapi-swagger'] && a.settings.plugins['hapi-swagger'].order) || Infinity;
        let customOrderB = (b.settings.plugins['hapi-swagger'] && b.settings.plugins['hapi-swagger'].order) || Infinity;
        if (customOrderA > customOrderB){
          return 1;
        } else if (customOrderA < customOrderB){
          return -1
        } else {
          return 0;
        }
      });
    }
    return routes;
};
