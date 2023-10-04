import { render, screen } from '@testing-library/react';
import type { ObjectId } from 'mongoose';

import { VideoList } from './List';

jest.mock('@mui/material/styles/useTheme', () => ({
  __esModule: true,
  default: () => {
    return {
      breakpoints: {
        down: () => true,
      },
    };
  },
}));

jest.mock('@mui/material/useMediaQuery', () => {
  return () => true;
});

const mockVideosResponse = [
  {
    _id: { $oid: '5f9c9d9b06cb515616743fb4' } as unknown as ObjectId,
    youtubeId: 'OJopLCie6YA',
    title: 'Join the Bitcoin Revolution 🚀🌐 | Bitcoin: Freedom&#39;s Torch 🕯️',
    description:
      '🌍💰 Seeking financial freedom? Discover how Bitcoin and cryptocurrencies are empowering individuals and challenging oppressive regimes in this powerful YouTube short. Watch as we explore how Bitcoin is disrupting traditional controls on production, media, and finances. Swipe left to see how citizens in China and Venezuela use Bitcoin to bypass censorship and combat hyperinflation despite government restrictions. 🛡️🚀 Decentralization, universal access, privacy, and more - Bitcoin offers it all. It\'s not just disrupting economic monopolies, but also championing human rights. 🔥🛤️ When liberties are limited, Bitcoin and blockchain technology light the path to freedom. Swipe up now to join the Bitcoin Revolution and learn more about reclaiming power for the people. 🚀🔗 #BitcoinRevolution #Cryptocurrency #FinancialFreedom #Decentralization #Empowerment #Blockchain #BitcoinFreedom #HumanRights"<br /><br />------------------------------------------------<br /><br />Join Remitano now!!! https://remita.no/yt-join<br /><br />Please contact us with the following email:<br />+ support@remitano.com: If you need assistance with an order or transaction.<br />+ support@remitano.com: If you are a law enforcer.<br />+ marketing@remitano.com: If you want to contact us for communication.<br /><br />Follow us on Social Media: <br />+ Facebook Fanpage: https://www.facebook.com/remitano/ <br />+ Twitter: https://twitter.com/Remitano <br />+ Instagram: https://www.instagram.com/remitano/',
    shared_by: 'vietnguyen010@gmail.com',
    created_at: '1970-01-20T15:13:33.559Z',
  },
  {
    _id: { $oid: '651d374e06cb515616743fb5' } as unknown as ObjectId,
    youtubeId: 'ocu9qECN8Os',
    title: 'Start your Bitcoin life now with Remitano',
    description:
      "Remitano is the best way to start with Bitcoin, the world's most popular and valuable cryptocurrency. With Remitano, you can easily and quickly transfer money to friends and family worldwide.<br /><br />Trade Bitcoin and over 30 other cryptos with your local currency in seconds. Do not miss our cool features. We designed a very easy interface where you can invest in cryptocurrencies easily, quickly, and securely. Don't miss this!<br /><br />Join Remitano now!! https://remita.no/yt-join-link<br /><br />----------------<br />Please contact us with the following email:<br />+ support@remitano.com: If you need assistance with an order or transaction.<br />+ support@remitano.com: If you are law enforcemer<br />+ marketing@remitano.com: If you want to contact us for communication.<br /><br />Follow us on Social Media: <br />+ Facebook Fanpage: https://www.facebook.com/remitano/ <br />+ Twitter: https://twitter.com/Remitano <br />+ Instagram: https://www.instagram.com/remitano/",
    shared_by: 'vietnguyen010@gmail.com',
    created_at: '1970-01-20T15:13:33.518Z',
  },
];

test('Should render VideoList component withh videos data', () => {
  render(<VideoList videos={mockVideosResponse} />);
  expect(screen.queryByText('No videos found')).not.toBeInTheDocument();
});

test('Should render VideoList component with empty video data', () => {
  render(<VideoList videos={[]} />);
  expect(screen.getByText('No videos found')).toBeInTheDocument();
});
