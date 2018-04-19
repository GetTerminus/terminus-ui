export const EUROPE_DATA: { [key: string]: any }[] = [
  {
    name: 'Country',
    data: [
      ['is', 1],
      ['no', 1],
      ['se', 1],
      ['dk', 1],
      ['fi', 1],
    ],
    dataLabels: {
      formatter: function() {
        if (this.point.value) {
          return this.point.name;
        }
      },
    },
  },
];
