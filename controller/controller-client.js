'use strict';

  var btn_search = document.querySelector('.search-btn');
  var text_search = document.querySelector('.input-search-text');
  var searchResult;
  var searchItems = [];

  var myModule = angular.module("searchModule", ['LocalStorageModule'])
                        .controller("searchController", function($scope, localStorageService){
                        //  localStorageService.clearAll();
                        $scope.searchText = 'Type here for search places..';

                        if(localStorageService.isSupported) {
                            console.log("localStorageService.isSupported is supported");
                        }

                        // when page load for the first time it does not find any localstorage
                        if(localStorageService.get("searchItems") === null) {
                            $scope.searchItems = searchItems;
                            console.log("Inside if");
                        }
                        else {
                          $scope.searchItems = localStorageService.get("searchItems");
                          $scope.searchText = localStorageService.get("searchText");
                          var index = localStorageService.get("click-on");
                          $scope.searchItems[index].counter++;

                          localStorageService.clearAll();
                          console.log("Inside else");
                        }


                        console.log("searchItems = "+$scope.searchItems);
                        // console.log("search Items = "+searchItems);
                        if(searchResult !== undefined){
                            var no_of_search_result = Object.keys(searchResult.results[0]).length;
                            console.log("no of search result is "+no_of_search_result);
                        }

                        $scope.clickOnJoining = function(searchItem, index){
                          console.log("click on joining buton at  "+index);
                          var requested_url = "/authenticate";
                          // searchItem.counter++;
                          localStorageService.set("searchItems", $scope.searchItems);
                          localStorageService.set("click-on", index);
                          localStorageService.set("searchText", $scope.searchText);

                          console.log("localstorage content = "+$scope.searchItems);

                          // this.requestAjaxFuntion("GET", requested_url, function(result){

                          // });
                        }

                        $scope.filterSearchResult = function(searchResults, callback){
                          console.log("inside filterSearchResult");
                          $scope.searchItems.length  = 0;
                          console.log("typedef of objs = "+typeof searchResults);

                          console.log("json.results = "+searchResults.results.length);
                          console.log("json.results = "+searchResults.results);
                          console.log("json.results = "+searchResults.results[0].name);
                          console.log("json.results = "+searchResults.results[1].name);
                          var res = [];
                          var no_of_result = (searchResults.results.length > 15) ? 15 : searchResults.results.length;

                          for(var i = 0; i < no_of_result; i++) {
                            var name = searchResults.results[i].name;
                            var img = searchResults.results[i].icon;
                            var address = searchResults.results[i].formatted_address;
                            console.log("i = "+i);
                            console.log("name = "+name);
                            console.log("imageLink = "+img);
                            console.log("desc = "+address);
                            var json = {placeName: name,
                                     counter: 0,
                                     imageLink: img,
                                     placeDesc: address};
                            res.push(json);
                          }
                           callback(null, res);
                        }

                        $scope.requestAjaxFuntion = function(method, url, callback){
                          console.log("inside requestAjaxFuntion");
                          var xmlhttp = new XMLHttpRequest();
                          xmlhttp.onreadystatechange = function() {
                            if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
                              console.log("response from server "+xmlhttp.responseText);
                              var objs =   xmlhttp.responseText;
                              callback(JSON.parse(xmlhttp.responseText));
                             }
                           }
                           xmlhttp.open(method, url, true);
                           xmlhttp.send();
                        }

                        $scope.getSearchResult = function() {
                          if(text_search.value !== ""){
                            var requested_url = "/search/" + encodeURI(text_search.value);
                            this.requestAjaxFuntion("GET", requested_url, function(result){
                              console.log("this = "+$scope);
                              $scope.filterSearchResult(result, function(err, res){
                                  if(err){
                                    console.log("No Result Found");
                                  }
                                  else{
                                    $scope.searchText = text_search.value;
                                    $scope.searchItems = res;
                                    $scope.$apply();
                                  }
                              });
                            });
                          }
                        }

                        $scope.onClickSearchText = function () {
                          $scope.searchText = "";
                        }
                      });


  //
  // function sendAjaxRequest(method, url, callback){
  //     var xmlhttp = new XMLHttpRequest();
  //     xmlhttp.onreadystatechange = function() {
  //       if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
  //         // console.log("response from server "+xmlhttp.responseText);
  //         searchResult = xmlhttp.responseText;
  //         callback(xmlhttp.responseText);
  //       }
  //     }
  //
  //     xmlhttp.open(method, url, true);
  //     // xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //     xmlhttp.send();
  // }
  //
  // btn_search.addEventListener('click', function(){
  //   if(text_search.value !== ""){
  //     var requested_url = "http://127.0.0.1:8080/search/" + encodeURI(text_search.value);
  //     // console.log("requested url = "+requested_url);
  //     // sendAjaxRequest("GET", requested_url, listSearchResult);
  //   }
  // });
