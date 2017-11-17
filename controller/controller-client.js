'use strict';



  var btn_search = document.querySelector('.search-btn');
  var text_search = document.querySelector('.input-search-text');
  var searchResult;
  var myModule = angular.module("searchModule", [])
                        .controller("searchController", function($scope){
                         var searchModel = [];
                         var no_of_search_result = Object.keys(searchResult.results[0]).length;
                         console.log("no of search result is "+no_of_search_result);
                        });




  function listSearchResult(searchResult){

  }

  function sendAjaxRequest(method, url, callback){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
          console.log("response from server "+xmlhttp.responseText);
          searchResult = xmlhttp.responseText;
          callback(xmlhttp.responseText);
        }
      }

      xmlhttp.open(method, url, true);
      // xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send();
  }

  btn_search.addEventListener('click', function(){
    if(text_search.value !== ""){
      var requested_url = "http://127.0.0.1:8080/search/" + encodeURI(text_search.value);
      console.log("requested url = "+requested_url);
      sendAjaxRequest("GET", requested_url, listSearchResult);
    }
  });
