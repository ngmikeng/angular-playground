(function () {

  angular
    .module('app.components.slickCarouselSamples')
    .controller('SlickCarouselSamplesController', SlickCarouselSamplesController);

  function SlickCarouselSamplesController($timeout) {
    const vm = this;
    vm.header = 'Slick!';
    vm.$onInit = onInit;

    vm.slickConfig = {
      enabled: true,
      autoplay: false,
      draggable: false,
      autoplaySpeed: 3000,
      method: {},
      event: {
        beforeChange: function (event, slick, currentSlide, nextSlide) {},
        afterChange: function (event, slick, currentSlide, nextSlide) {}
      },
      isLoaded: true
    };

    vm.numbers = [{
      label: 1
    }, {
      label: 2
    }, {
      label: 3
    }, {
      label: 4
    }, {
      label: 5
    }];

    vm.slickNext = function() {
      vm.slickConfig.method.slickNext();
    };

    vm.slickPrev = function() {
      vm.slickConfig.method.slickPrev();
    };

    vm.addNew = function() {
      vm.slickConfig.isLoaded = false;
      $timeout(function() {
        vm.numbers.push({label: Math.random()});
        vm.slickConfig.isLoaded = true;
      }, 0);
    };

    activate();

    ////////////

    function activate() {
      // Resolve start-up logic
    }

    function onInit() {
      // Initialization logic that relies on bindings being present
      // should be put in this method, which is guarranteed to
      // always be called after the bindings have been assigned.
    }
  }

})();
