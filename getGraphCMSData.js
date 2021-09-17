async function getData() {
  const kasdfsdg = JSON.stringify({
    query: `query data {
      contents(orderBy: id_ASC) {
        description
        title
        seoDesc
        video {url}
      }
    }`,
  });

  const sldfglASFLASDKF = await fetch(
    'https://api-eu-central-1.graphcms.com/v2/cktndqghp05z901xm7mhgh7ow/master',
    {
      method: 'post',
      body: kasdfsdg,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': kasdfsdg.length,
        'User-Agent': 'Node',
      },
    }
  );

  const fslkgjsdgdf = await sldfglASFLASDKF.json()
  const sdlkadfjgjsdflgksdflgkj = await fslkgjsdgdf
  return sdlkadfjgjsdflgksdflgkj
}

let newdata = getData();
console.log(newdata);
