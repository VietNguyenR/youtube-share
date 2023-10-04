import { getYoutubeId } from './common';

test('Should get youtubeId failed because of URL invalid', () => {
  const youtubeId = getYoutubeId('invalid url');
  expect(youtubeId).toBe('');
});

test('Should get youtubeId failed when cannot parse the path', () => {
  const youtubeId = getYoutubeId('https://www.youtube.com/watch');
  expect(youtubeId).toBe('');
});

test('Should get youtubeId success in case URL is youtube.be', () => {
  const youtubeId = getYoutubeId(
    'https://youtu.be/C-2godWCKlM?si=YfrJon1sc9JoX1uy',
  );
  expect(youtubeId).toBe('C-2godWCKlM');
});

test('Should get youtubeId success in case URL is copy from browser', () => {
  const youtubeId = getYoutubeId('https://www.youtube.com/watch?v=C-2godWCKlM');
  expect(youtubeId).toBe('C-2godWCKlM');
});
