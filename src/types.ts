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
    url: 'http://103.175.73.12:8080/live/66/66_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Star%20Sports%201%40.jpeg',
    category: 'sports'
  },
  {
    id: 'star-sports-2-hd-hindi',
    name: 'Star Sports 2 HD Hindi',
    url: 'http://103.175.73.12:8080/live/83/83_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Star%20Sports%202%40.jpeg',
    category: 'sports'
  },
  {
    id: 'star-sports-2',
    name: 'Star Sports 2',
    url: 'http://103.175.73.12:8080/live/68/68_0.m3u8',
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
    id: 'star-sports-select-2-v2',
    name: 'Star Sports Select 2',
    url: 'http://103.175.73.12:8080/live/282/282_0.m3u8',
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
    id: 'sony-sports-ten-2-hd-v1',
    name: 'Sony Sports Ten 2 HD',
    url: 'http://103.229.254.25:7001/play/a0ef/index.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/56e54462053b1b278b80b532c89c01f17e360fd5/Sony%20Sports%20Ten%202.png',
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
    id: 'sony-sports-ten-5-v2',
    name: 'Sony Sports Ten 5',
    url: 'http://103.175.73.12:8080/live/81/81_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/56e54462053b1b278b80b532c89c01f17e360fd5/Sony%20Sports%20Ten%205.png',
    category: 'sports'
  },
  {
    id: 'eurosports',
    name: 'Eurosports',
    url: 'http://103.175.73.12:8080/live/82/82_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Eurosports.png',
    category: 'sports'
  },
  {
    id: 'eurosports-v2',
    name: 'Eurosports',
    url: 'http://103.175.73.12:8080/live/283/283_0.m3u8',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Eurosports.png',
    category: 'sports'
  },
  {
    id: 'rta-sports',
    name: 'RTA Sports',
    url: 'https://rtatv.akamaized.net/Content/HLS/Live/channel(RTA3)/variant.m3u8',
    logo: 'https://buddytv.netlify.app/img/no-logo.png',
    category: 'sports'
  },
  {
    id: 'dd-sports-576p',
    name: 'DD Sports (576p)',
    url: 'http://103.78.149.54:8000/play/a02r/index.m3u8',
    logo: 'https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_SPORTS/images/LOGO_HD/image.png',
    category: 'sports'
  },
  {
    id: 'dd-sports-hd-1080p',
    name: 'DD Sports HD (1080p)',
    url: 'http://103.78.149.54:8000/play/a02i/index.m3u8',
    logo: 'https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_SPORTS/images/LOGO_HD/image.png',
    category: 'sports'
  },
  {
    id: 'sony-sports-ten-2-hd-1080p',
    name: 'Sony Sports Ten 2 HD (1080p)',
    url: 'http://103.229.254.25:7001/play/a02t/index.m3u8',
    logo: 'https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SONY_SPORTS_TEN_2/images/LOGO_HD/image.png',
    category: 'sports'
  },
  {
    id: 'sony-sports-ten-3-hindi-576p',
    name: 'Sony Sports Ten 3 Hindi (576p)',
    url: 'http://103.229.254.25:7001/play/a09q/index.m3u8',
    logo: 'https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SONY_SPORTS_TEN_3/images/LOGO_HD/LOGO_HD_image.png',
    category: 'sports'
  },
  {
    id: 'sony-sports-ten-5-hd-1080p',
    name: 'Sony Sports Ten 5 HD (1080p)',
    url: 'http://103.229.254.25:7001/play/a0dw/index.m3u8',
    logo: 'https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SONY_SPORTS_TEN_5/images/LOGO_HD/image.png',
    category: 'sports'
  },
  {
    id: 'star-sports-1-hd-1080p',
    name: 'Star Sports 1 HD (1080p)',
    url: 'http://103.229.254.25:7001/play/a0a0/index.m3u8',
    logo: 'https://i.imgur.com/E5jjKHI.png',
    category: 'sports'
  },
  {
    id: 'star-sports-1-hindi-576p',
    name: 'Star Sports 1 Hindi (576p)',
    url: 'http://161.248.38.40:8000/play/a071/index.m3u8',
    logo: 'https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_STAR_SPORTS_1_HINDI/images/LOGO_HD/image.png',
    category: 'sports'
  },
  {
    id: 'star-sports-1-hindi-hd-1080p',
    name: 'Star Sports 1 Hindi HD (1080p)',
    url: 'http://161.248.38.40:8000/play/a06n/index.m3u8',
    logo: 'https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_STAR_SPORTS_1_HD_HINDI/images/LOGO_HD/image.png',
    category: 'sports'
  },
  {
    id: 'star-sports-2-hindi-hd-480p',
    name: 'Star Sports 2 Hindi HD (480p)',
    url: 'http://tvn1.chowdhury-shaheb.com/starsport2/index.m3u8',
    logo: 'https://i.imgur.com/kHerF19.png',
    category: 'sports'
  },
  {
    id: 'star-sports-2-tamil-1080p',
    name: 'Star Sports 2 Tamil (1080p)',
    url: 'http://103.229.254.25:7001/play/a0d1/index.m3u8',
    logo: 'https://i.imgur.com/eWPoUxB.png',
    category: 'sports'
  },
  {
    id: 'star-sports-select-1-hd-1080p',
    name: 'Star Sports Select 1 HD (1080p)',
    url: 'http://103.113.103.202:8001/play/a02e/index.m3u8',
    logo: 'https://i.imgur.com/Mh9tKPx.png',
    category: 'sports'
  },
  {
    id: 'star-sports-select-2-hd-1080p',
    name: 'Star Sports Select 2 HD (1080p)',
    url: 'http://103.113.103.202:8001/play/a02q/index.m3u8',
    logo: 'https://i.imgur.com/FtRT73R.png',
    category: 'sports'
  }
];
