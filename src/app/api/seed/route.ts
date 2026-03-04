import { client } from '../../../sanity/lib/client';
import { NextResponse } from 'next/server';

const documents = [
  // Homepage
  {
    _type: 'homepage',
    heroHeadline: 'Experience God. Build Community. Live With Purpose.',
    heroSubtext: 'Welcome to ThaGospel Church, a vibrant Christ-centered church headquartered in Ghana, committed to raising believers rooted in truth and empowered for impact.',
    backgroundImage: null, // Add image if needed
    heroPrimaryButton: 'Plan Your Visit',
    heroSecondaryButton: 'Watch Latest Sermon',
    heroSmallLine: 'Join us this Sunday in Accra or worship with us online.',
    quickActions: [
      { label: 'Plan Your Visit', icon: '📍' },
      { label: 'Watch Sermons', icon: '🎥' },
      { label: 'Submit a Prayer Request', icon: '🙏' },
      { label: 'Give Online', icon: '💳' },
    ],
    aboutHeadline: 'A Church for This Generation',
    aboutContent: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'For over seven years, ThaGospel Church has been committed to teaching the uncompromised Word of God, building strong families, and transforming lives through the power of Jesus Christ.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'What began as a vision in Ghana has grown into a growing international ministry with branches in the UK, Zimbabwe, and Germany — all united by one mission: to raise spiritually mature believers who impact their world.',
          },
        ],
      },
    ],
    pastorMessage: '"Our heart is simple — to see people encounter God genuinely, grow in His Word, and walk boldly in their divine purpose."',
    aboutButton: 'Learn More About Us',
    servicesHeadline: 'Join Us This Sunday',
    location: 'Headquarters — Ghana',
    serviceTimes: [
      { service: 'First Service', time: '7:30 AM' },
      { service: 'Second Service', time: '10:30 AM' },
    ],
    midweekService: {
      day: 'Wednesday',
      time: '6:30 PM',
      description: 'Bible Teaching & Prayer',
    },
    servicesButton: 'Get Directions',
    servicesSmallLine: 'Visiting for the first time? We\'d love to welcome you personally.',
    sermonHeadline: 'Latest Message',
    sermonIntro: 'Be strengthened, encouraged, and equipped through practical, Spirit-led teaching.',
    sermonButton: 'Watch Now',
    sermonSecondaryButton: 'View All Sermons',
    ministriesHeadline: 'There\'s a Place for You',
    ministriesIntro: 'No matter your age or stage of life, there\'s a community waiting for you.',
    ministries: [
      { name: 'Youth Ministry', description: 'Empowering the next generation to live boldly for Christ.' },
      { name: 'Women\'s Ministry', description: 'Building strong, faith-filled women of purpose.' },
      { name: 'Men\'s Ministry', description: 'Raising godly leaders in the home, church, and society.' },
      { name: 'Children\'s Ministry', description: 'Teaching biblical foundations in a safe, joyful environment.' },
      { name: 'Media Ministry', description: 'Spreading the Gospel through creativity and excellence.' },
      { name: 'Outreach Ministry', description: 'Extending God\'s love beyond the church walls.' },
    ],
    ministriesButton: 'Explore Ministries',
    testimonialsHeadline: 'Lives Are Being Transformed',
    testimonials: [
      { message: '"Through the teaching at ThaGospel Church, my faith has grown stronger and my family has been restored."' },
      { message: '"I found purpose, community, and spiritual direction here. This church truly feels like home."' },
    ],
    testimonialsButton: 'Share Your Story',
    globalHeadline: 'From Ghana to the Nations',
    globalContent: 'While our headquarters is in Ghana, ThaGospel Church continues to expand its reach across nations. With branches in the United Kingdom, Zimbabwe, and Germany, we are committed to spreading the Gospel and raising disciples globally.',
    globalButton: 'View Our Branches',
    ctaHeadline: 'We Can\'t Wait to Welcome You',
    ctaText: 'Whether you\'re exploring faith, looking for a church home, or seeking spiritual growth — there\'s a place for you at ThaGospel Church.',
    ctaPrimaryButton: 'Plan Your Visit',
    ctaSecondaryButton: 'Contact Us',
    socialMedia: [
      { platform: 'Facebook', url: 'https://facebook.com/thagospel' },
      { platform: 'Twitter', url: 'https://twitter.com/thagospel' },
      { platform: 'Instagram', url: 'https://instagram.com/thagospel' },
      { platform: 'YouTube', url: 'https://youtube.com/thagospel' },
    ],
    footerColumns: [
      {
        title: 'About',
        links: [
          { text: 'Overview', url: '/about' },
          { text: 'Our Beliefs', url: '/beliefs' },
          { text: 'Leadership', url: '/leadership' },
          { text: 'Annual Theme', url: '/theme' },
        ],
      },
      {
        title: 'Connect',
        links: [
          { text: 'Plan Your Visit', url: '/visit' },
          { text: 'Prayer Request', url: '/prayer' },
          { text: 'Contact Us', url: '/contact' },
          { text: 'Join a Ministry', url: '/ministries' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { text: 'Watch Sermons', url: '/sermons' },
          { text: 'Sermon Series', url: '/series' },
          { text: 'Give Online', url: '/give' },
          { text: 'Events', url: '/events' },
        ],
      },
      {
        title: 'Headquarters (Ghana)',
        links: [
          { text: 'ThaGospel Church', url: '' },
          { text: 'Accra, Ghana', url: '' },
          { text: 'Phone: (Insert)', url: '' },
          { text: 'Email: (Insert)', url: '' },
        ],
      },
    ],
    footerContact: {
      churchName: 'ThaGospel Church',
      address: 'Accra, Ghana',
      phone: '(Insert)',
      email: '(Insert)',
      serviceTimes: ['Sunday — 7:30 AM & 10:30 AM', 'Wednesday — 6:30 PM'],
    },
    footerBottomText: '© 2026 ThaGospel Church. All Rights Reserved. Raising Believers. Impacting Nations.',
    locationLat: null,
    locationLng: null,
  },
];

export async function GET() {
  try {
    for (const doc of documents) {
      await client.create(doc);
    }
    return NextResponse.json({ message: 'Sanity seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed Sanity' }, { status: 500 });
  }
}
