async function getDataAndInsert() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.has("id")) {
      const postID = urlParams.get('id')
      console.log(postID)
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
  var arrayLength = allContent.length;

  const postID = urlParams.get('id')

  var foundID = false;
  for (var i=0; i < arrayLength; i++){
    if (allContent[i].id === postID) {
      console.log("foundID")
      var foundID = true;
    }
  }

  if (foundID !== true) {
    window.location.replace("./")
  } else{
    console.log()
    //at this point, i would put in logic code but im too lazy, will add to github TODO
  }
}

getDataAndInsert(); //get data AND put it into the website
