const axios = require('axios')

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var radius = 6371; // Radius of the earth in km
    var latitudeDifference = deg2rad(lat2-lat1);  // deg2rad below
    var longitudeDifference = deg2rad(lon2-lon1); 
    console.log(latitudeDifference,longitudeDifference)
    var a = 
      Math.sin(latitudeDifference/2) * Math.sin(latitudeDifference/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(longitudeDifference/2) * Math.sin(longitudeDifference/2);
    
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var distance = radius * c;
    
    return distance
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  

 const calculate = (pincode1,pincode2, data) => {
    let latitude1 = data[pincode1].latitude;
    let longitude1 = data[pincode1].longitude;
    let latitude2 = data[pincode2].latitude;
    let longitude2 = data[pincode2].longitude
    let distance = getDistanceFromLatLonInKm(latitude1, longitude1, latitude2, longitude2)
    console.log(pincode1,pincode2,data)
    return distance
 }


const getDistance = async (pincode1, pincode2) =>{
    await axios.get('./pincode.json')
    .then(response => {  
      console.log(pincode1,pincode2,"1")
        let result = calculate(pincode1, pincode2, response.data)
        return result
    })
    .catch(error => console.log(error.response))
}

console.log(getDistance('382445','110021'))


module.exports = {getDistance}