const marvelURL = 'https://gateway.marvel.com/v1/public/',
  apiKey = `apikey=001ac6c73378bbfff488a36141458af2`;

const getMarvelCharacters = (options) => {
  const { offset, limit, sortName } = Object.assign(
    {
      offset: 0,
      name: '',
      exactMatch: false,
      sortName: '',
      limit: 20,
    },
    options
  );

  let url = `${marvelURL}characters?${apiKey}&offset=${offset}&ts=thesoer&hash=72e5ed53d1398abb831c3ceec263f18b&orderBy=${sortName}name&limit=${limit}`;

  return fetch(url)
    .then((res) => res.json())
    .then((resObj) => {
      try {
        if (resObj.code === 200) {
          if (offset > resObj.data.total) {
            throw new Error('Page does not exist.');
          } else {
            const pages = Math.floor(resObj.data.total / limit);
            return {
              characters: resObj.data.results,
              maxPage: resObj.data.total % limit > 0 ? pages + 1 : pages,
            };
          }
        } else {
          throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
        }
      } catch (e) {
        console.error(e);
        return {
          characters: [],
          maxPage: 0,
        };
      }
    });
};

export { getMarvelCharacters };
