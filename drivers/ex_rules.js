module.exports = {
  driver: 'exUa',
  method: 'foreignSerials',
  rules: [
    {
      regExp: new RegExp('Касл.*Castle', 'i'),
      season: 8,
      episode: 9
    },
    {
      regExp: new RegExp('Big\\sBang\\sTheory', 'i'),
      season: 9,
      episode: 13
    },
    {
      regExp: new RegExp('Марко\\sПоло.*Marco\\sPolo', 'i'),
      season: 2,
      episode: 1
    },
    {
      regExp: new RegExp('Вечность.*Forever', 'i')
    },
    {
      regExp: new RegExp('Бруклин.*Brooklyn', 'i'),
      season: 3,
      episode: 12
    },
    {
      regExp: new RegExp('Элементарно.*Elementary', 'i'),
      season: 4,
      episode: 8
    },
    {
      regExp: new RegExp('Игра\\sПрестолов.*game of thrones', 'i')
    },
    {
      regExp: new RegExp('Шерлок.*Sherlock', 'i'),
      season: 4,
      episode: 1
    },
    {
      regExp: new RegExp('Области\\s*тьмы.*limitless', 'i'),
      season: 1,
      episode: 13
    },
    {
      regExp: new RegExp('Новенькая.*New\\sGirl', 'i'),
      season: 5,
      episode: 2
    }
  ]
};