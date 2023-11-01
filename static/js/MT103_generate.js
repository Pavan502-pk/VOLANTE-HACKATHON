  // Your existing saveFile function
  let saveFile = () => {

  // Get the data from each element on the form.
  const tag20   = document.getElementById('tag20');
  const tag13C1 = document.getElementById('tag13C1');
  const tag13C2 = document.getElementById('tag13C2');
  const tag23B  = document.getElementById('tag23B');
  const tag23E1 = document.getElementById('tag23E1');
  const tag23E2 = document.getElementById('tag23E2');
  const tag26T  = document.getElementById('tag26T');
  const tag32A1 = document.getElementById('tag32A1');
  const tag32A2 = document.getElementById('tag32A2');
  const tag32A3 = document.getElementById('tag32A3');
  const tag33B1 = document.getElementById('tag33B1');
  const tag33B2 = document.getElementById('tag33B2');
  const tag36   = document.getElementById('tag36');


  // This variable stores all the data.
  let data =
	  ':20:'  + tag20.value   + ' \r\n ' +
	  ':13C:' + tag13C1.value + '/' + tag13C2.value + '\r\n ' +
	  ':23B:' + tag23B.value  + ' \r\n ' +
	  ':23E:' + tag23E1.value + '/' + tag23E2.value + '\r\n ' +
	  ':26T:' + tag26T.value  + ' \r\n ' +
	  ':32A:' + tag32A1.value + tag32A2.value + tag32A3.value + '\r\n ' +
	  ':33B:' + tag33B1.value + tag33B2.value + '\r\n ' +
	  ':36:'  + tag36.value   + ' \r\n ';

  // Convert the text to BLOB.
  const textToBLOB = new Blob([data], { type: 'text/plain' });
  const sFileName = 'MT103.txt';	   // The file to save the data.

  let newLink = document.createElement("a");
  newLink.download = sFileName;

  if (window.webkitURL != null) {
	newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  }
  else {
	newLink.href = window.URL.createObjectURL(textToBLOB);
	newLink.style.display = "none";
	document.body.appendChild(newLink);
  }

  newLink.click();
}