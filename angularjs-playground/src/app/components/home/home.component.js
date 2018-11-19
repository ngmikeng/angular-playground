// home.component.js
(() => {

  angular
    .module('app.components.home')
    .component('home', {
      controller: 'HomeController',
      controllerAs: 'vm',
      templateUrl: 'app/components/home/home.html'
    });

})();
