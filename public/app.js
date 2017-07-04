'use strict'
var homeSearch = angular.module('homeSearch', [

])

homeSearch.controller('searchController', function() {
  var vm = this;
  vm.queryTerm;
  vm.getResults = getResults;

  function getResults() {
    vm.pendingState = true;
    console.log('searching for ', vm.queryTerm);
  }
})
