// posts.component.js
(() => {
  angular
    .module('app.components.posts')
    .component('posts', {
      controller: 'PostsController',
      controllerAs: 'vm',
      templateUrl: 'app/components/posts/posts.html'
    });
})();
