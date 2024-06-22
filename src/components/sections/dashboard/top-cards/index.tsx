import Grid from '@mui/material/Grid';
import TopCard from './TopCard';

const cardsData = [
  {
    id: 1,
    title: 'Net yıllık Kar',
    value: '50.8K',
    rate: '28.4%',
    isUp: true,
    icon: 'carbon:favorite-filled',
  },
  {
    id: 2,
    title: 'Net aylık Kar',
    value: '23.6K',
    rate: '12.6%',
    isUp: false,
    icon: 'solar:bag-bold',
  },
  {
    id: 3,
    title: 'Net haftalık Kar',
    value: '756',
    rate: '3.1%',
    isUp: true,
    icon: 'ph:bag-simple-fill',
  },
  {
    id: 4,
    title: 'Net günlük Kar',
    value: '2.3K',
    rate: '11.3%',
    isUp: true,
    icon: 'mingcute:currency-dollar-2-line',
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      {cardsData.map((item) => {
        return (
          <TopCard
            key={item.id}
            title={item.title}
            value={item.value}
            rate={item.rate}
            isUp={item.isUp}
            icon={item.icon}
          />
        );
      })}
    </Grid>
  );
};

export default TopCards;
