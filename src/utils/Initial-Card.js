const sentinImage = new URL('../images/sentinskii-hram.jpg', import.meta.url);
const elbrusImage = new URL('../images/Elbrus.jpg', import.meta.url);
const dombayImage = new URL('../images/dombay.jpg', import.meta.url);
const ranImage = new URL('../images/Обсерватория.png', import.meta.url);
const teberdaImage = new URL('../images/teberda.jpg', import.meta.url);
const gumbashiImage = new URL('../images/gumbashi.jpg', import.meta.url);

const initialCards = [
    {
      name: 'Сентинский храм',
      link: sentinImage
    },
    {
      name: 'Гора Эльбрус',
      link: elbrusImage
    },
    {
      name: 'Домбай',
      link: dombayImage
    },
    {
      name: 'Обсерватория РАН',
      link: ranImage
    },
    {
      name: 'Теберда',
      link:  teberdaImage
    },
    {
      name: 'Перевал Гумбаши',
      link: gumbashiImage
    }
  ];

  export{initialCards};