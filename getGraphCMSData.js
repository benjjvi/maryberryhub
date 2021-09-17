async function getData() {
  const data = JSON.stringify({
    query: `query data {
      contents(orderBy: id_ASC) {
        description
        title
        seoDesc
        video {url}
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
        'User-Agent': 'Node',
      },
    }
  );

  const json = await response.json();
  return json.data
}

let data = getData();
console.log(data);
console.log(data.contents)
