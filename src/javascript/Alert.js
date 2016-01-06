/*global define*/
define([
], function(){
  "use strict";
  
  var Alert = function() {
    return this;
  };

  Alert.prototype.helloWorld = function() {
    alert("Hello World");
  };
  
  return Alert;

});