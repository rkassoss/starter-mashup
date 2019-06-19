var qlikObject;

var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};

var appId = 'ff2d2b75-ac2e-4209-8240-f35449046a5c';


require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    paths: {
        'ui.router': '/bower_components/angular-ui-router/release/angular-ui-router',
        'uibootstrap': '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        // 'uibootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min',
    },
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                return true;
            }
        }
    }
});

// bootstrap the app
require(["js/qlik"], function (qlik) {
    qlik.setOnError( function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
    } );
    
    require(["angular",
            'ui.router',
            'uibootstrap',
            "routes", 
            'home',
            'occupancy',
            'occMarketValue',
            'topHeader',
            'senseObject', 
            'simpleObject',
            'nakedKpi',
            'kpiBox',
            'filterDropdown',
            'dropdownSearch',
            'simpleTable',
            'expandModal',
            'createBookmarkModal',
            'dataService', 
            'qlikService',
            'currentSelectionsService',
            'filterDropdownService'
    ],
        function (angular, uiRoute, uibootstrap, routes, 
            home, occupancy, occMarketValue, 
            topHeader, senseObject, simpleObject,nakedKpi, kpiBox, filterDropdown,dropdownSearch,simpleTable, expandModal, createBookmarkModal, dataService, qlikService,currentSelectionsService, filterDropdownService ) {
            app = angular.module('mashup-app', [
                'ui.router',
                'ui.bootstrap'
            ]).config(['$compileProvider',
            function( $compileProvider ) {   
              $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
              $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:application\//);
              $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|cust-scheme):/);
              $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
              $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
            }
            ]);
            
            app.config(routes);
            app.component('home',home);
            app.component('occupancy',occupancy);
            app.component('occMarketValue',occMarketValue);

            app.component('topHeader',topHeader);

            app.component('senseObject',senseObject);
            app.component('simpleObject',simpleObject);
            app.component('nakedKpi',nakedKpi);
            app.component('expandModal',expandModal);
            app.component('createBookmarkModal',createBookmarkModal);

            app.component('kpiBox',kpiBox);


            app.component('filterDropdown', filterDropdown);
            app.component('dropdownSearch',dropdownSearch);
            app.component('simpleTable',simpleTable);
            
            app.service('dataService', dataService);
            app.service('qlikService', qlikService);
            app.service('currentSelectionsService',currentSelectionsService);
            app.service('filterDropdownService',filterDropdownService);

            app.run(['qlikService', function (qlikService) {
                qlikService.openApp(qlik, appId, config);
                qlikObject = qlik;
            }]);
            angular.bootstrap(document, ["qlik-angular", "mashup-app"]);
        }
    )
});