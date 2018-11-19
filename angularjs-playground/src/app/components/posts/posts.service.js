// posts.service.js
(() => {

  angular
    .module('app.components.posts')
    .factory('postsService', PostsService);

  function PostsService(apiService) {
    return {
      getPosts: getPosts
    };

    ////////////

    function getPosts() {
      return apiService
        .get('posts', true);
    }
  }

})();
