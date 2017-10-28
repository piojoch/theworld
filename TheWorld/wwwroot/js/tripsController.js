// tripsController.js
(function () {

    "use scrict";

    angular.module("app-trips")
        .controller("tripsController", tripsController);

    function tripsController($http) {
        var viewModel = this;

        viewModel.trips = [];

        viewModel.newTrip = {};

        viewModel.errorMessage = "";
        viewModel.isBussy = true;

        $http.get("/api/trips")
            .then
            (
            function (response) {
                angular.copy(response.data, viewModel.trips);
            },
            function (error) {
                viewModel.errorMessage = "Failed to load data: " + error;
            }
            )
            .finally(function () {
                viewModel.isBussy = false;
            });

        viewModel.addTrip = function () {
            viewModel.isBussy = true;
            viewModel.errorMessage = "";

            $http.post("/api/trips", viewModel.newTrip)
                .then(function (response) {
                    viewModel.trips.push(response.data);
                    viewModel.newTrip = {};
                }, function (error) {
                    viewModel.errorMessage = "Failed to save new trip: " + error;
                })
                .finally(function () {
                    viewModel.isBussy = false;
                });
        };
    }

})();