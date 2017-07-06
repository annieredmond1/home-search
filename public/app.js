'use strict'
var homeSearch = angular.module('homeSearch', []);

homeSearch.controller('searchController', ['homesService', function(homesService) {
  var vm = this;
  vm.getResults = getResults;

  function getResults() {
    vm.pendingState = true;
    if(vm.queryTerm) {
      homesService.getSearchResults(vm.queryTerm)
      .then(function(response) {
        vm.homes = response.data;
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function(response) {
        vm.pendingState = false;
      })
    }
  }
}])

homeSearch.factory('homesService', ['$http', function($http) {
  return {
    getSearchResults: getSearchResults
  }

  function getSearchResults(term) {
    return $http({
      url: '/api/homes',
      method: 'GET',
      params: {term: term}
    });
  }
}])
