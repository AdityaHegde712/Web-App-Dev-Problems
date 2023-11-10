var app = angular.module('studentApp', []);

app.controller('StudentController', function ($scope, $http) {
    $scope.student = {};
    $scope.students = [];
    $scope.searchRollNumber = '';
    $scope.displayedStudent = null;

    // Function to add a new student to the server
    $scope.addStudent = function () {
        $http.post('/students', $scope.student)
            .then(function (response) {
                console.log('Student data stored in the database.');
                $scope.student = {}; // Clear the form
                $scope.studentForm.$setPristine(); // Reset the form's state
                $scope.studentForm.$setUntouched();
                loadStudentData(); // Refresh the student data
            })
            .catch(function (error) {
                console.error('Error storing student data: ' + error);
            });
    };

    // Function to retrieve a student by roll number from the server
    $scope.getStudentByRollNumber = function () {
        // Check if a rollNumber is provided for the search
        if ($scope.searchRollNumber) {
            $http.get('/students', {
                params: { rollNumber: $scope.searchRollNumber }
            })
            .then(function (response) {
                var foundStudent = response.data[0]; // Get the first student (if found)
                $scope.displayedStudent = foundStudent;
            })
            .catch(function (error) {
                console.error('Error searching for student by rollNumber: ' + error);
            });
        }
    };


    // Function to load student data from the server
    function loadStudentData() {
        $http.get('/students')
            .then(function (response) {
                $scope.students = response.data;
            })
            .catch(function (error) {
                console.error('Error loading student data: ' + error);
            });
    }

    // Load initial student data
    loadStudentData();
});
