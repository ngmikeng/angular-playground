// app.routes.js
(function () {
  angular.module('app')
    .config(($stateProvider, $urlRouterProvider) => {
      const states = [{
          name: 'home',
          url: '',
          template: '<home></home>',
          data: {
            pageTitle: 'Home'
          }
        }, {
          name: 'posts',
          url: '/posts',
          template: '<posts></posts>',
          data: {
            pageTitle: 'Posts'
          }
        },
        {
          name: 'slick-carousel-samples',
          url: '/slick-carousel-samples',
          template: '<slick-carousel-samples></slick-carousel-samples>',
          data: {
            pageTitle: 'Slick'
          }
        }
      ];
      states.forEach(state => {
        $stateProvider.state(state);
      });
      $urlRouterProvider.when('/', ['$state', '$match', ($state, $match) => {
        $state.go('home');
      }]);
    })

    .run(
      ['$rootScope', '$state', '$stateParams',
        ($rootScope, $state, $stateParams) => {
          // It's very handy to add references to $state and $stateParams to the $rootScope
          // so that you can access them from any scope within your applications.For example,
          // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
          // to active whenever 'contacts.list' or one of its decendents is active.
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
        }
      ]
    );
})();
