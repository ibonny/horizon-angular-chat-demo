angular.module('myApp', [])
    .controller('myCtrl', ['$scope', function($scope) {
        $scope.horizon = Horizon();

        $scope.horizon.connect();

        $scope.chat = $scope.horizon('chat');

        $scope.chat.order('datetime', 'descending').limit(8).watch()
            .subscribe(function(messages) { $scope.messages = messages; $scope.$apply(); });

        $scope.postMessage = function(nick, msg) {
            $scope.chat.store({
                text: msg,
                nick: nick,
                datetime: new Date()
            }).subscribe();
        }
             
        $scope.addMessage = function() {
            var text = $scope.message.trim();

            if (text) {
                $scope.postMessage($scope.nickname, text);

                if (text.match(/^hello/)) {
                    setTimeout(function() {
                        $scope.postMessage('Robot', "Hello.");
                    }, 1000);
                };

                $scope.message = "";
            }
        }

        $scope.updateMessage = function(newMessages) {
            console.log("Getting new messages...");
            $scope.messages = newMessages;

            $scope.$apply();
        }

        $scope.chat.order('datetime', 'descending')
            .limit(8)
            .watch()
            .subscribe($scope.updateMessages);
    }]);