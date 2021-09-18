function addLnBr() {
  var br = document.createElement("br");
  document.body.appendChild(br);
}

async function getDataAndLink() {
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
  console.log("All content:", allContent)

  var arrayLength = allContent.length;
  console.log("Total Enteries in array: ", arrayLength)
  for (var i=0; i < arrayLength; i++){
    console.log(allContent[i])

    var lnk = document.createElement("a");
    lnk.href = "./post.html?id=" + allContent[i].id
    lnk.innerHTML = allContent[i].title;
    document.body.appendChild(lnk);
    addLnBr();
  }
}

getDataAndLink(); //get data AND put it into the website
