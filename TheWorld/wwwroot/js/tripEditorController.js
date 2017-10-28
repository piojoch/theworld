// tripEditorController.js
(function () {

    "use scrict";

    angular.module("app-trips")
        .controller("tripEditorController", tripEditorController);

    function tripEditorController($routeParams, $http) {

        var viewModel = this;

        viewModel.tripName = $routeParams.tripName;
        viewModel.stops = [];
        viewModel.errorMessage = "";
        viewModel.isBussy = true;
        viewModel.newStop = {};

        var url = "/api/trips/" + viewModel.tripName + "/stops";

        $http.get(url)
            .then
            (
            function (response) {
                angular.copy(response.data, viewModel.stops);
                _showMap(viewModel.stops);
            },
            function (error) {
                viewModel.errorMessage = "Failed to load stops: " + error;
            }
            )
            .finally(function () {
                viewModel.isBussy = false;
            });

        viewModel.addStop = function () {
            viewModel.isBussy = true;
            viewModel.errorMessage = "";

            $http.post(url, viewModel.newStop)
                .then(function (response) {
                    viewModel.stops.push(response.data);
                    _showMap(viewModel.stops);
                    viewModel.newStop = {};
                }, function (error) {
                    viewModel.errorMessage = "Failed to save new stop: " + error;
                })
                .finally(function () {
                    viewModel.isBussy = false;
                });
        };
    }

    function _showMap(stops) {

        if (stops && stops.length > 0) {
            var mapStops = _.map(stops, function (item) {
                return {
                    lat: item.latitude,
                    long: item.longitude,
                    info: item.name
                };
            });

            travelMap.createMap({
                stops: mapStops,
                selector: "#map",
                currentStop: 1,
                initialZoom: 3
            });
        }
    }

})();