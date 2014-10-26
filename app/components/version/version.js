'use strict';

angular.module('SpreadsheedFlow.version', [
  'SpreadsheedFlow.version.interpolate-filter',
  'SpreadsheedFlow.version.version-directive'
])

.value('version', '0.1');
