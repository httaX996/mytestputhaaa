export interface Channel {
  id: string;
  name: string;
  url: string;
  logo: string;
  category: string;
}

export const CATEGORIES = [
  { id: 'sports', name: 'Sports', icon: 'Trophy' },
  { id: 'movies', name: 'Movies', icon: 'Film' },
  { id: 'documentary', name: 'Documentary', icon: 'BookOpen' },
  { id: 'songs', name: 'Songs', icon: 'Music' },
];

export const CHANNELS: Channel[] = [
  {
    id: 'star-sports-1-hd',
    name: 'Star Sports 1 HD',
    url: 'http://103.175.73.12:8080/live/65/65_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Star%20Sports%201%40.jpeg',
    category: 'sports'
  },
  {
    id: 'star-sports-1',
    name: 'Star Sports 1',
    url: 'http://103.175.73.12:8080/live/66/66_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Star%20Sports%201%40.jpeg',
    category: 'sports'
  },
  {
    id: 'star-sports-2',
    name: 'Star Sports 2',
    url: 'http://103.175.73.12:8080/live/67/67_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Star%20Sports%202%40.jpeg',
    category: 'sports'
  },
  {
    id: 'star-sports-3',
    name: 'Star Sports 3',
    url: 'http://103.175.73.12:8080/live/69/69_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Star%20Sports%203%40.jpeg',
    category: 'sports'
  },
  {
    id: 'star-sports-select-1',
    name: 'Star Sports Select 1',
    url: 'http://103.175.73.12:8080/live/72/72_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Star%20Sports%20Select%201%40.jpeg',
    category: 'sports'
  },
  {
    id: 'star-sports-select-2',
    name: 'Star Sports Select 2',
    url: 'http://103.175.73.12:8080/live/73/73_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Star%20Sports%20Select%20%202%40.jpeg',
    category: 'sports'
  },
  {
    id: 'sony-sports-ten-1-hd',
    name: 'Sony Sports Ten 1 HD',
    url: 'http://103.175.73.12:8080/live/74/74_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Sony%20Sports%20Ten%201.png',
    category: 'sports'
  },
  {
    id: 'sony-sports-ten-2-hd-v2',
    name: 'Sony Sports Ten 2 HD',
    url: 'http://103.175.73.12:8080/live/76/76_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/56e54462053b1b278b80b532c89c01f17e360fd5/Sony%20Sports%20Ten%202.png',
    category: 'sports'
  },
  {
    id: 'sony-sports-ten-3-hd',
    name: 'Sony Sports Ten 3 HD',
    url: 'http://103.175.73.12:8080/live/78/78_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/56e54462053b1b278b80b532c89c01f17e360fd5/Sony%20Sports%20Ten%203.png',
    category: 'sports'
  },
  {
    id: 'sony-sports-ten-5',
    name: 'Sony Sports Ten 5',
    url: 'http://103.175.73.12:8080/live/80/80_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/56e54462053b1b278b80b532c89c01f17e360fd5/Sony%20Sports%20Ten%205.png',
    category: 'sports'
  },
  {
    id: 'eurosports',
    name: 'Eurosports',
    url: 'http://103.175.73.12:8080/live/82/82_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Eurosports.png',
    category: 'sports'
  }
];
