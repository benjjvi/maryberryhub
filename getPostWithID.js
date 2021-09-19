function getDataSet(cont, pID){
  var foundID = false;
  let dataSet;
  var arrayLength = cont.length;
  for (var i=0; i < arrayLength; i++){
    if (cont[i].id === pID) {
      const dataSet = cont[i];
      foundID = true
      return [dataSet, foundID];
    }
  }
  return [dataSet, foundID];
}

async function getDataAndInsert() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.has("id")) {
      const postID = urlParams.get('id')
  } else {
      window.location.replace("./")
  }

  const data = JSON.stringify({
    query: `query data {
    contents(orderBy: id_ASC) {
      id
      description
      title
      seoDesc
      largeMedia
      assetMedia {
        url
      }
      updatedAt
    }
  }
  `,});

  const response = await fetch(
    'https://api-eu-central-1.graphcms.com/v2/cktndqghp05z901xm7mhgh7ow/master',
    {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'User-Agent': 'MaryBerryHub API Access tool via JavaScript.',
      },
    }
  )

  const dataraw = await response.json()
  const realData = dataraw.data;

  const allContent = realData.contents;

  const postID = urlParams.get('id');

  let arr = getDataSet(allContent, postID);

  foundID = arr[1];

  if (foundID !== true) {
    window.location.replace("./");
  }
  else{
    postDataSet = arr[0];
    //let's start to add content.
    const t = postDataSet.title;
    const u = postDataSet.updatedAt;
    const s = postDataSet.seoDesc;
    const d = postDataSet.description;
    const l = postDataSet.largeMedia;
    const m = postDataSet.assetMedia;

    items = [t, u ,d, [m, l], s];
    for (var j = 0; j < items.length; j++) {
      //j can define what to do.
      //j = 0: title
      //j = 1: updated at
      //j = 2: description
      //j = 3: [media url, large media bool]
      //j = 4: seo description

      if (j===0){
        var e = document.createElement("h1");
        e.innerHTML = items[j]
        document.body.appendChild(e);
      }
      if (j===1) {
        var e = document.createElement("h4");
        e.innerHTML = "Updated at: " + items[j]
        document.body.appendChild(e);
      }
      if (j===2) {
        var e = document.createElement("p");
        e.innerHTML = items[j]
        document.body.appendChild(e);
      }

      if (j===3) {
        if (items[j][0] !== null){
          if (items[j][1] === true) {
            var e = document.createElement("video");
            e.src = items[j][0].url
            e.autoplay = false;
            e.controls = true;
            e.width = window.innerWidth - 50; //the window width with a bit of room
            e.height = 720;
            document.body.appendChild(e);
          } else {
            var e = document.createElement("video");
            e.src = items[j][0].url
            e.autoplay = false;
            e.controls = true;
            e.width = 640;
            e.height = 360;
            document.body.appendChild(e);
          }
        }
      }
    }

    document.getElementById("l").innerHTML = "";
    
    var e = document.createElement("h3");
    e.innerHTML = "Thank you for visiting Mary Berry Hub."
    document.body.appendChild(e);
  }
}

getDataAndInsert(); //get data AND put it into the website
