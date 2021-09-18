async function getDataAndInsert() {
  const data = JSON.stringify({
    query: `query data {
      contents(orderBy: id_ASC) {
        description
        title
        seoDesc
        largeMedia
        assetMedia {url}
      }
    }`,
  });

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
  console.log("All content:", allContent)

  var arrayLength = allContent.length;
  for (var i=0; i < arrayLength; i++){
    console.log("Iteration:", i);
    console.log("Current content:", allContent[i]);
    if (allContent[i].assetMedia !== null) {
      console.log("Media URL:", allContent[i].assetMedia.url)
    }
    //title
    var title = document.createElement("h2");
    title.innerHTML = allContent[i].title;
    document.body.appendChild(title);

    //desc
    var desc = document.createElement("h3");
    desc.innerHTML = allContent[i].description;
    document.body.appendChild(desc);

    //video
    if (allContent[i].assetMedia !== null) {
      if (allContent[i].largeMedia) {
        var videoURL = allContent[i].assetMedia.url;
        var e = document.createElement('video');
        e.src = videoURL;
        e.autoplay = false;
        e.controls = true;
        e.width = window.innerWidth - 50; //the window width with a bit of room
        e.height = 720;
        e.id = "large";
        document.body.appendChild(e);
      } else {
        var videoURL = allContent[i].assetMedia.url;
        var e = document.createElement('video');
        e.src = videoURL;
        e.width = 640;
        e.height = 360;
        e.autoplay = false;
        e.controls = true;
        e.id = "small";
        document.body.appendChild(e);
      }
    }
  }
}

getDataAndInsert(); //get data AND put it into the website
