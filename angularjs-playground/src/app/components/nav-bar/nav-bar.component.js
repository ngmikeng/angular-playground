// home.component.js
(() => {
  angular
    .module('app.components.navBar')
    .component('navBar', {
      controller: 'NavBarController',
      controllerAs: 'vm',
      templateUrl: 'app/components/nav-bar/nav-bar.html'
    });
})();
