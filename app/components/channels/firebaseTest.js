import database from '@react-native-firebase/database';


var rootRef = database().ref();
var ref = rootRef.child("/Chats/+919701565293");
ref.once("value").then(function(snapshot) {
   snapshot.forEach(function(childSnapshot) {
     var key = childSnapshot.key;
     var childData = childSnapshot.val();
     console.log(snapshot);
     var snapshotValue = snapshot.getValue();
     console.log('<<<<<<<<<<GET VALUE', snapshotValue)
   });
});