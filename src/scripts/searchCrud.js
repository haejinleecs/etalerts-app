export async function getFlightByCode(url, key, code) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  await fetch("http://api.aviationstack.com/v1/flights?access_key=7b542196cc292667b9b037000adfd948", requestOptions)
    .then(response => response.text())
    .then((result) => {
      return result
    }).catch(error => console.log('error', error));

}
